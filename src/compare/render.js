import _ from 'lodash';

const props = [
  {
    check: el => el.type === 'edited',
    getStr: el => `+  ${el.key}: ${el.newValue}\n-  ${el.key}: ${el.oldValue}\n`,
  },
  {
    check: el => el.type === 'same',
    getStr: el => `   ${el.key}: ${el.value}\n`,
  },
  {
    check: el => el.type === 'removed',
    getStr: el => `-  ${el.key}: ${el.value}\n`,
  },
  {
    check: el => el.type === 'added',
    getStr: el => `+  ${el.key}: ${el.value}\n`,
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

export default render;
