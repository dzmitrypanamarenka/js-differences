import yaml from 'js-yaml';
import iniParse from 'ini';

const yml = file => yaml.safeLoad(file);
const json = file => JSON.parse(file);
const ini = file => iniParse.parse(file);

const parsers = {
  yml,
  json,
  ini,
};

export default parsers;
