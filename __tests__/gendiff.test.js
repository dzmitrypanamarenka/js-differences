import genDiff from '../src/index';

const jsonDir = '__tests__/fixtures/';

test('parse json', () => {
  expect(genDiff(`${jsonDir}before.json`, `${jsonDir}after.json`)).toBe(`
{
   host: hexlet.io
-  proxy: 123.234.53.22
+  timeout: 20
-  timeout: 50
+  verbose: true
}`);
});
