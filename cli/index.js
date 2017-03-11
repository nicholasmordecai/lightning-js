#!/usr/bin/env node

const yargs = require('yargs');

const argv = yargs.usage('$0 command')
    .command(require('./commands/create'))
    .command(require('./commands/dev'))
    .command(require('./commands/publish'))
    .command(require('./commands/build'))
    .command(require('./commands/add'))
    .help('h')
    .alias('h', 'help')
    .argv