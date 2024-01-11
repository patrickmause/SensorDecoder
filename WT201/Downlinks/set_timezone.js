function Encoder(measurements, port) {
    
    //UTC -4
    var timezone = -4;
    
    var tzcoded = timezone * 60;
    
    if(tzcoded<0) {
        tzcoded = 65536 + tzcoded;
    }
    
    var bytes = get2ByteArray(tzcoded);
    
    return [0xFF, 0xBD, bytes[0], bytes[1]];
}


function get2ByteArray(value) {
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