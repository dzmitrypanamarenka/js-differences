import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import render from './compare/render';
import parsers from './compare/parse';

const genDiff = (prop1, prop2) => {
  const extension = path.extname(prop1).substring(1);
  const parse = parsers[extension];
  const before = parse(fs.readFileSync(prop1, 'utf-8'));
  const after = parse(fs.readFileSync(prop2, 'utf-8'));
  const ast = _.union(Object.keys(after), Object.keys(before))
    .map((key) => {
      const oldVal = before[key];
      const newVal = after[key];
      if (_.isEqual(oldVal, newVal)) {
        return {
          type: 'same',
          key,
          newVal,
        };
      } else if (oldVal && !newVal) {
        return {
          type: 'removed',
          key,
          oldVal,
        };
      } else if (!oldVal && newVal) {
        return {
          type: 'added',
          key,
          newVal,
        };
      } else if (newVal !== oldVal) {
        return {
          type: 'edited',
          key,
          oldVal,
          newVal,
        };
      }
      return false;
    });
  return render(_.sortBy(ast, ['key']));
};

export default genDiff;
