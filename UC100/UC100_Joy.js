function Decoder(bytes, port) {

    var decoded = {};
    
    for (i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];

        // POWER
        if (channel_id === 0xff && channel_type === 0x0b) {
            decoded.power = "on";
            i += 1;
        }
        // IPSO VERSION
        else if (channel_id === 0xff && channel_type === 0x01) {
            decoded.protocol_version = readProtocolVersion(bytes[i]);
            i += 1;
        }
        // SERIAL NUMBER
        else if (channel_id === 0xff && channel_type === 0x16) {
            decoded.sn = readSerialNumber(bytes.slice(i, i + 8));
            i += 8;
        }
        // HARDWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x09) {
            decoded.hardware_version = readHardwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // FIRMWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x0a) {
            decoded.firmware_version = readFirmwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // MODBUS
        else if (channel_id === 0xff && channel_type === 0x19) {
            
            var modbus_chn_id = bytes[i++] + 1;
            var data_length = bytes[i++];
            var data_type = bytes[i++];
            var sign = (data_type >>> 7) & 0x01;
            var type = data_type & 0x7f; // 0b01111111
            var modbus_chn_name = "modbus_channel_" + modbus_chn_id;
            var value = 0;

            switch (type) {
                case 0:
                    value = bytes[i] ? "on" : "off";
                    i += 1;
                    break;
                case 1:
                    value = bytes[i];
                    i += 1;
                    break;
                case 2:
                case 3:
                    if(modbus_chn_id === 2 || modbus_chn_id === 29) {
                        value = readInt16LE(bytes.slice(i, i + 2));
                    }
                    else {
                        value = (sign ? readInt16LE(bytes.slice(i, i + 2)) : readUInt16LE(bytes.slice(i, i + 2)));
                    }
                    i += 2;
                    break;
                case 4:
                case 6:
                case 8:
                case 9:
                case 10:
                case 11:
                    value = (sign ? readInt32LE(bytes.slice(i, i + 4)) : readUInt32LE(bytes.slice(i, i + 4)));
                    i += 4;
                    break;
                case 5:
                case 7:
                    value = (readFloatLE(bytes.slice(i, i + 4)));
                    i += 4;
                    break;
            }
            
            switch(modbus_chn_id)  {
                case 1:
                    modbus_chn_name = "Setpoint";
                    value = value / 10;
                    decoded[modbus_chn_name] = value;
                    break;
                case 2:
                    modbus_chn_name = "Temperature_Offset";
                    value = value / 10;
                    decoded[modbus_chn_name] = value;
                    break;
                case 3:
                    modbus_chn_name = "Fan_Stage_Config";
                    decoded[modbus_chn_name] = value;
                    break;
                case 4:
                    modbus_chn_name = "Mode";
                    decoded[modbus_chn_name] = value;
                    break;
                case 5:
                    modbus_chn_name = "Display_Content";
                    decoded[modbus_chn_name] = value;
                    break;
                case 6:
                    modbus_chn_name = "Occupancy";
                    decoded[modbus_chn_name] = value;
                    break;
                case 7:
                    modbus_chn_name = "Temperature";
                    value = value / 10;
                    decoded[modbus_chn_name] = value;
                    break;
                case 8:
                    modbus_chn_name = "Humidity";
                    value = value / 10;
                    decoded[modbus_chn_name] = value;
                    break;
                case 9:
                    modbus_chn_name = "Output_Heat";
                    decoded[modbus_chn_name] = value;
                    break;
                case 10:
                    modbus_chn_name = "Output_Cool";
                    decoded[modbus_chn_name] = value;
                    break;
                case 11:
                    modbus_chn_name = "OB";
                    decoded[modbus_chn_name] = value;
                    break;
                case 12:
                    modbus_chn_name = "Compressor";
                    decoded[modbus_chn_name] = value;
                    break;
                case 13:
                    modbus_chn_name = "Aux_Heat";
                    decoded[modbus_chn_name] = value;
                    break;
                case 14:
                    modbus_chn_name = "Heat_Runtime";
                    decoded[modbus_chn_name] = value;
                    break;
                case 15:
                    modbus_chn_name = "Cool_Runtime";
                    decoded[modbus_chn_name] = value;
                    break;
                case 16:
                    modbus_chn_name = "Fan_Runtime";
                    decoded[modbus_chn_name] = value;
                    break;
                case 17:
                    modbus_chn_name = "Cycle_Count_Heat";
                    decoded[modbus_chn_name] = value;
                    break;
                case 18:
                    modbus_chn_name = "Cycle_Count_Cool";
                    decoded[modbus_chn_name] = value;
                    break;
                case 19:
                    modbus_chn_name = "Cycle_Count_Fan";
                    decoded[modbus_chn_name] = value;
                    break;
                case 20:
                    modbus_chn_name = "Cycle_Count_Setback";
                    decoded[modbus_chn_name] = value;
                    break;
                case 21:
                    modbus_chn_name = "Configuration_In_Use";
                    decoded[modbus_chn_name] = value;
                    break;
                case 22:
                    modbus_chn_name = "MIN_COOL_SETPOINT";
                    decoded[modbus_chn_name] = value;
                    break;
                case 23:
                    modbus_chn_name = "MAX_HEAT_SETPOINT";
                    decoded[modbus_chn_name] = value;
                    break;
                case 24:
                    modbus_chn_name = "Cycles_Per_Hour";
                    decoded[modbus_chn_name] = value;
                    break;
                case 25:
                    modbus_chn_name = "Runtime_For_Filter_Notification";
                    decoded[modbus_chn_name] = value;
                    break;
                case 26:
                    modbus_chn_name = "Deadband";
                    value = value / 10;
                    decoded[modbus_chn_name] = value;
                    break;
                 case 27:
                    modbus_chn_name = "Hysteresis";
                    value = value / 10;
                    decoded[modbus_chn_name] = value;
                    break;
                case 28:
                    modbus_chn_name = "Fan_Purge_Timer";
                    decoded[modbus_chn_name] = value;
                    break;
                case 29:
                    modbus_chn_name = "Fan_Stages";
                    decoded[modbus_chn_name] = value;
                    break;
            }
        }
        // MODBUS READ ERROR
        else if (channel_id === 0xff && channel_type === 0x15) {
            var modbus_chn_id = bytes[i] + 1;
            var channel_name = "modbus_channel_" + modbus_chn_id + "_alarm";
            decoded[channel_name] = "read error";
            i += 1;
        } else {
            break;
        }
    }

    return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt8(bytes) {
    return bytes & 0xff;
}

function readInt8(bytes) {
    var ref = readUInt8(bytes);
    return ref > 0x7f ? ref - 0x100 : ref;
}

function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readUInt32LE(bytes) {
    var value = (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
    return (value & 0xffffffff) >>> 0;
}

function readInt32LE(bytes) {
    var ref = readUInt32LE(bytes);
    return ref > 0x7fffffff ? ref - 0x100000000 : ref;
}

function readFloatLE(bytes) {
    // JavaScript bitwise operators yield a 32 bits integer, not a float.
    // Assume LSB (least significant byte first).
    var bits = (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
    var sign = bits >>> 31 === 0 ? 1.0 : -1.0;
    var e = (bits >>> 23) & 0xff;
    var m = e === 0 ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
}

function readProtocolVersion(bytes) {
    var major = (bytes & 0xf0) >> 4;
    var minor = bytes & 0x0f;
    return "v" + major + "." + minor;
}

function readHardwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = (bytes[1] & 0xff) >> 4;
    return "v" + major + "." + minor;
}

function readFirmwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = bytes[1] & 0xff;
    return "v" + major + "." + minor;
}

function readSerialNumber(bytes) {
    var temp = [];
    for (var idx = 0; idx < bytes.length; idx++) {
        temp.push(("0" + (bytes[idx] & 0xff).toString(16)).slice(-2));
    }
    return temp.join("");
}