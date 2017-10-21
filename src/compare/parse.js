import yaml from 'js-yaml';

const yml = file => yaml.safeLoad(file);
const json = file => JSON.parse(file);

const parsers = {
  yml,
  json,
};

export default parsers;
