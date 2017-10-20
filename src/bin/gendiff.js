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
    const path = '/home/hey/Project/__tests__/fixtures/';
    const result = genDiff(`${path}${firstConfig}`, `${path}${secondConfig}`);
    console.log(result);
  });

program.parse(process.argv);
