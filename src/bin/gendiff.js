#!/usr/bin/env node

import program from 'commander';
import genDiff from '../';

program
  .version('2.0.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'choose output format');

program
  .action((firstConfig, secondConfig) => {
    const { format } = program;
    const result = genDiff(`${firstConfig}`, `${secondConfig}`, format);
    console.log(result);
  });

program.parse(process.argv);
