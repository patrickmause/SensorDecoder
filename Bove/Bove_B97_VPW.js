function Decoder(payload, port) {
    var decoded = [];
    

    var SERIALWM    = 0x83;
    var SERIALHM    = 0xA6;
    var TOTAL       = 0x81;
    var PRESSURE    = 0x88;
    
    var controlcode = payload[0];
    

    switch(controlcode) 
    {
        case SERIALWM:
        case SERIALHM:
                
            var length      = payload[1];
            var dataidone   = payload[2];
            var dataidtwo   = payload[3];
            var count       = payload[4];

            var serial = parseInt(payload[5].toString(16),10) 
                    + (parseInt(payload[6].toString(16),10)*100)
                    + (parseInt(payload[7].toString(16),10)*10000)
                    + (parseInt(payload[8].toString(16),10)*1000000)
                    + (parseInt(payload[9].toString(16),10)*100000000) 
                    + (parseInt(payload[10].toString(16),10)*10000000000) 
                    + (parseInt(payload[11].toString(16),10)*1000000000000);

            if(dataidone === 0x81 && dataidtwo === 0x0A)
            {
                decoded.push({
                    "field": "WM_SERIAL",
                    "value": serial
                });
            }
            else if(dataidone === 0x01 && dataidtwo === 0x00)
            {
                decoded.push({
                    "field": "HM_SERIAL",
                    "value": serial
                });
            }

            break;
        case TOTAL:

            var length      = payload[1];
            var dataidone   = payload[2];
            var dataidtwo   = payload[3];
            var count       = payload[4];

            if(length === 0x0A && dataidone === 0x90 && dataidtwo === 0x1F)
            {
                var multiplier = 1;

                switch(payload[5])
                {
                    case 0x2B:
                        multiplier = 0.001;
                        break;
                    case 0x2C:
                        multiplier = 0.01;
                        break;
                    case 0x2D:
                        multiplier = 0.1;
                        break;
                    case 0x2E:
                        multiplier = 1;
                        break;
                    case 0x35:
                        multiplier = 0.0001;
                        break;
                }

                var reading = (parseInt(payload[6].toString(16),10) 
                            + (parseInt(payload[7].toString(16),10)*100)
                            + (parseInt(payload[8].toString(16),10)*10000)
                            + (parseInt(payload[9].toString(16),10)*1000000)) * multiplier;
                
                var bst1 = [];
                var bst2 = [];

                for (var i = 0; i < 8; i++)
                    bst1[i] = (payload[10] >> i) & 1;

                for (var i = 0; i < 8; i++)
                    bst2[i] = (payload[11] >> i) & 1;

                decoded.push({
                    "field": "WM_CURRENT",
                    "value": reading
                });

              if(bst1[0] == 0 && bst1[1] == 0)
                {
                    decoded.push({
                    "field": "WM_VALVE_STATE",
                    "value": "open"
                    });    
                }
                else if(bst1[0] == 1 && bst1[1] == 0)
                {
                    decoded.push({
                    "field": "WM_VALVE_STATE",
                    "value": "close"
                    });    
                }
                else if(bst1[0] == 0 && bst1[1] == 1)
                {
                    decoded.push({
                    "field": "WM_VALVE_STATE",
                    "value": "error"
                    });    
                }
                else if(bst1[0] == 1 && bst1[1] == 1)
                {
                    decoded.push({
                    "field": "WM_VALVE_STATE",
                    "value": 3
                    });    
                }

                decoded.push({
                    "field": "WM_BATTERY_ALARM",
                    "value": bst1[3] === 1 ? "true":"false"
                });
                
                decoded.push({
                    "field": "WM_LOW_BATTERY_ALARM",
                    "value": bst2[0] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "WM_EMPTY_PIPE_ALARM",
                    "value": bst2[1] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "WM_REVERSE_FLOW_ALARM",
                    "value": bst2[2] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "WM_OVER_RANGE_ALARM",
                    "value": bst2[3] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "WM_TEMPERATURE_ALARM",
                    "value": bst2[4] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "WM_EE_ERROR",
                    "value": bst2[5] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "WM_LEAK_ALARM",
                    "value": bst2[6] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "WM_BURST_ALARM",
                    "value": bst2[7] === 1 ? "true":"false"
                });

                var batStatus = payload[12];

                if(batStatus===0)
                    batStatus=2000;
                else if(batStatus===255)
                    batStatus=3000;
                else
                    batStatus=((batStatus-1)/253)*100;

                decoded.push({
                    "field": "WM_BATTERY_STATUS",
                    "value": batStatus
                });
            }
            else if(length === 0x16 && dataidone === 0x90 && dataidtwo === 0x1F)
            {
                var cold    = (parseInt(payload[5].toString(16),10) 
                            + (parseInt(payload[6].toString(16),10)*100)
                            + (parseInt(payload[7].toString(16),10)*10000)
                            + (parseInt(payload[8].toString(16),10)*1000000)) * 0.01;

                var heat    = (parseInt(payload[9].toString(16),10) 
                            + (parseInt(payload[10].toString(16),10)*100)
                            + (parseInt(payload[11].toString(16),10)*10000)
                            + (parseInt(payload[12].toString(16),10)*1000000)) * 0.01;

                var volume  = (parseInt(payload[13].toString(16),10) 
                            + (parseInt(payload[14].toString(16),10)*100)
                            + (parseInt(payload[15].toString(16),10)*10000)
                            + (parseInt(payload[16].toString(16),10)*1000000)) * 0.01;

                var tin     = (parseInt(payload[17].toString(16),10) 
                            + (parseInt(payload[18].toString(16),10)*100)) * 0.01;

                var tout    = (parseInt(payload[19].toString(16),10) 
                            + (parseInt(payload[20].toString(16),10)*100)) * 0.01;
                            
                var bst2 = [];

                for (var i = 0; i < 8; i++)
                    bst2[i] = (payload[22] >> i) & 1;

                decoded.push({
                    "field": "HM_COLD_KWH",
                    "value": cold
                });

                decoded.push({
                    "field": "HM_HEAT_KWH",
                    "value": heat
                });

                decoded.push({
                    "field": "HM_VOLUME",
                    "value": volume
                });

                decoded.push({
                    "field": "HM_T_IN",
                    "value": tin
                });

                decoded.push({
                    "field": "HM_T_OUT",
                    "value": tout
                });

                decoded.push({
                    "field": "HM_BATTERY_ALERT",
                    "value": bst2[0] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "HM_T_IN_SENSOR_ERROR",
                    "value": bst2[1] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "HM_T_OUT_SENSOR_ERROR",
                    "value": bst2[2] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "HM_EMPTY_PIPE_ALARM",
                    "value": bst2[3] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "HM_EE_ERROR",
                    "value": bst2[5] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "HM_FREEZING_ALARM",
                    "value": bst2[6] === 1 ? "true":"false"
                });

                decoded.push({
                    "field": "HM_TEMPERATURE_ALARM",
                    "value": bst2[7] === 1 ? "true":"false"
                });

            }
            break;
        case PRESSURE:

            var metertype   = payload[1];

            var serial  = parseInt(payload[2].toString(16),10) 
                        + (parseInt(payload[3].toString(16),10)*100)
                        + (parseInt(payload[4].toString(16),10)*10000)
                        + (parseInt(payload[5].toString(16),10)*1000000)
                        + (parseInt(payload[6].toString(16),10)*100000000) 
                        + (parseInt(payload[7].toString(16),10)*10000000000) 
                        + (parseInt(payload[8].toString(16),10)*1000000000000);            

            var length      = payload[9];
            var dataidone   = payload[10];
            var dataidtwo   = payload[11];
            var count       = payload[12];

            var multiplier1 = 1;
            var multiplier2 = 1;
            var multiplier3 = 1;
            var multiplier4 = 1;

            switch(payload[13])
            {
                case 0x2B:
                    multiplier1 = 0.001;
                    break;
                case 0x2C:
                    multiplier1 = 0.01;
                    break;
                case 0x2D:
                    multiplier1 = 0.1;
                    break;
                case 0x2E:
                    multiplier1 = 1;
                    break;
                case 0x35:
                    multiplier1 = 0.0001;
                    break;
            }

            switch(payload[18])
            {
                case 0x2B:
                    multiplier2 = 0.001;
                    break;
                case 0x2C:
                    multiplier2 = 0.01;
                    break;
                case 0x2D:
                    multiplier2 = 0.1;
                    break;
                case 0x2E:
                    multiplier2 = 1;
                    break;
                case 0x35:
                    multiplier2 = 0.0001;
                    break;
            }

            switch(payload[23])
            {
                case 0x2B:
                    multiplier3 = 0.001;
                    break;
                case 0x2C:
                    multiplier3 = 0.01;
                    break;
                case 0x2D:
                    multiplier3 = 0.1;
                    break;
                case 0x2E:
                    multiplier3 = 1;
                    break;
                case 0x35:
                    multiplier3 = 0.0001;
                    break;
            }

            switch(payload[28])
            {
                case 0x2B:
                    multiplier4 = 0.001;
                    break;
                case 0x2C:
                    multiplier4 = 0.01;
                    break;
                case 0x2D:
                    multiplier4 = 0.1;
                    break;
                case 0x2E:
                    multiplier4 = 1;
                    break;
                case 0x35:
                    multiplier4 = 0.0001;
                    break;
            }


            var reading1 = (parseInt(payload[14].toString(16),10) 
                        + (parseInt(payload[15].toString(16),10)*100)
                        + (parseInt(payload[16].toString(16),10)*10000)
                        + (parseInt(payload[17].toString(16),10)*1000000)) * multiplier1;

            var reading2 = (parseInt(payload[19].toString(16),10) 
                        + (parseInt(payload[20].toString(16),10)*100)
                        + (parseInt(payload[21].toString(16),10)*10000)
                        + (parseInt(payload[22].toString(16),10)*1000000)) * multiplier2;

            var reading3 = (parseInt(payload[24].toString(16),10) 
                        + (parseInt(payload[25].toString(16),10)*100)
                        + (parseInt(payload[26].toString(16),10)*10000)
                        + (parseInt(payload[27].toString(16),10)*1000000)) * multiplier3;

            var reading4 = (parseInt(payload[29].toString(16),10) 
                        + (parseInt(payload[30].toString(16),10)*100)
                        + (parseInt(payload[31].toString(16),10)*10000)
                        + (parseInt(payload[32].toString(16),10)*1000000)) * multiplier4;

            var temp    = (parseInt(payload[33].toString(16),10) 
                        + (parseInt(payload[34].toString(16),10)*100)
                        + (parseInt(payload[35].toString(16),10)*10000)) * 0.01;

            var pres    = (parseInt(payload[36].toString(16),10) 
                        + (parseInt(payload[37].toString(16),10)*100)) * 0.001;
                        
                
            var bst1 = [];
            var bst2 = [];

            for (var i = 0; i < 8; i++)
                bst1[i] = (payload[38] >> i) & 1;

            for (var i = 0; i < 8; i++)
                bst2[i] = (payload[39] >> i) & 1;

            var batStatus = payload[42];

            if(batStatus===0)
                batStatus=2000;
            else if(batStatus===255)
                batStatus=3000;
            else
                batStatus=((batStatus-1)/253)*100;


            decoded.push({
                "field": "PS_FORWARD_CONSUMPTION",
                "value": reading1
            });

            decoded.push({
                "field": "PS_FREEZING_CONSUMPTION",
                "value": reading2
            });

            decoded.push({
                "field": "PS_REVERSE_CONSUMPTION",
                "value": reading3
            });

            decoded.push({
                "field": "PS_FLOW_RATE",
                "value": reading4
            });

            decoded.push({
                "field": "PS_TEMPERATURE",
                "value": temp
            });

            decoded.push({
                "field": "PS_PRESSURE",
                "value": pres
            });

            decoded.push({
                "field": "PS_BATTERY1_ALARM",
                "value": bst1[3] === 1 ? "true":"false"
            });

            decoded.push({
                "field": "PS_TRANSDUCER_CH2_ERROR",
                "value": bst1[5] === 1 ? "true":"false"
            });

            decoded.push({
                "field": "PS_BATTERY2_ALARM",
                "value": bst2[0] === 1 ? "true":"false"
            });

            decoded.push({
                "field": "PS_TRANSDUCER_CH1_ERROR",
                "value": bst2[1] === 1 ? "true":"false"
            });

            decoded.push({
                "field": "PS_REVERSE_FLOW_ALARM",
                "value": bst2[2] === 1 ? "true":"false"
            });

            decoded.push({
                "field": "PS_OVER_RANGE_ALARM",
                "value": bst2[3] === 1 ? "true":"false"
            });

            decoded.push({
                "field": "PS_TEMPERATURE_ALARM",
                "value": bst2[4] === 1 ? "true":"false"
            });

             decoded.push({
                "field": "PS_EE_ERROR",
                "value": bst2[5] === 1 ? "true":"false"
            });

            decoded.push({
                "field": "PS_BATTERY",
                "value": batStatus
            });
        break;
    }

    return decoded;
}