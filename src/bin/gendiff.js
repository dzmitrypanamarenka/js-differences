#!/usr/bin/env node

const program = require('commander');

program
    .version('0.1.0')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --foo', 'enable some foo')
    .parse(process.argv);