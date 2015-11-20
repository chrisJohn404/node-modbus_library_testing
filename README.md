# node-modbus_library_testing

This is a simple repository for playing around with nodejs modbus libraries and communicating with a modbus client.  The examples are taylored specifically to using a [LabJack T7](https://labjack.com/products/t7) due to the registers being read and parsed.


## Installing
1. Clone this repository:
```
git clone 'https://github.com/chrisJohn404/node-modbus_library_testing'
```
2. Install the projects dependencies:
```
npm install
```

## Using
1. Configure the **DEVICE_IP_ADDRESS** variable in the indes.js file:
```javascript
var DEVICE_IP_ADDRESS = '192.168.1.252';
```
2. Run the example:
```
npm start
```

## Tested With...
Confirmed to be working with nodejs 5.0.0 on Windows 10.
