function Decoder(request) {
    
    var payload = JSON.parse(request.body)

    var timestamp = Math.floor(Date.now() / 1000);

    var result = Object.keys(payload).map(function(key) {
      if (key !== "device") {
        return {
          device: payload.device,
          field: key.toUpperCase(),
          value: payload[key],
          timestamp: timestamp // timestamps are optional but can be useful for data tracking and auditing
        };
      }
    });

    return result

}