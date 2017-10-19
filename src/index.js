import fs from 'fs';
import _ from 'lodash';
import parse from './parse/json';
import render from './render/json';

export const path = '/home/hey/Project/src/templates/';

const genDiff = (prop1, prop2) => {
  const before = parse(fs.readFileSync(`${path}${prop1}`));
  const after = parse(fs.readFileSync(`${path}${prop2}`));
  const ast = _.union([], Object.keys(after), Object.keys(before))
    .reduce((acc, el) => {
      const oldVal = before[el];
      const newVal = after[el];
      if (_.isEqual(oldVal, newVal)) {
        acc.push({
          prefix: ' ',
          el,
          value: newVal,
        });
      } else if (oldVal && !newVal) {
        acc.push({
          prefix: '-',
          el,
          value: oldVal || newVal,
        });
      } else if (!oldVal && newVal) {
        acc.push({
          prefix: '+',
          el,
          value: oldVal || newVal,
        });
      } else if (newVal !== oldVal) {
        acc.push({
          prefix: '-',
          el,
          value: oldVal,
        });
        acc.push({
          prefix: '+',
          el,
          value: newVal,
        });
      }
      return acc;
    }, []);
  return render(_.sortBy(ast, ['el']));
};

export default genDiff;
