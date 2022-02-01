/**
 * Payload Decoder for Morgen BaseStation
 * 
 * Copyright 2022 Morgen Technology
 * 
 * @product EM300-SLD / EM300-ZLD
 */
function Decode(fPort, bytes) {
    var decoded = {};
    decoded.devEUI = LoRaObject.devEUI;
    decoded.rssi = LoRaObject.rxInfo[0].rssi;
    decoded.deviceName = LoRaObject.deviceName;

    for (var i = 0; i < bytes.length;) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];
        // BATTERY
        if (channel_id === 0x01 && channel_type === 0x75) {
            decoded.battery_1_98 = bytes[i];
            i += 1;
        }
        // TEMPERATURE
        else if (channel_id === 0x03 && channel_type === 0x67) {
            // ℃
            decoded.temperature_2_62 = readInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;

            // ℉
            // decoded.temperature = readInt16LE(bytes.slice(i, i + 2)) / 10 * 1.8 + 32;
            // i +=2;
        }
        // HUMIDITY
        else if (channel_id === 0x04 && channel_type === 0x68) {
            decoded.humidity_3_29 = bytes[i] / 2;
            i += 1;
        }
        // WATER LEAK
        else if (channel_id === 0x05 && channel_type === 0x00) {
            decoded.leak_4_999 = (bytes[i] === 0) ? 'false' : 'true';
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
function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}