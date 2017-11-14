import _ from 'lodash';
import fs from 'fs';

const tab = 2;
const gap = 4;
const prefix = {
  complex: ' '.repeat(tab),
  edited: {
    new: '+ ',
    old: '- ',
  },
  same: ' '.repeat(tab),
  removed: '- ',
  added: '+ ',
};

const props = [
  {
    check: el => el.type === 'complex',
    getTreeStr: (type, key, value, tabs, f) => `${tabs}${prefix[type]}${key}: {\n${f(value, gap + tab)}\n${tabs}${tabs}}`,
    getPlainStr: (key, value, f) => `${f(value, key)}`,
    getJsonStr: (acc, type, key, value, f) => ({ ...acc, [key]: { type, value: f(value) } }),
  },
  {
    check: el => el.type === 'edited',
    getTreeStr: (type, key, value, tabs) => `${tabs}${prefix[type].new}${key}: ${value.newVal}\n${tabs}${prefix[type].old}${key}: ${value.oldVal}`,
    getPlainStr: (key, value) => `Property ${key} was updated. From ${value.newVal} to ${value.oldVal}`,
    getJsonStr: (acc, type, key, value) => ({ ...acc, [key]: { type, value } }),
  },
  {
    check: el => el.type === 'same',
    getTreeStr: (type, key, value, tabs) => `${tabs}${prefix[type]}${key}: ${value}`,
    getPlainStr: () => '',
    getJsonStr: (acc, type, key, value) => ({ ...acc, [key]: { type, value } }),
  },
  {
    check: el => el.type === 'removed',
    getTreeStr: (type, key, value, tabs) => `${tabs}${prefix[type]}${key}: ${value}`,
    getPlainStr: key => `Property ${key} was removed`,
    getJsonStr: (acc, type, key, value) => ({ ...acc, [key]: { type, value } }),
  },
  {
    check: el => el.type === 'added',
    getTreeStr: (type, key, value, tabs) => `${tabs}${prefix[type]}${key}: ${value}`,
    getPlainStr: (key, value) => `Property ${key} was added with ${value === 'complex value' ? '' : 'value: '}${value}`,
    getJsonStr: (acc, type, key, value) => ({ ...acc, [key]: { type, value } }),
  },
];

const getProps = item => _.find(props, ({ check }) => check(item));
const checkSpecific = (v, t) => t !== 'complex' && t !== 'edited' && v instanceof Object && !(v instanceof Array);
const getSpecific = (val, tabs) => {
  const s = Object.keys(val).map(e => `${' '.repeat(tabs)}  ${e}: ${val[e]}`).join('\n');
  return `{\n${s}\n${' '.repeat(tabs - 2)}}`;
};

const treeRenderer = (ast) => {
  const iter = (item, numb = 2) => {
    const tabs = ' '.repeat(numb);
    return item.map((el) => {
      const value = checkSpecific(el.value, el.type) ? getSpecific(el.value, numb + gap) : el.value;
      const { getTreeStr } = getProps(el);
      return getTreeStr(el.type, el.key, value, tabs, iter);
    }).join('\n');
  };
  return `{\n${iter(ast, tab)}\n}`;
};

const plainRenderer = (ast) => {
  const iter = (item, parent = '') => item.map((el) => {
    const currentKey = parent === '' ? el.key : `${parent}.${el.key}`;
    const value = checkSpecific(el.value, el.type) ? 'complex value' : el.value;
    const { getPlainStr } = getProps(el);
    return getPlainStr(currentKey, value, iter);
  }).filter(el => el).join('\n');
  return `\n${iter(ast)}\n`;
};

const jsonRenderer = (ast) => {
  const iter = item => item.reduce((acc, el) => {
    const { getJsonStr } = getProps(el);
    return getJsonStr(acc, el.type, el.key, el.value, iter);
  }, {});
  const result = JSON.stringify(iter(ast), '', 1);
  const outputFile = '/home/hey/123/project-lvl2-s129/output.json';

  fs.writeFileSync(outputFile, result);
  return result;
};

export default {
  tree: treeRenderer,
  plain: plainRenderer,
  json: jsonRenderer,
};
