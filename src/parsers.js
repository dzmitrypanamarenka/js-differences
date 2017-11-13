import yaml from 'js-yaml';
import iniParse from 'ini';

export default {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: iniParse.parse,
};
