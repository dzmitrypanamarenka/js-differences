import _ from 'lodash';

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
    getStr: (type, key, value, tabs, f) => `${tabs}${prefix[type]}${key}: {\n${f(value, gap + tab)}\n${tabs}${tabs}}`,
  },
  {
    check: el => el.type === 'edited',
    getStr: (type, key, value, tabs) => `${tabs}${prefix[type].new}${key}: ${value.newVal}\n${tabs}${prefix[type].old}${key}: ${value.oldVal}`,
  },
  {
    check: el => el.type === 'same',
    getStr: (type, key, value, tabs) => `${tabs}${prefix[type]}${key}: ${value}`,
  },
  {
    check: el => el.type === 'removed',
    getStr: (type, key, value, tabs) => `${tabs}${prefix[type]}${key}: ${value}`,
  },
  {
    check: el => el.type === 'added',
    getStr: (type, key, value, tabs) => `${tabs}${prefix[type]}${key}: ${value}`,
  },
];

const getProps = item => _.find(props, ({ check }) => check(item));
const checkSpecific = (v, t) => t !== 'complex' && t !== 'edited' && v instanceof Object && !(v instanceof Array);
const getSpecific = (val, tabs) => {
  const s = Object.keys(val).map(e => `${' '.repeat(tabs)}  ${e}: ${val[e]}`).join('\n');
  return `{\n${s}\n${' '.repeat(tabs - 2)}}`;
};
const render = (ast) => {
  const iter = (item, numb = 2) => {
    const tabs = ' '.repeat(numb);
    return item.map((el) => {
      const value = checkSpecific(el.value, el.type) ? getSpecific(el.value, numb + gap) : el.value;
      const { getStr } = getProps(el);
      return getStr(el.type, el.key, value, tabs, iter);
    }).join('\n');
  };
  return `{\n${iter(ast, tab)}\n}`;
};

export default render;
