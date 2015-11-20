/*
 * This is a quick example with using the node-modbus-stack library and
 * communicating with a T7's test registers.
*/

var async = require('async');


var registerTypes = {
    'uint16': {'parseFunc': 'readUInt16BE',   'size': 1,},
    'uint32': {'parseFunc': 'readUInt32BE',   'size': 2,},
    'int32':  {'parseFunc': 'readInt32BE',    'size': 2,},
    'float':  {'parseFunc': 'readFloatBE',    'size': 2,},
};

var NUM_BYTES_IN_REGISTER = 2;

function parseResult(registers, type) {
    var typeData = registerTypes[type];
    var buff = new Buffer(typeData.size * NUM_BYTES_IN_REGISTER);
    buff.fill(0);
    for(var i = 0; i < typeData.size; i++) {
        buff.writeUInt16BE(registers[i], i * 2);
    }
    var result = buff[typeData.parseFunc](0);
    return result;
}


function run(ipAddress, requests, finalCallback) {
    // 'RIR' contains the "Function Code" that we are going to invoke on the remote device
    var RIR = require('modbus-stack').FUNCTION_CODES.READ_INPUT_REGISTERS;

    // IP and port of the MODBUS slave, default port is 502
    var client = require('modbus-stack/client').createClient(502, '192.168.1.252');


    async.eachSeries(
        requests,
        function iterator(request, callback) {
            // 'req' is an instance of the low-level `ModbusRequestStack` class
            var req = client.request(
                RIR, // Function Code: 4
                request.startingAddress,    // Start at address
                request.numRegisters        // Read n number of contiguous registers
            );

            // 'response' is emitted after the entire contents of the response has been received.
            req.on('response', function(registers) {
                // An Array of length 50 filled with Numbers of the current registers.
                // console.log(' - Response:', registers);
                
                console.log(' - Parsed Result, Reg:', request.name, 'Val:', parseResult(registers, request.type));
                callback();
            });
        }, function done() {
            client.end();
            finalCallback();
        });
}
exports.run = run;