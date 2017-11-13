import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import render from './renderers';
import parsers from './parsers';

const props = [
  {
    type: 'complex',
    check: (v1, v2) => _.isPlainObject(v1) && _.isPlainObject(v2),
    getValue: (v1, v2, func) => func(v1, v2),
  },
  {
    type: 'same',
    check: (v1, v2) => _.isEqual(v1, v2),
    getValue: (v1, v2) => _.identity(v2),
  },
  {
    type: 'removed',
    check: (v1, v2) => v1 && !v2,
    getValue: v1 => _.identity(v1),
  },
  {
    type: 'added',
    check: (v1, v2) => !v1 && v2,
    getValue: (v1, v2) => _.identity(v2),
  },
  {
    type: 'edited',
    check: (v1, v2) => !_.isEqual(v1, v2),
    getValue: (v1, v2) => ({ oldVal: v1, newVal: v2 }),
  },
];

const getProps = (item1, item2) => _.find(props, ({ check }) => check(item1, item2));

const genDiff = (prop1, prop2) => {
  const extension = path.extname(prop1).substring(1);
  const parse = parsers[extension];
  const before = parse(fs.readFileSync(prop1, 'utf-8'));
  const after = parse(fs.readFileSync(prop2, 'utf-8'));
  const getAst = (p1 = {}, p2 = {}) => _.union(Object.keys(p1), Object.keys(p2))
    .map((key) => {
      const firstVal = p1[key];
      const secVal = p2[key];
      const { type, getValue } = getProps(firstVal, secVal);
      return { type, key, value: getValue(firstVal, secVal, getAst) };
    });
  const result = getAst(before, after);
  return render(_.sortBy(result, ['key']));
};

export default genDiff;
