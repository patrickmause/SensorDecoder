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
                case 8:
                    decoded.push({
                        "field": "VOLT_AMPERES" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 11:
                    decoded.push({
                        "field": "VOLT_AMPERES_REACTIVE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 14:
                    decoded.push({
                        "field": "DEGREES_PHASE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 15:
                    decoded.push({
                        "field": "POWER_FACTOR" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 16:
                    decoded.push({
                        "field": "JOULES" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
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
                case 47:
                    decoded.push({
                        "field": "WATTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 53:
                    decoded.push({
                        "field": "PASCALS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 124:
                    decoded.push({
                        "field": "MILLIVOLTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 125:
                    decoded.push({
                        "field": "KILOJOULES_PER_KG" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 134:
                    decoded.push({
                        "field": "MILLIBARS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 145:
                    decoded.push({
                        "field": "MILLIOHMS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 166:
                    decoded.push({
                        "field": "METERS_PER_SECOND_PER_SECOND" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 167:
                    decoded.push({
                        "field": "AMPERES_PER_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 168:
                    decoded.push({
                        "field": "AMPERES_PER_SQUARE_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 169:
                    decoded.push({
                        "field": "AMPERE_SQUARE_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 176:
                    decoded.push({
                        "field": "VOLTS_PER_DEGREE_KELVIN" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 177:
                    decoded.push({
                        "field": "VOLTS_PER_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 178:
                    decoded.push({
                        "field": "WEBERS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 190:
                    decoded.push({
                        "field": "MICROSIEMENS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 202:
                    decoded.push({
                        "field": "MILLISIEMENS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 203:
                    decoded.push({
                        "field": "WATT_HOURS_REACTIVE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 239:
                    decoded.push({
                        "field": "WATT_AMPERE_HOURS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 242:
                    decoded.push({
                        "field": "VOLT_AMPERE_HOURS_REACTIVE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 245:
                    decoded.push({
                        "field": "VOLT_SQUARE_HOURS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 246:
                    decoded.push({
                        "field": "AMPERE_SQUARE_HOURS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 4:
                    decoded.push({
                        "field": "OHMS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
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
                case 9:
                    decoded.push({
                        "field": "KILOVOLT_AMPERES" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 12:
                    decoded.push({
                        "field": "KILOVOLT_AMPERES_REACTIVE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 17:
                    decoded.push({
                        "field": "KILOJOULES" + channel_id,
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
                case 55:
                    decoded.push({
                        "field": "BARS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 56:
                    decoded.push({
                        "field": "POUNDS_FORCE_PER_SQI" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 62:
                    decoded.push({
                        "field": "DEGREES_CELSIUS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
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
                case 65:
                    decoded.push({
                        "field": "DEGREE_DAYS_CELSIUS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 66:
                    decoded.push({
                        "field": "DEGREE_DAYS_FAHRENHEIT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 90:
                    decoded.push({
                        "field": "DEGREES_ANGULAR" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 91:
                    decoded.push({
                        "field": "DEGREES_CELSIUS_PER_HOUR" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 92:
                    decoded.push({
                        "field": "DEGREES_CELSIUS_PER_MINUTE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 93:
                    decoded.push({
                        "field": "DEGREES_FAHRENHEIT_PER_HOUR" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 94:
                    decoded.push({
                        "field": "DEGREES_FAHRENHEIT_PER_MINUTE" + channel_id,
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
                case 102:
                    decoded.push({
                        "field": "PSI_PER_DEGREE_FAHRENHEIT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 104:
                    decoded.push({
                        "field": "RPM" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 120:
                    decoded.push({
                        "field": "DELTA_DEGREES_FAHRENHEIT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 121:
                    decoded.push({
                        "field": "DELTA_DEGREES_CELSIUS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 122:
                    decoded.push({
                        "field": "KILOHMS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 133:
                    decoded.push({
                        "field": "HECTOPASCALS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 137:
                    decoded.push({
                        "field": "KWH_PER_SQUARE_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 138:
                    decoded.push({
                        "field": "KWH_PER_SQUARE_FOOT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 141:
                    decoded.push({
                        "field": "WATTS_PER_SQM_DEGREE_KELVIN" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 153:
                    decoded.push({
                        "field": "NEWTON" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 170:
                    decoded.push({
                        "field": "FAHRADS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 171:
                    decoded.push({
                        "field": "HENRYS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 172:
                    decoded.push({
                        "field": "OHM_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 173:
                    decoded.push({
                        "field": "SIEMENS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 174:
                    decoded.push({
                        "field": "SIEMENS_PER_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 175:
                    decoded.push({
                        "field": "TESLAS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 181:
                    decoded.push({
                        "field": "DEGREES_KELVIN_PER_HOUR" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 182:
                    decoded.push({
                        "field": "DEGREES_KELVIN_PER_MINUTE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 183:
                    decoded.push({
                        "field": "JOULE_SECONDS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 187:
                    decoded.push({
                        "field": "NEWTON_SECONDS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 188:
                    decoded.push({
                        "field": "NEWTONS_PER_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 189:
                    decoded.push({
                        "field": "WATTS_PER_M_PER_DEGREE_KELVIN" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 199:
                    decoded.push({
                        "field": "DECIBELS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 200:
                    decoded.push({
                        "field": "DECIBELS_MILLIVOLT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 201:
                    decoded.push({
                        "field": "DECIBELS_VOLT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 222:
                    decoded.push({
                        "field": "BECQUERELS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 223:
                    decoded.push({
                        "field": "KILOBECQUERELS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 224:
                    decoded.push({
                        "field": "MEGABECQUERELS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 225:
                    decoded.push({
                        "field": "GRAY" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 226:
                    decoded.push({
                        "field": "MILLIGRAY" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 227:
                    decoded.push({
                        "field": "MICROGRAY" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 228:
                    decoded.push({
                        "field": "SIEVERTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 229:
                    decoded.push({
                        "field": "MILLISIEVERTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 230:
                    decoded.push({
                        "field": "MICROSIEVERTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 231:
                    decoded.push({
                        "field": "MICROSIEVERTS_PER_HOUR" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 232:
                    decoded.push({
                        "field": "DECIBELS_A" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 233:
                    decoded.push({
                        "field": "NEPHELOMETRIC_TURBIDITY_UNIT" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 237:
                    decoded.push({
                        "field": "OHM_METER_SQUARED_PER_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 238:
                    decoded.push({
                        "field": "AMPERE_SECONDS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 240:
                    decoded.push({
                        "field": "KILOVOLT_AMPERE_HOURS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 243:
                    decoded.push({
                        "field": "KILOVOLT_AMPERE_HOURS_REACTIVE" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 250:
                    decoded.push({
                        "field": "WATT_HOURS_PER_CUBIC_METER" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 7:
                    decoded.push({
                        "field": "MEGAVOLTS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 10:
                    decoded.push({
                        "field": "MEGAVOLT_AMPERES" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 13:
                    decoded.push({
                        "field": "MEGAVOLT_AMPERES_REACTIVE" + channel_id,
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
                case 54:
                    decoded.push({
                        "field": "KILOPASCALS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 123:
                    decoded.push({
                        "field": "MEGAOHMS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 126:
                    decoded.push({
                        "field": "MEGAJOULES" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 241:
                    decoded.push({
                        "field": "MEGAVOLT_AMPERE_HOURS" + channel_id,
                        "value": u16_to_s16(payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 244:
                    decoded.push({
                        "field": "MEGAVOLT_AMPERE_HOURS_REACTIVE" + channel_id,
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
                        "field": "MILLIWATS" + channel_id,
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
                case 105:
                    decoded.push({
                        "field": "CURRENCY1" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 106:
                    decoded.push({
                        "field": "CURRENCY2" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 107:
                    decoded.push({
                        "field": "CURRENCY3" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 108:
                    decoded.push({
                        "field": "CURRENCY4" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 109:
                    decoded.push({
                        "field": "CURRENCY5" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 110:
                    decoded.push({
                        "field": "CURRENCY6" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 111:
                    decoded.push({
                        "field": "CURRENCY7" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 112:
                    decoded.push({
                        "field": "CURRENCY8" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 113:
                    decoded.push({
                        "field": "CURRENCY9" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 114:
                    decoded.push({
                        "field": "CURRENCY10" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 204:
                    decoded.push({
                        "field": "KWH_REACTIVE" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 10
                    });
                    i += 4;
                    break;
                case 146:
                    decoded.push({
                        "field": "MEGAWATT_HOURS" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 1000
                    });
                    i += 4;
                    break;
                case 205:
                    decoded.push({
                        "field": "MEGAWATT_HOURS_REACTIVE" + channel_id,
                        "value": u32_to_s32(payload[i] << 24 | payload[i+1] << 16 | payload[i+2] << 8 | payload[i+3]) / 100
                    });
                    i += 4;
                    break;
                case 20:
                    decoded.push({
                        "field": "BTUS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 21:
                    decoded.push({
                        "field": "THERMS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 23:
                    decoded.push({
                        "field": "JOULES_PER_KG_DRY_AIR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 25:
                    decoded.push({
                        "field": "CYCLES_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 26:
                    decoded.push({
                        "field": "CYCLES_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 27:
                    decoded.push({
                        "field": "HERTZ" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 28:
                    decoded.push({
                        "field": "G_OF_WATER_PER_KG_DRY_AIR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 29:
                    decoded.push({
                        "field": "PERCENT_RH" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 30:
                    decoded.push({
                        "field": "MILLIMETERS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 51:
                    decoded.push({
                        "field": "HORSEPOWER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 57:
                    decoded.push({
                        "field": "CM_OF_WATER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 59:
                    decoded.push({
                        "field": "MM_OF_MERCURY" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 60:
                    decoded.push({
                        "field": "CM_OF_MERCURY" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 118:
                    decoded.push({
                        "field": "CM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 127:
                    decoded.push({
                        "field": "JOULES_PER_DEGREE_KELVIN" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 128:
                    decoded.push({
                        "field": "JOULES_PER_KG_DEGREE_KELVIN" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 131:
                    decoded.push({
                        "field": "PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 157:
                    decoded.push({
                        "field": "KILO_BTUS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 194:
                    decoded.push({
                        "field": "MICROMETERS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 196:
                    decoded.push({
                        "field": "MILLIGRAMS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 206:
                    decoded.push({
                        "field": "MM_OF_WATER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 247:
                    decoded.push({
                        "field": "JOULES_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 76:
                    decoded.push({
                        "field": "FEET_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 158:
                    decoded.push({
                        "field": "HUNDREDTHS_SECONDS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 159:
                    decoded.push({
                        "field": "MILLISECONDS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 161:
                    decoded.push({
                        "field": "MM_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 162:
                    decoded.push({
                        "field": "MM_PER_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 197:
                    decoded.push({
                        "field": "MILLILITERS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1])
                    });
                    i += 2;
                    break;
                case 22:
                    decoded.push({
                        "field": "TON_HOURS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 41:
                    decoded.push({
                        "field": "TONS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 42:
                    decoded.push({
                        "field": "KG_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 43:
                    decoded.push({
                        "field": "KG_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 44:
                    decoded.push({
                        "field": "KG_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 130:
                    decoded.push({
                        "field": "MEGAHERTZ" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 148:
                    decoded.push({
                        "field": "MEGA_BTUS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 150:
                    decoded.push({
                        "field": "MEGAJOULES_PER_KG_DRY_AIR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 152:
                    decoded.push({
                        "field": "MEGA_JOULES_PER_DEGREE_KELVIN" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 156:
                    decoded.push({
                        "field": "TONS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
                    });
                    i += 2;
                    break;
                case 193:
                    decoded.push({
                        "field": "KM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 100
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
                case 0:
                    decoded.push({
                        "field": "SQUARE_METERS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 24:
                    decoded.push({
                        "field": "BTUS_PER_POUND_DRY_AIR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 31:
                    decoded.push({
                        "field": "METERS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 32:
                    decoded.push({
                        "field": "INCHES" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 33:
                    decoded.push({
                        "field": "FEET" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 34:
                    decoded.push({
                        "field": "WATTS_PER_SQUARE_FOOT" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 35:
                    decoded.push({
                        "field": "WATTS_PER_SQUARE_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
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
                case 39:
                    decoded.push({
                        "field": "KG" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 40:
                    decoded.push({
                        "field": "POUNDS_MASS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 45:
                    decoded.push({
                        "field": "POUNDS_MASS_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 46:
                    decoded.push({
                        "field": "POUNDS_MASS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 50:
                    decoded.push({
                        "field": "BTUS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 52:
                    decoded.push({
                        "field": "TONS_REFRIGERATION" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 58:
                    decoded.push({
                        "field": "INCHES_OF_WATER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 61:
                    decoded.push({
                        "field": "INCHES_OF_MERCURY" + channel_id,
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
                case 74:
                    decoded.push({
                        "field": "METERS_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 75:
                    decoded.push({
                        "field": "KM_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 77:
                    decoded.push({
                        "field": "FEET_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 78:
                    decoded.push({
                        "field": "MILES_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 79:
                    decoded.push({
                        "field": "CUBIC_FEET" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 80:
                    decoded.push({
                        "field": "CUBIC_METERS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 81:
                    decoded.push({
                        "field": "IMPERIAL_GALLONS" + channel_id,
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
                case 84:
                    decoded.push({
                        "field": "CUBIC_FEET_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 85:
                    decoded.push({
                        "field": "CUBIC_METERS_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 86:
                    decoded.push({
                        "field": "IMPERIAL_GALLONS_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 87:
                    decoded.push({
                        "field": "LITERS_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
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
                case 99:
                    decoded.push({
                        "field": "PERCENT_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 100:
                    decoded.push({
                        "field": "PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 101:
                    decoded.push({
                        "field": "PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 103:
                    decoded.push({
                        "field": "RADIANS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 115:
                    decoded.push({
                        "field": "SQUARE_INCHES" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 116:
                    decoded.push({
                        "field": "SQUARE_CM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 117:
                    decoded.push({
                        "field": "BTUS_PER_POUND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 119:
                    decoded.push({
                        "field": "POUNDS_MASS_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 129:
                    decoded.push({
                        "field": "KILOHERTZ" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 135:
                    decoded.push({
                        "field": "CUBIC_METERS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 136:
                    decoded.push({
                        "field": "LITERS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 139:
                    decoded.push({
                        "field": "MEGAJOULES_PER_SQM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 140:
                    decoded.push({
                        "field": "MEGAJOULES_PER_SQUARE_FOOT" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 142:
                    decoded.push({
                        "field": "CUBIC_FEET_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 143:
                    decoded.push({
                        "field": "PERCENT_OBSCURATION_PER_FOOT" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 144:
                    decoded.push({
                        "field": "PERCENT_OBSCURATION_PER_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 147:
                    decoded.push({
                        "field": "KILO_BTUS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 149:
                    decoded.push({
                        "field": "KILOJOULES_PER_KG_DRY_AIR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 151:
                    decoded.push({
                        "field": "KILOJOULES_PER_DEGREE_KELVIN" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 154:
                    decoded.push({
                        "field": "GRAMS_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 155:
                    decoded.push({
                        "field": "GRAMS_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 160:
                    decoded.push({
                        "field": "NEWTON_METERS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 163:
                    decoded.push({
                        "field": "METERS_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 164:
                    decoded.push({
                        "field": "METERS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 165:
                    decoded.push({
                        "field": "CUBIC_METERS_PER_MINUTE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 179:
                    decoded.push({
                        "field": "CANDELAS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 1:
                    decoded.push({
                        "field": "SQUARE_FEET" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 180:
                    decoded.push({
                        "field": "CANDELAS_PER_SQM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 184:
                    decoded.push({
                        "field": "RADIANS_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 185:
                    decoded.push({
                        "field": "SQM_PER_NEWTON" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 186:
                    decoded.push({
                        "field": "KG_PER_CUBIC_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 191:
                    decoded.push({
                        "field": "CUBIC_FEET_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 192:
                    decoded.push({
                        "field": "US_GALLONS_PER_HOUR" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 195:
                    decoded.push({
                        "field": "GRAMS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 198:
                    decoded.push({
                        "field": "MILLILITERS_PER_SECOND" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 207:
                    decoded.push({
                        "field": "PER_MILE" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 208:
                    decoded.push({
                        "field": "GRAMS_PER_GRAM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 209:
                    decoded.push({
                        "field": "KG_PER_KG" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 210:
                    decoded.push({
                        "field": "GRAMS_PER_KG" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 211:
                    decoded.push({
                        "field": "MILLIGRAMS_PER_GRAM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 212:
                    decoded.push({
                        "field": "MILLIGRAMS" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 213:
                    decoded.push({
                        "field": "GRAMS_PER_MILLILITER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 214:
                    decoded.push({
                        "field": "GRAMS_PER_LITER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 215:
                    decoded.push({
                        "field": "MILLIGRAMS_PER_LITER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 216:
                    decoded.push({
                        "field": "MICROGRAMS_PER_LITER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 217:
                    decoded.push({
                        "field": "GRAMS_PER_CUBIC_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 218:
                    decoded.push({
                        "field": "MILLIGRAMS_PER_CUBIC_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 219:
                    decoded.push({
                        "field": "MICROGRAMS_PER_CUBIC_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
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
                case 221:
                    decoded.push({
                        "field": "GRAMS_PER_CUBIC_CM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 234:
                    decoded.push({
                        "field": "PH" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 235:
                    decoded.push({
                        "field": "GRAMS_PER_SQM" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 236:
                    decoded.push({
                        "field": "MINUTES_PER_DEGREE_KELVIN" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 248:
                    decoded.push({
                        "field": "CUBIC_FEET_PER_DAY" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 249:
                    decoded.push({
                        "field": "CUBIC_METERS_PER_DAY" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 251:
                    decoded.push({
                        "field": "JOULES_PER_CUBIC_METER" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 252:
                    decoded.push({
                        "field": "MOLE_PERCENT" + channel_id,
                        "value": (payload[i] << 8 | payload[i+1]) / 10
                    });
                    i += 2;
                    break;
                case 253:
                    decoded.push({
                        "field": "PASCAL_SECONDS" + channel_id,
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