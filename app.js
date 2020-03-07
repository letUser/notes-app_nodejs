const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command: 'create',
    describe: 'создать заметку',
    builder: {
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
    handler({title, text}) {
        notes.addNote(title, text);
    }
});

yargs.command({
    command: 'read',
    describe: 'показать контект заметки',
    handler() {
        console.log('read');
    }
});

yargs.command({
    command: 'remove',
    describe: 'удаляет заметку',
    handler() {
        console.log('remove');
    }
});

yargs.parse();