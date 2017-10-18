#!/usr/bin/env node

import program from 'commander';
import genDiff from '../';

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --foo', 'enable some foo');

program
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig);
    console.log(result);
  });

program.parse(process.argv);
