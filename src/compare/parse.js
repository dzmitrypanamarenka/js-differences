import yaml from 'js-yaml';
import iniParse from 'ini';

export default {
  yml: yaml.safeLoad,
  json: file => JSON.parse(file),
  ini: file => iniParse.parse(file),
};
