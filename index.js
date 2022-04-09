// // EventEmitter
//
// const EventEmitter  = require('express');
//
// const ev = new EventEmitter();
//
// ev.on('Click', (name) => {
//     console.log('Hello '+ name);
// });
//
// ev.emit('Click','Jon');
//
// ev.once('Test', () => {
//     console.log('Test working');
// });
//
// console.log(ev.eventNames());

//// Streams
// const fs = require('fs');
// const path = require('path');
//
// const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
// readStream.on('data', (chunk) => {
//     console.log(chunk.toString);
// });
//
// const writeStream = fs.createWriteStream(path.join(__dirname, 'fileTest.txt'));
// writeStream.write('New some data', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });
//
// writeStream.end();
