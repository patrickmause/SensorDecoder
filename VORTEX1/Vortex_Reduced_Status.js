function Decoder(payload, port) {
    var decoded = [];
    
    if(port === 12)
    {
        for (var i = 0; i < payload.length;) 
        {
            decoded.push({
                        "field": "STATUS" + payload[i++],
                        "value": payload[i++] === 2 ? "true":"false"
                    });
        }
    }
    else if(port === 13)
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
        var UNIT_BINARY     = 0xFF;
        var UNIT_MULTISTATE = 0xFE;
        
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
                case 3:
                    decoded.push({
                        "field": "AMPERES" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 18:
                    decoded.push({
                        "field": "WATT_HOURS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 220:
                    decoded.push({
                        "field": "NANOGRAMS_PER_CUBIC_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 47:
                    decoded.push({
                        "field": "WATTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 5:
                    decoded.push({
                        "field": "VOLTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 6:
                    decoded.push({
                        "field": "KILOVOLTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 48:
                    decoded.push({
                        "field": "KILOWATTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 62:
                    decoded.push({
                        "field": "DEGREES_FAHRENHEIT" + channel_id,
                        "value": ((u16_to_s16(payload[i] << 8 | payload[i+1], 16) / 10) * 9/5) + 32
                    });
                    i += 2;
                    break;
                case 63:
                    decoded.push({
                        "field": "DEGREES_KELVIN" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 64:
                    decoded.push({
                        "field": "DEGREES_FAHRENHEIT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 95:
                    decoded.push({
                        "field": "NO_UNITS" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 100
                    });
                    i += 4;
                    break;
                case 7:
                    decoded.push({
                        "field": "MEGAVOLTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 49:
                    decoded.push({
                        "field": "MEGAWATTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 2:
                    decoded.push({
                        "field": "MILLIAMPERES" + channel_id,
                        "value": readUInt(payload[i], payload[i+1], payload[i+2], payload[i+3])
                    });
                    i += 4;
                    break;
                case 132:
                    decoded.push({
                        "field": "MILLIWATTS" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3])
                    });
                    i += 4;
                    break;
                case 19:
                    decoded.push({
                        "field": "KWH" + channel_id,
                        "value": readUInt(payload[i], payload[i+1], payload[i+2], payload[i+3]) / 1000
                    });
                    i += 4;
                    break;
                case 29:
                    decoded.push({
                        "field": "PERCENT_RH" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 37:
                    decoded.push({
                        "field": "LUXES" + channel_id,
                        "value": readUInt(payload[i], payload[i+1], payload[i+2], payload[i+3])
                    });
                    i += 4;
                    break;
                case 36:
                    decoded.push({
                        "field": "LUMENS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 38:
                    decoded.push({
                        "field": "FOOT_CANDELS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 67:
                    decoded.push({
                        "field": "YEARS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 68:
                    decoded.push({
                        "field": "MONTHS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 69:
                    decoded.push({
                        "field": "WEEKS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 70:
                    decoded.push({
                        "field": "DAYS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 71:
                    decoded.push({
                        "field": "HOURS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 72:
                    decoded.push({
                        "field": "MINUTES" + channel_id,
                        "value": readUInt(payload[i], payload[i+1], payload[i+2], payload[i+3])
                    });
                    i += 4;
                    break;
                case 73:
                    decoded.push({
                        "field": "SECONDS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 96:
                    decoded.push({
                        "field": "PARTS_PER_MILLION" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 97:
                    decoded.push({
                        "field": "PARTS_PER_BILLION" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 98:
                    decoded.push({
                        "field": "PERCENT" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 82:
                    decoded.push({
                        "field": "LITERS" + channel_id,
                        "value": readUInt(payload[i], payload[i+1], payload[i+2], payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 83:
                    decoded.push({
                        "field": "US_GALLONS" + channel_id,
                        "value": readUInt(payload[i], payload[i+1], payload[i+2], payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 88:
                    decoded.push({
                        "field": "LITERS_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 89:
                    decoded.push({
                        "field": "US_GALLONS_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
            }
        }
    }
    
    return decoded;
}

function u16_to_s16(u16) {
    var s16 = u16&0xFFFF;
    if (0x8000 & s16){s16 = - (0x010000 - s16);}
    return s16;
}

function u32_to_s32(u32) {
    var s32 = u32&0xFFFFFFFF;
    return s32;
}

function readUInt(b1, b2, b3, b4) {
    var value = 0;
    value = (value * 256) + b1;
    value = (value * 256) + b2;
    value = (value * 256) + b3;
    value = (value * 256) + b4;
    return value;
}
