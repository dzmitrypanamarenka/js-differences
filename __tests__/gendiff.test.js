import genDiff from '../src';

const templatesDir = '__tests__/fixtures/';

test('compare json', () => {
  expect(genDiff(`${templatesDir}/plain/before.json`, `${templatesDir}/plain/after.json`))
    .toBe(
`{
    host: hexlet.io
  - proxy: 123.234.53.22
  + timeout: 20
  - timeout: 50
  + verbose: true
}`);
});

test('compare yml', () => {
  expect(genDiff(`${templatesDir}/plain/before.yml`, `${templatesDir}/plain/after.yml`))
    .toBe(
`{
    host: hexlet.io
  - proxy: 123.234.53.22
  + timeout: 20
  - timeout: 50
  + verbose: true
}`);
});

test('compare ini', () => {
  expect(genDiff(`${templatesDir}/plain/before.ini`, `${templatesDir}/plain/after.ini`))
    .toBe(
`{
    host: hexlet.io
  - proxy: 123.234.53.22
  + timeout: 20
  - timeout: 50
  + verbose: true
}`);
});

test('compare tree json', () => {
  expect(genDiff(`${templatesDir}/tree/before.json`, `${templatesDir}/tree/after.json`))
    .toBe(
`{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`);
});

