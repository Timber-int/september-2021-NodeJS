const path = require('path');
const fs = require('fs');

const onlineUsers = [
    {name: 'Andriy', age: 22, city: 'Lviv'},
    {name: 'Dima', age: 52, city: 'Kyiv'},
    {name: 'Olena', age: 18, city: 'Lviv'},
];

const inPersonUsers = [
    {name: 'Marta', age: 26, city: 'Lviv'},
    {name: 'Bogdan', age: 32, city: 'Lviv'},
    {name: 'Kira', age: 20, city: 'Ternopil'},
];

fs.mkdir(path.join(__dirname, 'main'), (err => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.mkdir(path.join(__dirname, 'main', 'online'), (err => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err => {
            if (err) {
                console.log(err);
                throw err;
            }

            onlineUsers.forEach(user => {
                fs.writeFile(path.join(__dirname, 'main', 'online', `${user.name}`),
                    `${JSON.stringify(user, null, `\t`)}`, (err => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    }));
            });

            inPersonUsers.forEach(user => {
                fs.writeFile(path.join(__dirname, 'main', 'inPerson', `${user.name}`),
                    `${JSON.stringify(user, null, `\t`)}`, (err => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    }));
            });

        }));
    }));
}));


function changeUsersFilesDir(prevFilesDir, nextFilesDir) {
    fs.readdir(path.join(__dirname, 'main', `${prevFilesDir}`), (err, files) => {
        if (err) {
            console.log(err);
            throw err;
        }
        files.forEach(file => {
            fs.rename(path.join(__dirname, 'main', `${prevFilesDir}`, `${file}`),
                path.join(__dirname, 'main', `${nextFilesDir}`, `${file}`), (err => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                }));
        });
    });
}

changeUsersFilesDir('inPerson', 'online');
changeUsersFilesDir('online', 'inPerson');