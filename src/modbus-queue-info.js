/**
 Copyright (c) 2016,2017,2018,2019,2020,2021,2022 Klaus Landsdorf (http://node-red.plus/)
 All rights reserved.
 node-red-contrib-modbus - The BSD 3-Clause License

 @author <a href="mailto:klaus.landsdorf@bianco-royal.de">Klaus Landsdorf</a> (Bianco Royal)
 **/

/**
 * Modbus Read node.
 * @module NodeRedModbusRead
 *
 * @param RED
 */
module.exports = function (RED) {
  'use strict'
  // SOURCE-MAP-REQUIRED
  const mbBasics = require('./modbus-basics')
  const coreModbusQueue = require('./core/modbus-queue-core')
  const internalDebugLog = require('debug')('contribModbus:queue')

  function ModbusQueueInfo (config) {
    RED.nodes.createNode(this, config)

    this.name = config.name
    this.topic = config.topic
    this.unitid = parseInt(config.unitid) || 1
    this.lowLowLevel = parseInt(config.lowLowLevel)
    this.lowLevel = parseInt(config.lowLevel)
    this.highLevel = parseInt(config.highLevel)
    this.highHighLevel = parseInt(config.highHighLevel)
    this.errorOnHighLevel = config.errorOnHighLevel
    this.queueReadIntervalTime = config.queueReadIntervalTime || 1000
    this.showStatusActivities = config.showStatusActivities
    this.updateOnAllQueueChanges = config.updateOnAllQueueChanges
    this.updateOnAllUnitQueues = config.updateOnAllUnitQueues

    this.internalDebugLog = internalDebugLog

    const node = this
    node.queueReadInterval = null
    node.updateStatusRrunning = false
    node.unitsWithQueue = new Map()
    mbBasics.setNodeStatusTo('waiting', node)

    const modbusClient = RED.nodes.getNode(config.server)
    if (!modbusClient) {
      return
    }
    modbusClient.registerForModbus(node)

    node.initUnitQueueStates = function () {
      for (let unit = 0; unit < 256; unit += 1) {
        node.unitsWithQueue.set(unit, {})
        node.resetStates(unit)
      }
    }

    node.resetStates = function (unit) {
      const unitWithQueue = node.unitsWithQueue.get(unit)
      unitWithQueue.lowLowLevelReached = true
      unitWithQueue.lowLevelReached = false
      unitWithQueue.highLevelReached = false
      unitWithQueue.highHighLevelReached = false
    }

    node.errorProtocolMsg = function (err, msg) {
      if (node.showErrors) {
        mbBasics.logMsgError(node, err, msg)
      }
    }

    node.initUnitQueueStates()

    node.checkLowLevelReached = function (node, bufferCommandListLength, unit) {
      const unitWithQueue = node.unitsWithQueue.get(unit)
      if (!unitWithQueue.lowLevelReached && bufferCommandListLength > node.lowLowLevel && bufferCommandListLength < node.lowLevel) {
        unitWithQueue.lowLevelReached = true
        const msg = {
          payload: Date.now(),
          topic: node.topic,
          state: 'low level reached',
          unitid: unit,
          modbusClientName: modbusClient.name,
          bufferCommandListLength
        }
        node.send(msg)
      }
    }

    node.checkHighLevelReached = function (node, bufferCommandListLength, unit) {
      const unitWithQueue = node.unitsWithQueue.get(unit)
      if (!unitWithQueue.highLevelReached &&
        bufferCommandListLength > node.lowLevel &&
        bufferCommandListLength > node.highLevel) {
        unitWithQueue.highLevelReached = true
        const msg = {
          payload: Date.now(),
          topic: node.topic,
          state: 'high level reached',
          unitid: unit,
          modbusClientName: modbusClient.name || modbusClient.id,
          highLevel: node.highLevel,
          bufferCommandListLength
        }

        if (node.errorOnHighLevel) {
          node.error(new Error('Queue High Level Reached'), msg)
        } else {
          node.warn(msg)
        }

        node.send(msg)
      }
    }

    node.checkHighHighLevelReached = function (node, bufferCommandListLength, unit) {
      const unitWithQueue = node.unitsWithQueue.get(unit)
      if (!unitWithQueue.highHighLevelReached &&
        bufferCommandListLength > node.highLevel &&
        bufferCommandListLength > node.highHighLevel) {
        unitWithQueue.highHighLevelReached = true
        const msg = {
          payload: Date.now(),
          topic: node.topic,
          state: 'high high level reached',
          unitid: unit,
          modbusClientName: modbusClient.name || modbusClient.id,
          highLevel: node.highLevel,
          highHighLevel: node.highHighLevel,
          bufferCommandListLength
        }
        node.error(new Error('Queue High High Level Reached'), msg)
        node.send(msg)
      }
    }

    node.getStatusSituationFillColor = function (unit) {
      const unitWithQueue = node.unitsWithQueue.get(unit)
      let fillColor = 'blue'

      if (unitWithQueue.lowLevelReached) {
        fillColor = 'green'
      }

      if (unitWithQueue.highLevelReached) {
        if (node.errorOnHighLevel) {
          fillColor = 'red'
        } else {
          fillColor = 'yellow'
        }
      }

      if (unitWithQueue.highHighLevelReached) {
        fillColor = 'red'
      }

      return fillColor
    }

    node.setNodeStatusByActivity = function (bufferCommandListLength, unit) {
      if (node.showStatusActivities) {
        node.status({
          fill: node.getStatusSituationFillColor(node.unitid),
          shape: 'ring',
          text: (bufferCommandListLength) ? 'active unit ' + unit + ' queue items: ' + bufferCommandListLength : 'active (Unit-Id: ' + unit + ') empty'
        })
      }
    }

    node.readFromQueue = function () {
      if (node.updateStatusRrunning) {
        return
      }
      const unit = ((node.unitid < 1 || node.unitid > 255)) ? 1 : node.unitid
      if (modbusClient.bufferCommands) {
        return new Promise(
          function (resolve, reject) {
            try {
              node.updateStatusRrunning = true
              const bufferCommandListLength = modbusClient.bufferCommandList.get(unit).length
              node.checkQueueStates(bufferCommandListLength, unit)
              node.setNodeStatusByActivity(bufferCommandListLength, unit)
              node.updateStatusRrunning = false
              resolve()
            } catch (err) {
              node.updateStatusRrunning = false
              reject(err)
            }
          })
      } else {
        if (node.showStatusActivities) {
          node.setNodeStatusByActivity(null, unit)
        }
      }
    }

    node.checkQueueStates = function (bufferCommandListLength, unit) {
      const unitWithQueue = node.unitsWithQueue.get(unit)
      if (!unitWithQueue.lowLowLevelReached && bufferCommandListLength < node.lowLowLevel) {
        node.resetStates(unit)
      }
      node.checkLowLevelReached(node, bufferCommandListLength, unit)
      node.checkHighLevelReached(node, bufferCommandListLength, unit)
      node.checkHighHighLevelReached(node, bufferCommandListLength, unit)
    }

    node.readFromAllUnitQueues = function () {
      if (node.updateStatusRrunning) {
        return
      }

      if (modbusClient.bufferCommands) {
        return new Promise(
          function (resolve, reject) {
            try {
              node.updateStatusRrunning = true
              let bufferCommandListLength = 0
              for (let unit = 0; unit < 256; unit += 1) {
                bufferCommandListLength = modbusClient.bufferCommandList.get(unit).length
                if (!bufferCommandListLength) {
                  continue
                }
                node.checkQueueStates(bufferCommandListLength, unit)
              }
              node.updateStatusRrunning = false
              resolve()
            } catch (err) {
              node.updateStatusRrunning = false
              reject(err)
            }
          })
      }
    }

    node.registerModbusQueueActionsToNode = function (eventCallback) {
      if (node.updateOnAllQueueChanges) { // much more CPU-Load on many parallel requests to the client
        modbusClient.on('mbqueue', eventCallback) // en-queue
      }
      modbusClient.on('mbactive', eventCallback) // de-queue
      modbusClient.on('mbinit', eventCallback)
      modbusClient.on('mbconnected', eventCallback)
      modbusClient.on('mberror', eventCallback)
      modbusClient.on('mbclosed', eventCallback)
      node.queueReadInterval = setInterval(eventCallback, node.queueReadIntervalTime)
    }

    node.removeModbusQueueActionsFromNode = function (eventCallback) {
      modbusClient.removeListener('mbqueue', eventCallback)
      modbusClient.removeListener('mbactive', eventCallback)
      modbusClient.removeListener('mbinit', eventCallback)
      modbusClient.removeListener('mbconnected', eventCallback)
      modbusClient.removeListener('mberror', eventCallback)
      modbusClient.removeListener('mbclosed', eventCallback)
    }

    if (node.updateOnAllUnitQueues) {
      node.registerModbusQueueActionsToNode(node.readFromAllUnitQueues)
      mbBasics.setNodeStatusTo('active for all queues', node)
    } else {
      node.registerModbusQueueActionsToNode(node.readFromQueue)
    }

    node.on('input', function (msg) {
      let msgUnitId = node.unitid
      msg.payload = {}
      msg.payload.queueEnabled = modbusClient.bufferCommands

      if (node.updateOnAllUnitQueues) {
        msg.payload.allQueueData = true
        msg.payload.queues = modbusClient.bufferCommandList
      } else {
        try {
          if (msg.payload.resetQueue) {
            msgUnitId = parseInt(msg.payload.unitId) || node.unitid
          } else {
            msgUnitId = parseInt(msg.payload) || node.unitid
          }
        } catch (err) {
          node.errorProtocolMsg(err, msg)
          mbBasics.sendEmptyMsgOnFail(node, err, msg)
          msgUnitId = node.unitid
        }
        msg.payload.allQueueData = false
        msg.payload.unitid = msgUnitId
        msg.payload.queue = modbusClient.bufferCommandList.get(msgUnitId)
      }

      msg.payload.queueOptions = {
        date: Date.now(),
        state: 'queue request',
        modbusClientName: modbusClient.name || modbusClient.id,
        lowlowLevel: node.lowlowLevel,
        unitId: msgUnitId,
        lowLevel: node.lowLevel,
        highLevel: node.highLevel,
        highHighLevel: node.highHighLevel
      }

      const msgQueueReset = msg.payload.resetQueue || msg.resetQueue
      if (msgQueueReset && modbusClient.bufferCommands) {
        coreModbusQueue.initQueue(modbusClient)
        if (RED.settings.verbose) {
          const infoText = 'Init Queue By External Node'
          modbusClient.warn(infoText)
          internalDebugLog(infoText)
        }
        node.initUnitQueueStates()

        if (node.showStatusActivities) {
          node.status({
            fill: 'blue',
            shape: 'ring',
            text: 'active empty unit queue'
          })
        }
        msg.payload.queueOptions.state = 'queue reset done'
      }

      node.send(msg)
    })

    node.on('close', function (done) {
      if (node.updateOnAllUnitQueues) {
        node.removeModbusQueueActionsFromNode(node.readFromAllUnitQueues)
      } else {
        node.removeModbusQueueActionsFromNode(node.readFromQueue)
      }
      mbBasics.setNodeStatusTo('closed', node)
      if (node.queueReadInterval) {
        clearInterval(node.queueReadInterval)
      }
      node.queueReadInterval = null
      modbusClient.deregisterForModbus(node.id, done)
    })

    if (!node.showStatusActivities) {
      mbBasics.setNodeDefaultStatus(node)
    }
  }

  RED.nodes.registerType('modbus-queue-info', ModbusQueueInfo)
}
