
var net = require('net');
var async = require('async');

var modbus = require('modbus-tcp');

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
        buff.writeUInt16BE(registers[i].readUInt16BE(0), i * 2);
    }
    var result = buff[typeData.parseFunc](0);
    return result;
}

function run(ipAddress, requests, finalCallback) {
    // Create a new modbus client stream.
    var modbusClient = new modbus.Client();

    // Create a TCP socket stream
    var tcpConnection = net.connect(
    	{port: 502, host: ipAddress},
    	connectedToDevice
    );
    
    // Connect the modbusClient stream with the tcp socket stream.
    modbusClient.pipe(tcpConnection);
    
    // Define a function to be called when we connect to the device.
    function connectedToDevice() {
    	// console.log('Connected To Device...');

    	// Read each of the requested registers
    	async.eachSeries(
    		requests,
    		function iterator(request, callback) {
    			var unitID = 1;
    			var startingAddress = request.startingAddress;
    			var finalAddress = startingAddress + request.numRegisters - 1;
    			// console.log('Reading...', request.name, startingAddress, finalAddress);

    			// Issue a modbus read request
    			modbusClient.readInputRegisters(
    				unitID,
    				startingAddress,
    				finalAddress,
    				function readModbusData(err, registers) {
    					// console.log('Read data', request.name, err, registers);
    					// Parse the returned result
    					console.log(' - Parsed Result, Reg:', request.name, 'Val:', parseResult(registers, request.type));
    					callback();
    				});
    		}, function(done) {
    			// We are finished reading data.  Terminate the connection.
    			closeConnection();
    		});
    }

    // Terminate the device connection.
    function closeConnection() {
    	tcpConnection.end();
    	finalCallback();
    }
}
exports.run = run;