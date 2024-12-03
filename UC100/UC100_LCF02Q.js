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
                    value = (sign ? readInt16LE(bytes.slice(i, i + 2)) : readUInt16LE(bytes.slice(i, i + 2)));
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
                    modbus_chn_name = "Temperature";
                    value = value / 10;
                    value = toFahrenheit(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 2:
                    modbus_chn_name = "Fan_Status";
                    decoded[modbus_chn_name] = value;
                    break;
                case 3:
                    var cltsa = value  & 0x01;
                    var etsha = (value >>> 1) & 0x01;
                    var etsla = (value >>> 2) & 0x01;
                    var cosma = (value >>> 3) & 0x01;
                    
                    decoded["CLTS_Alarm"] = cltsa;
                    decoded["ETSH_Alarm"] = etsha;
                    decoded["ETSL_Alarm"] = etsla;
                    decoded["COSM_Alarm"] = cosma;

                    break;
                case 4:
                    modbus_chn_name = "Temperature_Offset";
                    value = value / 10;
                    value = toFahrenheitDelta(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 5:
                    modbus_chn_name = "Password";
                    decoded[modbus_chn_name] = value;
                    break;
                case 6:
                    var onoff = value & 0x01;
                    var mode  = (value >>> 1) & 0x01;
                    var fan   = (value >>> 3) & 0x01;
                    var sp    = (value >>> 4) & 0x01;
                    var all   = (value >>> 2) & 0x01;
                    
                    decoded["Lock_On_Off"] = onoff;
                    decoded["Lock_Mode"] = mode;
                    decoded["Lock_Fan"] = fan;
                    decoded["Lock_Setpoint"] = sp;
                    decoded["Lock_ALL"] = all;
                    break;
                case 7:
                    var sp    = value & 0x01;
                    var temp  = (value >>> 1) & 0x01;
                    var valve = (value >>> 2) & 0x01;
                    var pi    = (value >>> 3) & 0x01;
                    
                    decoded["Show_Setpoint"] = sp;
                    decoded["Show_Temperature"] = temp;
                    decoded["Show_Valve"] = valve;
                    decoded["Show_PI"] = pi;
                    break;
                case 8:
                    modbus_chn_name = "Setpoint_Limit_Low";
                    value = value / 10;
                    value = toFahrenheit(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 9:
                    modbus_chn_name = "Setpoint_Limit_High";
                    value = value / 10;
                    value = toFahrenheit(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 10:
                    modbus_chn_name = "Setpoint_Increment";
                    value = value / 10;
                    value = toFahrenheitDelta(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 11:
                    modbus_chn_name = "ECO_Setpoint_Cooling";
                    value = value / 10;
                    value = toFahrenheit(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 12:
                    modbus_chn_name = "ECO_Setpoint_Heating";
                    value = value / 10;
                    value = toFahrenheit(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 13:
                    modbus_chn_name = "Controller_Mode";
                    decoded[modbus_chn_name] = value;
                    break;
                case 14:
                    modbus_chn_name = "Fan_Off_Delay";
                    decoded[modbus_chn_name] = value;
                    break;
                case 15:
                    modbus_chn_name = "Deadband";
                    value = value / 10;
                    value = toFahrenheitDelta(value);
                    decoded[modbus_chn_name] = value;
                    break;
                case 16:
                    modbus_chn_name = "Relative_Humidity";
                    decoded[modbus_chn_name] = value;
                    break;
                case 17:
                    modbus_chn_name = "Ambient_Pressure_For_CO2";
                    decoded[modbus_chn_name] = value;
                    break;
                case 18:
                    modbus_chn_name = "CO2";
                    decoded[modbus_chn_name] = value;
                    break;
                case 19:
                    modbus_chn_name = "CO2_Offset";
                    decoded[modbus_chn_name] = value;
                    break;
                case 20:
                    modbus_chn_name = "TFL_Threshold_Yellow";
                    decoded[modbus_chn_name] = value;
                    break;
                case 21:
                    modbus_chn_name = "TFL_Threshold_Red";
                    decoded[modbus_chn_name] = value;
                    break;
                case 22:
                    modbus_chn_name = "Active_Fan_Speed";
                    decoded[modbus_chn_name] = value;
                    break;
                case 23:
                    modbus_chn_name = "Setpoint";
                    value = value / 10;
                    value = toFahrenheit(value);
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
// Test for LoRa properties in normalizedPayload
//   try {
//     decoded.lora_rssi =
//       (!!normalizedPayload.gateways &&
//         Array.isArray(normalizedPayload.gateways) &&
//         normalizedPayload.gateways[0].rssi) ||
//       0;
//     decoded.lora_snr =
//       (!!normalizedPayload.gateways &&
//         Array.isArray(normalizedPayload.gateways) &&
//         normalizedPayload.gateways[0].snr) ||
//       0;
//     decoded.lora_datarate = normalizedPayload.data_rate || 'not retrievable';
//   } catch (error) {
//     console.log('Error occurred while decoding LoRa properties: ' + error);
//   }

    return decoded;
}

function toFahrenheit(celsius) {
    return (celsius * 1.8) + 32;
}

function toFahrenheitDelta(celsius) {
    return celsius * (9/5);
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