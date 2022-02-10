/**
 * Payload Decoder for Morgen BaseStation
 * 
 * Copyright 2022 Morgen Technology
 *
 * @product Milesight VS121
 */
function Decode(fPort, bytes) {
    var decoded = {};
    var index = 3;
    decoded.devEUI = LoRaObject.devEUI;
    decoded.rssi = LoRaObject.rxInfo[0].rssi;
    decoded.deviceName = LoRaObject.deviceName;

    for (i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];

        // PROTOCOL VESION
        if (channel_id === 0xff && channel_type === 0x01) {
            i += 1;
        }
        // SERIAL NUMBER
        else if (channel_id === 0xff && channel_type === 0x08) {
            i += 6;
        }
        // HARDWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x09) {
            i += 2;
        }
        // FIRMWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x0a) {
            i += 4;
        }
        // PEOPLE COUNTER
        else if (channel_id === 0x04 && channel_type === 0xc9) {
            decoded.peopleCount_1_95 = bytes[i];
            decoded.regionCount_2_95 = bytes[i + 1];
            var region = readUInt16BE(bytes.slice(i + 2, i + 4));
            for (var idx = 0; idx < decoded.regionCount_2_95; idx++) {
                var tmp = "region" + idx + "_" + index++ + "_95";
                decoded[tmp] = (region > idx) & 1;
            }
            i += 4;
        } 
        // PEOPLE IN/OUT
        else if (channel_id ===0x05 && channel_type === 0xcc) {
            decoded.peopleIn_101_95 = readInt16LE(bytes.slice(i, i + 2));
            decoded.peopleOut_102_95 = readInt16LE(bytes.slice(i + 2, i + 4));
            i += 4;
        } 
        //PEOPLE MAX
        else if (channel_id ===0x06 && channel_type === 0xcd) {
             decoded.peopleMax_100_95 = bytes[i];
            i += 1;
        } else {
            break;
        }
    }

    return decoded;
}

// bytes to number
function readUInt16BE(bytes) {
    var value = (bytes[0] << 8) + bytes[1];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

// bytes to version
function readVersion(bytes) {
    var temp = [];
    for (var idx = 0; idx < bytes.length; idx++) {
        temp.push((bytes[idx] & 0xff).toString(10));
    }
    return temp.join(".");
}

// bytes to string
function readString(bytes) {
    var temp = [];
    for (var idx = 0; idx < bytes.length; idx++) {
        temp.push(("0" + (bytes[idx] & 0xff).toString(16)).slice(-2));
    }
    return temp.join("");
}