const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command: 'create',
    describe: 'создать заметку',
    builder: {
        id: {
            type: 'string',
            demandOption: true,
            describe: 'Номер заметки'
        },
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Название заметки'
        },
        text: {
            type: 'string',
            demandOption: true,
            describe: 'Текс заметки'
        }
    },
    handler({
        id,
        title,
        text
    }) {
        notes.addNote(id, title, text);
    }
});

yargs.command({
    command: 'list',
    describe: 'показать заметки',
    handler() {
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'показать контент заметки',
    builder: {
        id: {
            type: 'string',
            demandOption: true,
            describe: 'Номер заметки'
        }
    },
    handler({
        id
    }) {
        notes.readNote(id);
    }
});

yargs.command({
    command: 'remove',
    describe: 'удаляет заметку',
    builder: {
        id: {
            type: 'string',
            demandOption: true,
            describe: 'Номер заметки'
        }
    },
    handler({
        id
    }) {
        notes.removeNote(id);
    }
});

yargs.parse();