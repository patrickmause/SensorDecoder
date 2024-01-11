function Encoder(measurements, port) {

    // 0 = disable, 1 = enable

    var system       = false;
    var temp_up      = false;
    var temp_down    = false;
    var fan          = false;
    var control_mode = false;
    var reboot       = false;
    
    var lock = 0;
    
    if(system) {
        lock = bit_set(lock, 0);
    }
    
    if(temp_up) {
        lock = bit_set(lock, 1);
    }
    
    if(temp_down) {
        lock = bit_set(lock, 2);
    }
    
    if(fan) {
        lock = bit_set(lock, 3);
    }
    
    if(control_mode) {
        lock = bit_set(lock, 4);
    }
    
    if(reboot) {
        lock = bit_set(lock, 5);
    }
    
    var bytes = get2ByteArray(lock);
    
    return [0xFF, 0x25, bytes[1]];
}

function bit_set(num, bit){
    return num | 1<<bit;
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