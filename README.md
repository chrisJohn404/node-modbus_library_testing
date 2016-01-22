# node-modbus_library_testing

This is a simple repository for playing around with Node.js Modbus libraries and communicating with a Modbus client.  The examples are taylored specifically to using a [LabJack T7](https://labjack.com/products/t7) due to the registers being read and parsed.

##### Modbus Libraries used:
1. [Modbus-Stack](https://www.npmjs.com/package/modbus-stack) that is used by [iobroker.modbus](https://www.npmjs.com/package/iobroker.modbus)
2. [Modbus-TCP](https://www.npmjs.com/package/modbus-tcp)

##### Other interesting npm packages to explore:
1. [jsmodbus](https://www.npmjs.com/package/jsmodbus)
2. [modbus-rtu](https://www.npmjs.com/package/modbus-rtu)
3. [modbus-ws](https://www.npmjs.com/package/modbus-ws)
4. [modbus](https://www.npmjs.com/package/modbus)
Search for more Modbus related modules on [npm](https://www.npmjs.com/browse/keyword/modbus).

### Installing
Clone this repository:
```
git clone https://github.com/chrisJohn404/node-modbus_library_testing
```
Navigate into the repository:
```
cd node-modbus_library_testing
```
Install the projects dependencies:
```
npm install
```

### Using
Configure the **DEVICE_IP_ADDRESS** variable in the index.js file:
```javascript
var DEVICE_IP_ADDRESS = '192.168.1.252';
```
Run the example:
```
npm start
```

### Tested With...
Confirmed to be working with Node.js 5.0.0 on Windows 10.
