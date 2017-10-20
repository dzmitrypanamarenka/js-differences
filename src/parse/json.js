import _ from 'lodash';

const parse = json => JSON.parse(json);
const props = [
  {
    check: el => el.type === 'edited',
    getStr: el => `+  ${el.el}: ${el.newValue}\n-  ${el.el}: ${el.oldValue}\n`,
  },
  {
    check: el => el.type === 'same',
    getStr: el => `   ${el.el}: ${el.value}\n`,
  },
  {
    check: el => el.type === 'removed',
    getStr: el => `-  ${el.el}: ${el.value}\n`,
  },
  {
    check: el => el.type === 'added',
    getStr: el => `+  ${el.el}: ${el.value}\n`,
  },
];

const getProps = item => _.find(props, ({ check }) => check(item));

const render = (ast) => {
  const str = _.map(
    ast,
    (el) => {
      const { getStr } = getProps(el);
      return getStr(el);
    },
  ).join('');
  return `\n{\n${str}}`;
};

export { parse, render };
