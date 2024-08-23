var CRC_START_MODBUS = 0xFFFF;
var crcTab16 = [];
var crcTab16Initialized = false;

var deviceID = 0x02;
var commandID= 0x06;
var address1 = 0x00;
var address2 = 0x06
var valueInt = 0;

function Encoder(measurements, port) {
    
    var array = [];
    
    array[0] = deviceID;
    array[1] = commandID;
    array[2] = address1;
    array[3] = address2;
    array[4] = get2ByteArray(valueInt)[0];
    array[5] = get2ByteArray(valueInt)[1];
    
    var crc = get2ByteArray(crcModbus(array, 6));
    
    return [array[0], array[1], array[2], array[3], array[4], array[5], crc[1], crc[0]];
}

function crcModbus(inputStr, numBytes) {
    var crc;
    var ptr;
    var a;

    if (!crcTab16Initialized) {
        initCrc16Tab();
    }

    crc = CRC_START_MODBUS;
    ptr = inputStr;

    if (ptr !== null) {
        for (a = 0; a < numBytes; a++) {
            crc = ((crc >> 8) ^ crcTab16[(crc ^ ptr[a]) & 0x00FF]);
        }
    }

    return crc;
}

/**
 * Initializes the CRC16 lookup table.
 */
function initCrc16Tab() {
    var i, j, crc;

    for (i = 0; i < 256; i++) {
        crc = i;
        for (j = 0; j < 8; j++) {
            if (crc & 0x0001) {
                crc = (crc >> 1) ^ 0xA001;
            } else {
                crc >>= 1;
            }
        }
        crcTab16[i] = crc;
    }

    crcTab16Initialized = true;
}

function get2ByteArray(value) {
    
    if(value<0) {
        value = 65536 + value;
    }
    
    return hexToBytes(value.toString(16).padStart(4,'0'));
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

if (!String.prototype.padStart) {
  Object.defineProperty(String.prototype, 'padStart', {
    configurable: true,
    writable: true,
    value: function (targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length > targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
      }
    },
  });
}

if (!String.prototype.repeat) {
  Object.defineProperty(String.prototype, 'repeat', {
    configurable: true,
    writable: true,
    value: function (count) {
      if (this == null) {
        throw new TypeError("can't convert " + this + ' to object');
      }
      var str = '' + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
      }
      if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return '';
      }
      if (str.length * count >= 1 << 28) {
        throw new RangeError(
          'repeat count must not overflow maximum string size'
        );
      }
      var rpt = '';
      for (; ;) {
        if ((count & 1) == 1) {
          rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
          break;
        }
        str += str;
      }
      return rpt;
    },
  });
}