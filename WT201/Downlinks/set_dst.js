function Encoder(measurements, port) {
    
    var dst_enable = true;                  // enable, disable DST
    var dst_bias   = 60;                    // bias in minutes
    var start_month= 10;                    // month, 10 = October
    var start_day  = 17;                    // day, 1 = 1st, 7 = Sunday
    var start_time = 120;                   // time in hours, 120h ~ 2:00am (?)
    var end_month  = 4;                     // month, 04 = April
    var end_day    = 17;                    // day, 1 = 1st, 7 = Sunday
    var end_time   = 120;                   // time in hours, 120h ~ 2:00am (?)
    
    
    var b1 = 0x01;
    
    if(!dst_enable) {
        b1 - 0x00;
    }
    
    var b2 = get2ByteArray(dst_bias);
    var b3 = get2ByteArray(start_month);
    var b4 = get2ByteArray(start_day);
    var b5 = get2ByteArray(start_time);
    var b6 = get2ByteArray(end_month);
    var b7 = get2ByteArray(end_day);
    var b8 = get2ByteArray(end_time);

    return [0xFF, 0xBA, b1, b2[1], b3[1], b4[1], b5[1], b5[0], b6[1], b7[1], b8[1], b8[0]];
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