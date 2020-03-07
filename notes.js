const chalk = require("chalk");
const fs = require('fs');
const path = require('path');

const notePath = path.join(__dirname, 'notes.json');

const getNotes = (callback) => {
    fs.readFile(notePath, 'utf-8', (err, content) => {
        if (err) {
            throw new Error(err);
        }

        try {
            callback(JSON.parse(content));
        } catch (e) {
            callback([]);
        }
    });
};

const saveNotes = (content) => {
    fs.writeFile(notePath, JSON.stringify(content), err => {
        if (err) {
            throw new Error(err);
        }
    });
};

const addNote = (id, title, text) => {
    getNotes((notes) => {
        const dublicateNote = notes.find(note => note.title === title);

        if (dublicateNote) {
            console.log(chalk.red.inverse('Заметка уже существует'));
        } else {
            notes.push({
                id,
                title,
                text
            });
            saveNotes(notes);
            console.log(chalk.green.inverse('Заметка добавлена'));
        }
    });
};

const listNotes = () => {
    getNotes(notes => {
        if (notes.length) {
            console.log(chalk.green.inverse('Ваши заметки:'));

            notes.forEach((note) => {
                console.log(`${note.id}: ${note.title}`);
            });
        } else {
            console.log(chalk.red.inverse('Заметок пока нет. Добавьте первую.'));
        }
    });
};

const readNote = (id) => {
    getNotes((notes) => {
        const note = notes.find(el => el.id === id);

        if (!note) {
            console.log(chalk.red.inverse('Заметки не существует'));
        } else {
            console.log(chalk.green.inverse(`${note.title}: ${note.text}`));
        }
    });
};

const removeNote = (id) => {
    getNotes((notes) => {
        const note = notes.find(el => el.id === id);

        if (!note) {
            console.log(chalk.red.inverse('Заметки не существует'));
        } else {
            notes.splice(notes.indexOf(note), 1);
            saveNotes(notes);
            console.log(notes);
        }
    });
};

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote
};