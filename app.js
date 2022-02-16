const fs = require('fs');
const path = require('path');

// Завдання на практику
//
// 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу,
//     дані які ви отримали запишіть їх в інший файл
//     , в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так

// const pathToSomeFile = path.join(__dirname, 'someFile.txt');
//
// fs.writeFile(pathToSomeFile, 'Some data', (err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.readFile(pathToSomeFile, 'utf-8', ((err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         console.log(data);
//
//         fs.writeFile(pathToSomeFile, `${data}`, (err => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//
//         }));
//     }));
// }));

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//     старий файл видаліть після того як все завершиться.
//     Також вийде callback hell

// const pathToSecondFile = path.join(__dirname, 'secondFile');
// const pathToNewDirectoryThirdFile = path.join(__dirname, 'newDirectory', 'thirdFile');
// const pathToNewDirectory = path.join(__dirname, 'newDirectory');
//
// fs.writeFile(pathToSecondFile, 'Hello NodeJS', (err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.readFile(pathToSecondFile, 'utf-8', ((err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         console.log(data);
//
//         fs.mkdir(pathToNewDirectory, (err => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             fs.writeFile(pathToNewDirectoryThirdFile, '', (err => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 fs.copyFile(pathToSecondFile, pathToNewDirectoryThirdFile, (err => {
//                     if (err) {
//                         console.log(err);
//                         throw err;
//                     }
//                     fs.unlink(pathToSecondFile, (err => {
//                         if (err) {
//                             console.log(err);
//                             throw err;
//                         }
//                     }));
//                 }));
//             }));
//         }));
//     }));
// }));

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам
// потрібно їх очистити, але не видаляти, якщо дані - це папки,
//     вам потрібно їх перейменувати і додати до назви префікс _new

// const pathToFatherDirectoryFirstChildDirectory = path.join(__dirname, 'fatherDirectory', 'firstChildDirectory');
// const pathToFatherDirectorySecondChildDirectory = path.join(__dirname, 'fatherDirectory', 'secondChildDirectory');
//
// fs.mkdir(path.join(__dirname, 'fatherDirectory'), (err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     fs.mkdir(pathToFatherDirectoryFirstChildDirectory, (err => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.mkdir(pathToFatherDirectorySecondChildDirectory, (err => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             fs.writeFile(path.join(__dirname, 'fatherDirectory', 'firstChildFile.txt'), 'Hello Word', (err => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 fs.writeFile(path.join(__dirname, 'fatherDirectory', 'secondChildFile.txt'), 'Buy Word', (err => {
//                     if (err) {
//                         console.log(err);
//                         throw err;
//                     }
//                 }));
//             }));
//         }));
//     }));
// }));

function checkDirectory(directory) {
    fs.readdir(path.join(__dirname, directory), ((err, files) => {
        if (err) {
            console.log(err);
            throw err;
        }

        console.log(files);

        files.forEach(file => {
            fs.stat(path.join(directory, file), ((err1, stats) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                if (stats.isFile()) {
                    console.log(file, 'file');
                    fs.truncate(path.join(__dirname, directory, file), (err => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    }));

                } else if (stats.isDirectory()) {
                    console.log(file, 'directory');
                    fs.rename(path.join(__dirname, directory, file),
                        path.join(__dirname, directory, `_new${file}`), (err => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        }));
                }
            }));
        });
    }));
}

checkDirectory('fatherDirectory');


