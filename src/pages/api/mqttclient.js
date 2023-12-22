// // mqttClient.js
// import mqtt from 'mqtt';

// // MQTT broker details
// const host = 'tcp://pro.ambicam.com:1883';
// const dbName = 'vmukti';
// const tbName = 'VCam1_1';
// const topic = 'hr-0002';

// // Connect to MQTT broker
// const client = mqtt.connect(host);

// client.on('connect', () => {
//   console.log('MQTT client connected!');
//   // Assuming msgtype is defined somewhere in your component
//   // and is one of the CommonConfig constants
//   if (msgtype === CommonConfig.MSG_TYPE_GET_CONFIG) {
//     const request = `<uuid name="${deviceid}">`;
//     const requestLen = request.length + 1;
//     const arraybuffer = new Array(requestLen + 16);
//     const mqttmessage = {
//       srcId: gMyId,
//       msgType: CommonConfig.MSG_TYPE_GET_CONFIG,
//       msgLen: requestLen,
//       dstId: 0,
//     };

//     let offset = Vutil.VUtil_encodeMsgHeader(arraybuffer, mqttmessage);
//     for (let i = 0; i < request.length; i++) {
//       arraybuffer[offset++] = request.charCodeAt(i);
//     }
//     arraybuffer[offset++] = 0;
//     const bytes = new Uint8Array(arraybuffer);
//     const payload = new mqtt.Packet(bytes.buffer);

//     client.publish(`${dbName}/${tbName}/tx/${topic}`, payload);
//   }
// });

// client.on('message', (topic, message) => {
//   // Handle incoming messages
//   const payload = new Uint8Array(message);
//   // Process the payload as needed
// });

// client.on('error', (err) => {
//   console.error('MQTT client error:', err);
// });

// client.on('close', () => {
//   console.log('MQTT client disconnected!');
// });

// // ... Add other MQTT-related functions and logic as needed ...

// export default client;
