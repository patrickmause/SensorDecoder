function Decoder(payload, port) {
    var decoded = [];
    var TEMPERATURE = 0x00;
    var HUMIDITY    = 0x01;
    
    if(payload.length>1)
    {
        var packet_type = payload[0] >> 4;
        var voltage     = payload[0] & 0x0F;

        if(packet_type==0)
        {
            var hours   = (payload[1] & 0x0F) << 4 | payload[2] >> 4;
            var minutes = (payload[2] & 0x0F) | payload[3] >> 5;
            var seconds = payload[3] & 0x3F;
            var mode    = payload[4];
            var hw_major= payload[5];
            var hw_minor= payload[6];
            var sw_major= payload[7];
            var sw_minor= payload[8];
            var hash    = payload[9];
            
            decoded.push({
                "field": "HOURS",
                "value": hours
            });
            
            decoded.push({
                "field": "MINUTES",
                "value": minutes
            });
            
            decoded.push({
                "field": "SECONDS",
                "value": seconds
            });
            
            decoded.push({
                "field": "MODE",
                "value": mode
            });
            
            decoded.push({
                "field": "HW_VERSION",
                "value": hw_major + "." + hw_minor
            });
            
            decoded.push({
                "field": "SW_VERSION",
                "value": sw_major + "." + sw_minor
            });
            
            decoded.push({
                "field": "HASH",
                "value": hash
            });
        }
        else if(packet_type==2)
        {
            var sequence    = payload[1];
            
            decoded.push({
                "field": "TEMPERATURE",
                "value": u16_to_s16(payload[2] << 8 | payload[3]) / 10
            });
    
            decoded.push({
                "field": "HUMIDITY",
                "value": (payload[4] << 8 | payload[5]) / 10
            });
        }
        
        return decoded;
    }
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