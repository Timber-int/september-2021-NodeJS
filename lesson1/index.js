const path = require('path');
const os = require('os');
const fs = require('fs');

// // Path creating
// const joinedPath = path.join(__dirname,'test1','subtext1','micro.txt');
// console.log(joinedPath);

// // Path normalization
// const normalizedPath = path.join('/////text1///\\\text2////text.txt');
// console.log(normalizedPath);

// // Resolver path + current directory
// const resolvedPath = path.resolve('/////text1///\\\text2////text.txt');
// console.log(resolvedPath);

// OS system
// console.log(os.cpus());
// console.log(os.arch());

// FS write file async method
// fs.writeFile(path.join(__dirname, 'files', 'test.txt'), 'Hello dear user', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// FS read file async method with uts-8 or method toString()
// fs.readFile(path.join(__dirname, 'files', 'test.txt'), 'utf-8',(err,data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data);
// });

// Flag w all new data changing
// for (let i = 0; i <= 100; i++) {
//     fs.appendFile(path.join(__dirname, 'files', 'test.txt'), '\nNew Data', { flag: 'w' }, (err => {
//         if (err) {
//             console.log(err);
//         }
//     }));
// }

// Delete all file data

// fs.truncate(path.join(__dirname, 'files', 'test.txt'), (err => {
//     if (err) {
//         console.log(err);
//     }
// }));
//
// // Delete file
// fs.unlink(path.join(__dirname, 'files', 'test.txt'), (err => {
//     if (err) {
//         console.log(err);
//     }
// }));

// // Creating directory
// fs.mkdir(path.join(__dirname, 'public'), (err => {
//     if (err) {
//         console.log(err);
//     }
// }));

// // Recursive creating directory
// fs.mkdir(path.join(__dirname, 'public2', 'users', 'posts', 'comments', 'albums'), { recursive: true }, (err => {
//     if (err) {
//         console.log(err);
//     }
// }));


// Delete directory
// fs.rmdir(path.join(__dirname, 'files'), (err => {
//     if (err) {
//         console.log(err);
//     }
// }));

// // Read directory
// fs.readdir(path.join(__dirname,'public'),((err, files) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(files);
// }))

// Rename directory and for file changing

fs.rename(path.join(__dirname,'public','newUsers','posts','comments','albums','photo.txt'),path.join(__dirname,'dataFiles','files','photo.txt'),(err => {
    if (err){
        console.log(err);
    }
}))

