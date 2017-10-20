import fs from 'fs';
import _ from 'lodash';
import { parse, render } from './parse/json';

const genDiff = (prop1, prop2) => {
  const before = parse(fs.readFileSync(prop1));
  const after = parse(fs.readFileSync(prop2));
  const ast = _.union([], Object.keys(after), Object.keys(before))
    .map((el) => {
      const oldVal = before[el];
      const newVal = after[el];
      if (_.isEqual(oldVal, newVal)) {
        return {
          type: 'same',
          el,
          value: newVal,
        };
      } else if (oldVal && !newVal) {
        return {
          type: 'removed',
          el,
          value: oldVal || newVal,
        };
      } else if (!oldVal && newVal) {
        return {
          type: 'added',
          el,
          value: oldVal || newVal,
        };
      } else if (newVal !== oldVal) {
        return {
          type: 'edited',
          el,
          oldValue: oldVal,
          newValue: newVal,
        };
      }
      return false;
    });
  return render(_.sortBy(ast, ['el']));
};

export default genDiff;
