function Decoder(payload, port) {
    var decoded = [];    
    var UNIT_BINARY     = 0xFF;
    var UNIT_MULTISTATE = 0xFE;

    if(port === 13)
    {
        decoded.push({
            "field": "POWERSTATUS",
            "value": payload[0]
        });

        if(payload.length>4)
        {
            decoded.push({
                "field": "VERSION",
                "value": "" + payload[1] + "." + payload[2] + "." + payload[3] + "." + payload[4]
            });
        }
    }
    else if(port === 8)
    {
        for (var i = 0; i < payload.length;) 
        {
            var channel_id   = payload[i++];
            var channel_type = payload[i++];

            switch(channel_type) 
            {
            case UNIT_BINARY:
                decoded.push({
                    "field": "BINARY" + channel_id,
                    "value": payload[i] === 1 ? "true":"false"
                });
                i++;
                break;
            case UNIT_MULTISTATE:
                decoded.push({
                    "field": "MULTISTATE" + channel_id,
                    "value": payload[i]
                });
                i++;
                i++;
                break;
            default:
            
                var definition = payload[i++];
            
                var sign      = (definition >>> 7) & 0x01;
                var length    = (definition >>> 4) & 0x07;
                var precision = (definition >>> 1) & 0x07;
                var value;
            
                switch(length)
                {
                    case 1:
                        value = payload[i];
                        i++;
                        break;
                    case 2:
                        value = (payload[i] << 8 | payload[i+1])
                        i+=2;
                        break;
                    case 3:
                        value = (payload[i] << 16 | payload[i+1] << 8 | payload[i+2])
                        i+=3;
                        break;
                    case 4:
                        value = (payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3])
                        i+=4;
                        break;
                }
                
                if(sign) {
                    value = u_to_s(value);
                }
                    
                switch(precision)
                {
                    case 1:
                        value = value / 10;
                        break;
                    case 2:
                        value = value / 100;
                        break;
                    case 3:
                        value = value / 1000;
                        break;
                    case 4:
                        value = value / 10000;
                        break;
                }
            
                switch(channel_type) 
                {
                    case 3:
                        decoded.push({
                            "field": "AMPERES" + channel_id,
                            "value": value
                        });
                        break;
                    case 220:
                        decoded.push({
                            "field": "NANOGRAMS_PER_CUBIC_METER" + channel_id,
                            "value": value
                        });
                        break;
                    case 18:
                        decoded.push({
                            "field": "WATT_HOURS" + channel_id,
                            "value": value
                        });
                        break;
                    case 47:
                        decoded.push({
                            "field": "WATTS" + channel_id,
                            "value": value
                        });
                        break;
                    case 5:
                        decoded.push({
                            "field": "VOLTS" + channel_id,
                            "value": value
                        });
                        break;
                    case 6:
                        decoded.push({
                            "field": "KILOVOLTS" + channel_id,
                            "value": value
                        });
                        break;
                    case 48:
                        decoded.push({
                            "field": "KILOWATTS" + channel_id,
                            "value": value
                        });
                        break;
                    case 62:
                        decoded.push({
                            "field": "DEGREES_FAHRENHEIT" + channel_id,
                            "value": value
                        });
                        break;
                    case 63:
                        decoded.push({
                            "field": "DEGREES_KELVIN" + channel_id,
                            "value": value
                        });
                        break;
                    case 64:
                        decoded.push({
                            "field": "DEGREES_FAHRENHEIT" + channel_id,
                            "value": value
                        });
                        break;
                    case 95:
                        decoded.push({
                            "field": "NO_UNITS" + channel_id,
                            "value": value
                        });
                        break;
                    case 7:
                        decoded.push({
                            "field": "MEGAVOLTS" + channel_id,
                            "value": value
                        });
                        break;
                    case 49:
                        decoded.push({
                            "field": "MEGAWATTS" + channel_id,
                            "value": value
                        });
                        break;
                    case 2:
                        decoded.push({
                            "field": "MILLIAMPERES" + channel_id,
                            "value": value
                        });
                        break;
                    case 132:
                        decoded.push({
                            "field": "MILLIWATTS" + channel_id,
                            "value": value
                        });
                        break;
                    case 19:
                        decoded.push({
                            "field": "KWH" + channel_id,
                            "value": value
                        });
                        break;
                    case 29:
                        decoded.push({
                            "field": "PERCENT_RH" + channel_id,
                            "value": value
                        });
                        break;
                    case 37:
                        decoded.push({
                            "field": "LUXES" + channel_id,
                            "value": value
                        });
                        break;
                    case 36:
                        decoded.push({
                            "field": "LUMENS" + channel_id,
                            "value": value
                        });
                        break;
                    case 38:
                        decoded.push({
                            "field": "FOOT_CANDELS" + channel_id,
                            "value": value
                        });
                        break;
                    case 67:
                        decoded.push({
                            "field": "YEARS" + channel_id,
                            "value": value
                        });
                        break;
                    case 68:
                        decoded.push({
                            "field": "MONTHS" + channel_id,
                            "value": value
                        });
                        break;
                    case 69:
                        decoded.push({
                            "field": "WEEKS" + channel_id,
                            "value": value
                        });
                        break;
                    case 70:
                        decoded.push({
                            "field": "DAYS" + channel_id,
                            "value": value
                        });
                        break;
                    case 71:
                        decoded.push({
                            "field": "HOURS" + channel_id,
                            "value": value
                        });
                        break;
                    case 72:
                        decoded.push({
                            "field": "MINUTES" + channel_id,
                            "value": value
                        });
                        break;
                    case 73:
                        decoded.push({
                            "field": "SECONDS" + channel_id,
                            "value": value
                        });
                        break;
                    case 96:
                        decoded.push({
                            "field": "PARTS_PER_MILLION" + channel_id,
                            "value": value
                        });
                        break;
                    case 97:
                        decoded.push({
                            "field": "PARTS_PER_BILLION" + channel_id,
                            "value": value
                        });
                        break;
                    case 98:
                        decoded.push({
                            "field": "PERCENT" + channel_id,
                            "value": value
                        });
                        break;
                    case 82:
                        decoded.push({
                            "field": "LITERS" + channel_id,
                            "value": value
                        });
                        break;
                    case 83:
                        decoded.push({
                            "field": "US_GALLONS" + channel_id,
                            "value": value
                        });
                        break;
                    case 88:
                        decoded.push({
                            "field": "LITERS_PER_MINUTE" + channel_id,
                            "value": value
                        });
                        break;
                    case 89:
                        decoded.push({
                            "field": "US_GALLONS_PER_MINUTE" + channel_id,
                            "value": value
                        });
                        break;
                    }
            }
        }
    }
    
    
    return decoded;
}


function u_to_s(u_value) {
    if(u_value > 16777216) {
      return u_value - 4294967295;
    }
  
    if(u_value > 65536) {
      return u_value - 16777216;
    }
  
    if(u_value > 256) {
      return u_value - 65536;
    }
    
    return u_value - 256;
}