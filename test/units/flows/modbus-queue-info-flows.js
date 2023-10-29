
const helperExtensions = require('../../helper/test-helper-extensions')

module.exports = {

  "testShouldBeLoadedFlow": helperExtensions.cleanFlowPositionData([
    {
      "id": "bd319004992a7bc3",
      "type": "tab",
      "label": "Should Be Loaded",
      "disabled": false,
      "info": "",
      "env": []
    },
    {
      "id": "389153e.cb648ac",
      "type": "modbus-server",
      "z": "bd319004992a7bc3",
      "name": "modbusServer",
      "logEnabled": false,
      "hostname": "0.0.0.0",
      "serverPort": "6503",
      "responseDelay": 100,
      "delayUnit": "ms",
      "coilsBufferSize": 10000,
      "holdingBufferSize": 10000,
      "inputBufferSize": 10000,
      "discreteBufferSize": 10000,
      "showErrors": false,
      "x": 300,
      "y": 300,
      "wires": [
        [],
        [],
        [],
        [],
        []
      ]
    },
    {
      "id": "ef5dad20.e97af",
      "type": "modbus-queue-info",
      "z": "bd319004992a7bc3",
      "name": "modbusQueueInfo",
      "topic": "",
      "unitid": "",
      "queueReadIntervalTime": "100",
      "lowLowLevel": 1,
      "lowLevel": 2,
      "highLevel": 3,
      "highHighLevel": 4,
      "server": "d4c76ff5.c424b8",
      "errorOnHighLevel": false,
      "showStatusActivities": true,
      "updateOnAllQueueChanges": false,
      "updateOnAllUnitQueues": false,
      "x": 450,
      "y": 200,
      "wires": [
        []
      ]
    },
    {
      "id": "d322d62a.bd875",
      "type": "inject",
      "z": "bd319004992a7bc3",
      "name": "",
      "props": [
        {
          "p": "payload"
        },
        {
          "p": "topic",
          "vt": "str"
        }
      ],
      "repeat": 1,
      "crontab": "",
      "once": true,
      "onceDelay": 1,
      "topic": "",
      "payload": "",
      "payloadType": "date",
      "x": 210,
      "y": 200,
      "wires": [
        [
          "ef5dad20.e97af"
        ]
      ]
    },
    {
      "id": "d4c76ff5.c424b8",
      "type": "modbus-client",
      "name": "modbusClient",
      "clienttype": "tcp",
      "bufferCommands": true,
      "stateLogEnabled": false,
      "queueLogEnabled": false,
      "failureLogEnabled": false,
      "tcpHost": "127.0.0.1",
      "tcpPort": "6503",
      "tcpType": "DEFAULT",
      "serialPort": "/dev/ttyUSB",
      "serialType": "RTU-BUFFERD",
      "serialBaudrate": "9600",
      "serialDatabits": "8",
      "serialStopbits": "1",
      "serialParity": "none",
      "serialConnectionDelay": "100",
      "serialAsciiResponseStartDelimiter": "",
      "unit_id": "1",
      "commandDelay": "1",
      "clientTimeout": "100",
      "reconnectOnTimeout": false,
      "reconnectTimeout": "200",
      "parallelUnitIdsAllowed": true
    }
  ]),

  "testOldResetInjectShouldBeLoadedFlow": helperExtensions.cleanFlowPositionData([
    {
      "id": "aa626b536111a991",
      "type": "tab",
      "label": "Old Reset Inject",
      "disabled": false,
      "info": "",
      "env": []
    },
    {
      "id": "445454e4.968564",
      "type": "modbus-server",
      "z": "aa626b536111a991",
      "name": "",
      "logEnabled": true,
      "hostname": "127.0.0.1",
      "serverPort": "7503",
      "responseDelay": 100,
      "delayUnit": "ms",
      "coilsBufferSize": 10000,
      "holdingBufferSize": 10000,
      "inputBufferSize": 10000,
      "discreteBufferSize": 10000,
      "showErrors": false,
      "x": 440,
      "y": 320,
      "wires": [
        [],
        [],
        [],
        [],
        []
      ]
    },
    {
      "id": "5fffb0bc.0b8a5",
      "type": "modbus-queue-info",
      "z": "aa626b536111a991",
      "name": "QueueInfo",
      "topic": "",
      "unitid": "",
      "queueReadIntervalTime": 100,
      "lowLowLevel": 1,
      "lowLevel": 2,
      "highLevel": 3,
      "highHighLevel": 4,
      "server": "1e3ac4ea.86fa7b",
      "errorOnHighLevel": false,
      "showStatusActivities": true,
      "updateOnAllQueueChanges": false,
      "updateOnAllUnitQueues": false,
      "x": 430,
      "y": 180,
      "wires": [
        [
          "h1"
        ]
      ]
    },
    {
      "id": "ae473c43.3e7938",
      "type": "inject",
      "z": "aa626b536111a991",
      "name": "",
      "props": [
        {
          "p": "payload"
        },
        {
          "p": "topic",
          "vt": "str"
        }
      ],
      "repeat": 2,
      "crontab": "",
      "once": false,
      "onceDelay": 1,
      "topic": "",
      "payload": "",
      "payloadType": "date",
      "x": 190,
      "y": 180,
      "wires": [
        [
          "5fffb0bc.0b8a5"
        ]
      ]
    },
    {
      "id": "h1",
      "type": "helper",
      "z": "aa626b536111a991",
      "name": "",
      "tosidebar": true,
      "console": false,
      "tostatus": false,
      "complete": "payload",
      "targetType": "msg",
      "statusVal": "",
      "statusType": "auto",
      "x": 750,
      "y": 180,
      "wires": []
    },
    {
      "id": "1e3ac4ea.86fa7b",
      "type": "modbus-client",
      "name": "ModbsuFlexServer",
      "clienttype": "tcp",
      "bufferCommands": true,
      "stateLogEnabled": true,
      "queueLogEnabled": false,
      "failureLogEnabled": false,
      "tcpHost": "127.0.0.1",
      "tcpPort": "7503",
      "tcpType": "DEFAULT",
      "serialPort": "/dev/ttyUSB",
      "serialType": "RTU-BUFFERD",
      "serialBaudrate": "9600",
      "serialDatabits": "8",
      "serialStopbits": "1",
      "serialParity": "none",
      "serialConnectionDelay": "100",
      "serialAsciiResponseStartDelimiter": "",
      "unit_id": "1",
      "commandDelay": "1",
      "clientTimeout": "100",
      "reconnectOnTimeout": false,
      "reconnectTimeout": "200",
      "parallelUnitIdsAllowed": true
    }
  ]),

  "testNewResetInjectShouldBeLoadedFlow": helperExtensions.cleanFlowPositionData([
    {
      "id": "171902b23fcc8045",
      "type": "tab",
      "label": "New Reset Inject",
      "disabled": false,
      "info": "",
      "env": []
    },
    {
      "id": "445454e4.968564",
      "type": "modbus-server",
      "z": "171902b23fcc8045",
      "name": "",
      "logEnabled": true,
      "hostname": "127.0.0.1",
      "serverPort": "7503",
      "responseDelay": 100,
      "delayUnit": "ms",
      "coilsBufferSize": 10000,
      "holdingBufferSize": 10000,
      "inputBufferSize": 10000,
      "discreteBufferSize": 10000,
      "showErrors": false,
      "x": 460,
      "y": 260,
      "wires": [
        [],
        [],
        [],
        [],
        []
      ]
    },
    {
      "id": "5fffb0bc.0b8a5",
      "type": "modbus-queue-info",
      "z": "171902b23fcc8045",
      "name": "QueueInfo",
      "topic": "",
      "unitid": "",
      "queueReadIntervalTime": 100,
      "lowLowLevel": 1,
      "lowLevel": 2,
      "highLevel": 3,
      "highHighLevel": 4,
      "server": "1e3ac4ea.86fa7b",
      "errorOnHighLevel": false,
      "showStatusActivities": true,
      "updateOnAllQueueChanges": false,
      "updateOnAllUnitQueues": false,
      "x": 450,
      "y": 160,
      "wires": [
        [
          "h1"
        ]
      ]
    },
    {
      "id": "ae473c43.3e7938",
      "type": "inject",
      "z": "171902b23fcc8045",
      "name": "",
      "props": [
        {
          "p": "payload"
        },
        {
          "p": "topic",
          "vt": "str"
        }
      ],
      "repeat": 2,
      "crontab": "",
      "once": false,
      "onceDelay": 1,
      "topic": "",
      "payload": "",
      "payloadType": "date",
      "x": 210,
      "y": 160,
      "wires": [
        [
          "5fffb0bc.0b8a5"
        ]
      ]
    },
    {
      "id": "h1",
      "type": "helper",
      "z": "171902b23fcc8045",
      "name": "",
      "tosidebar": true,
      "console": false,
      "tostatus": false,
      "complete": "payload",
      "targetType": "msg",
      "statusVal": "",
      "statusType": "auto",
      "x": 750,
      "y": 160,
      "wires": []
    },
    {
      "id": "1e3ac4ea.86fa7b",
      "type": "modbus-client",
      "name": "ModbsuFlexServer",
      "clienttype": "tcp",
      "bufferCommands": true,
      "stateLogEnabled": true,
      "queueLogEnabled": false,
      "failureLogEnabled": false,
      "tcpHost": "127.0.0.1",
      "tcpPort": "7503",
      "tcpType": "DEFAULT",
      "serialPort": "/dev/ttyUSB",
      "serialType": "RTU-BUFFERD",
      "serialBaudrate": "9600",
      "serialDatabits": "8",
      "serialStopbits": "1",
      "serialParity": "none",
      "serialConnectionDelay": "100",
      "serialAsciiResponseStartDelimiter": "",
      "unit_id": "1",
      "commandDelay": "1",
      "clientTimeout": "100",
      "reconnectOnTimeout": false,
      "reconnectTimeout": "200",
      "parallelUnitIdsAllowed": true
    }
  ]),

  "testInjectAndPollingShouldBeLoadedFlow": helperExtensions.cleanFlowPositionData([
    {
      "id": "05cc80ac414ed61c",
      "type": "tab",
      "label": "Inject And Polling",
      "disabled": false,
      "info": "",
      "env": []
    },
    {
      "id": "445454e4.968564",
      "type": "modbus-server",
      "z": "05cc80ac414ed61c",
      "name": "",
      "logEnabled": true,
      "hostname": "127.0.0.1",
      "serverPort": "8503",
      "responseDelay": 10,
      "delayUnit": "ms",
      "coilsBufferSize": 10000,
      "holdingBufferSize": 10000,
      "inputBufferSize": 10000,
      "discreteBufferSize": 10000,
      "showErrors": false,
      "x": 320,
      "y": 280,
      "wires": [
        [],
        [],
        [],
        [],
        []
      ]
    },
    {
      "id": "90922127.397cb8",
      "type": "modbus-read",
      "z": "05cc80ac414ed61c",
      "name": "Modbus Read With IO",
      "topic": "",
      "showStatusActivities": false,
      "logIOActivities": false,
      "showErrors": false,
      "unitid": "",
      "dataType": "Coil",
      "adr": "0",
      "quantity": "10",
      "rate": "50",
      "rateUnit": "ms",
      "delayOnStart": false,
      "startDelayTime": "",
      "server": "1e3ac4ea.86fa7b",
      "useIOFile": false,
      "ioFile": "",
      "useIOForPayload": false,
      "emptyMsgOnFail": false,
      "x": 320,
      "y": 180,
      "wires": [
        [
          "h1"
        ],
        []
      ]
    },
    {
      "id": "5fffb0bc.0b8a5",
      "type": "modbus-queue-info",
      "z": "05cc80ac414ed61c",
      "name": "QueueInfo",
      "topic": "",
      "unitid": "",
      "queueReadIntervalTime": 100,
      "lowLowLevel": 0,
      "lowLevel": 1,
      "highLevel": 2,
      "highHighLevel": 3,
      "server": "1e3ac4ea.86fa7b",
      "errorOnHighLevel": false,
      "showStatusActivities": true,
      "updateOnAllQueueChanges": false,
      "updateOnAllUnitQueues": false,
      "x": 330,
      "y": 120,
      "wires": [
        [
          "h1"
        ]
      ]
    },
    {
      "id": "ae473c43.3e7938",
      "type": "inject",
      "z": "05cc80ac414ed61c",
      "name": "",
      "props": [
        {
          "p": "payload"
        },
        {
          "p": "topic",
          "vt": "str"
        }
      ],
      "repeat": 0.3,
      "crontab": "",
      "once": true,
      "onceDelay": 0.2,
      "topic": "",
      "payload": "",
      "payloadType": "date",
      "x": 130,
      "y": 120,
      "wires": [
        [
          "5fffb0bc.0b8a5"
        ]
      ]
    },
    {
      "id": "h1",
      "type": "helper",
      "z": "05cc80ac414ed61c",
      "name": "",
      "tosidebar": true,
      "console": false,
      "tostatus": false,
      "complete": "payload",
      "targetType": "msg",
      "statusVal": "",
      "statusType": "auto",
      "x": 730,
      "y": 160,
      "wires": []
    },
    {
      "id": "1e3ac4ea.86fa7b",
      "type": "modbus-client",
      "name": "ModbsuFlexServer",
      "clienttype": "tcp",
      "bufferCommands": true,
      "stateLogEnabled": false,
      "queueLogEnabled": false,
      "failureLogEnabled": false,
      "tcpHost": "127.0.0.1",
      "tcpPort": "8503",
      "tcpType": "DEFAULT",
      "serialPort": "/dev/ttyUSB",
      "serialType": "RTU-BUFFERD",
      "serialBaudrate": "9600",
      "serialDatabits": "8",
      "serialStopbits": "1",
      "serialParity": "none",
      "serialConnectionDelay": "100",
      "serialAsciiResponseStartDelimiter": "",
      "unit_id": "1",
      "commandDelay": "1",
      "clientTimeout": "100",
      "reconnectOnTimeout": false,
      "reconnectTimeout": "200",
      "parallelUnitIdsAllowed": true
    }
  ]),

  "testResetFunctionQueueFlow": helperExtensions.cleanFlowPositionData([
    {
      "id": "e5301d52bc50140e",
      "type": "tab",
      "label": "Reset Function For Queue",
      "disabled": false,
      "info": "",
      "env": []
    },
    {
      "id": "445454e4.968564",
      "type": "modbus-server",
      "z": "e5301d52bc50140e",
      "name": "",
      "logEnabled": true,
      "hostname": "127.0.0.1",
      "serverPort": "9503",
      "responseDelay": 100,
      "delayUnit": "ms",
      "coilsBufferSize": 10000,
      "holdingBufferSize": 10000,
      "inputBufferSize": 10000,
      "discreteBufferSize": 10000,
      "showErrors": false,
      "x": 460,
      "y": 200,
      "wires": [
        [],
        [],
        [],
        [],
        []
      ]
    },
    {
      "id": "5fffb0bc.0b8a5",
      "type": "modbus-queue-info",
      "z": "e5301d52bc50140e",
      "name": "QueueInfo",
      "topic": "",
      "unitid": "1",
      "queueReadIntervalTime": 100,
      "lowLowLevel": 1,
      "lowLevel": 2,
      "highLevel": 3,
      "highHighLevel": 4,
      "server": "1e3ac4ea.86fa7b",
      "errorOnHighLevel": false,
      "showStatusActivities": true,
      "updateOnAllQueueChanges": false,
      "updateOnAllUnitQueues": false,
      "x": 490,
      "y": 80,
      "wires": [
        [
          "h1"
        ]
      ]
    },
    {
      "id": "ae473c43.3e7938",
      "type": "inject",
      "z": "e5301d52bc50140e",
      "name": "",
      "props": [
        {
          "p": "payload"
        },
        {
          "p": "topic",
          "vt": "str"
        }
      ],
      "repeat": 2,
      "crontab": "",
      "once": false,
      "onceDelay": 1,
      "topic": "",
      "payload": "",
      "payloadType": "date",
      "x": 130,
      "y": 80,
      "wires": [
        [
          "430f76bf.9de2d8"
        ]
      ]
    },
    {
      "id": "430f76bf.9de2d8",
      "type": "function",
      "z": "e5301d52bc50140e",
      "name": "reset on High",
      "func": "if(\"high level reached\" === msg.state) {\n    msg.payload.resetQueue = true;\n    return msg;\n}\n",
      "outputs": 1,
      "noerr": 0,
      "initialize": "",
      "finalize": "",
      "libs": [],
      "x": 330,
      "y": 80,
      "wires": [
        [
          "5fffb0bc.0b8a5"
        ]
      ]
    },
    {
      "id": "h1",
      "type": "helper",
      "z": "e5301d52bc50140e",
      "name": "",
      "tosidebar": true,
      "console": false,
      "tostatus": false,
      "complete": "payload",
      "targetType": "msg",
      "statusVal": "",
      "statusType": "auto",
      "x": 690,
      "y": 80,
      "wires": []
    },
    {
      "id": "1e3ac4ea.86fa7b",
      "type": "modbus-client",
      "name": "ModbsuFlexServer",
      "clienttype": "tcp",
      "bufferCommands": true,
      "stateLogEnabled": true,
      "queueLogEnabled": false,
      "failureLogEnabled": false,
      "tcpHost": "127.0.0.1",
      "tcpPort": "9503",
      "tcpType": "DEFAULT",
      "serialPort": "/dev/ttyUSB",
      "serialType": "RTU-BUFFERD",
      "serialBaudrate": "9600",
      "serialDatabits": "8",
      "serialStopbits": "1",
      "serialParity": "none",
      "serialConnectionDelay": "100",
      "serialAsciiResponseStartDelimiter": "",
      "unit_id": "1",
      "commandDelay": "1",
      "clientTimeout": "100",
      "reconnectOnTimeout": false,
      "reconnectTimeout": "200",
      "parallelUnitIdsAllowed": true
    }
  ])

}