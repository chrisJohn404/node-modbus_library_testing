/*
 * This is a quick example with using the node-modbus-stack library and
 * communicating with a T7's test registers.
*/

var async = require('async');

var DEVICE_IP_ADDRESS = '192.168.1.252';

var requests = [{
    'name': 'TEST',
    'startingAddress': 55100,
    'numRegisters': 2,
    'type': 'uint32',
}, {
    'name': 'TEST_UINT16',
    'startingAddress': 55110,
    'numRegisters': 1,
    'type': 'uint16',
}, {
    'name': 'TEST_UINT32',
    'startingAddress': 55120,
    'numRegisters': 2,
    'type': 'uint32',
}, {
    'name': 'TEST_INT32',
    'startingAddress': 55122,
    'numRegisters': 2,
    'type': 'int32',
}, {
    'name': 'TEST_FLOAT32',
    'startingAddress': 55124,
    'numRegisters': 2,
    'type': 'float',
}, {
    'name': 'AIN0',
    'startingAddress': 0,
    'numRegisters': 2,
    'type': 'float',
}];


// Define what modbus libraries to test.
var stacksToTest = [
{
    'name': 'modbus-stack',
    'library': require('./use_modbus-stack'),
    'deviceIPAddress': DEVICE_IP_ADDRESS,
    'requests': requests,
},
{
    'name': 'modbus-tcp',
    'library': require('./use_modbus-tcp'),
    'deviceIPAddress': DEVICE_IP_ADDRESS,
    'requests': requests,
},
];

// Test each library one at a time.
async.eachSeries(
    stacksToTest,
    function iterator(modbusStack, callback) {
        console.log();
        console.log('** Testing the ' + modbusStack.name + ' modbus library. ***');
        modbusStack.library.run(
            modbusStack.deviceIPAddress,
            modbusStack.requests,
            callback
        );
    },
    function done() {
        console.log();
        console.log('Finished!');
    });