import _ from 'lodash';

export default (ast) => {
  const str = _.reduce(
    ast,
    (acc, el) => `${acc}${el.prefix}  ${el.el}: ${el.value}\n`, '',
  );
  return `\n{\n${str}}`;
};
