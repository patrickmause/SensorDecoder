function Encoder(measurements, port) {
    var value = measurements["DEGREES_KELVIN38"].value;
    
    var signed    = 0;
    var length    = 2;
    var precision = 1;
    
    if(value<0)
    {
        signed = 1;
        value = value * -1;
    }
    
    switch(precision)
    {
        case 1:
            value = value * 10;
            break;
        case 2:
            value = value * 100;
            break;
        case 3:
            value = value * 1000;
            break;
        case 4:
            value = value * 10000;
            break;
    }
    
    var definition = 0;
    definition += (signed << 7);
    definition += (length << 4);
    definition += (precision << 1);
    
    var bytes = get4ByteArray(value);

    if(length==1)
        return [0x26, definition, bytes[3]];
    else if(length==2)
        return [0x26, definition, bytes[2], bytes[3]];
    else if(length==3)
        return [0x26, definition, bytes[1], bytes[2], bytes[3]];
    else if(length==4)
        return [0x26, definition, bytes[0], bytes[1], bytes[2], bytes[3]];
}

function get4ByteArray(value) {
    return hexToBytes(value.toString(16).padStart(8,'0'));
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