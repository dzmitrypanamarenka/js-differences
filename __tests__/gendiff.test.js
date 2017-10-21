import genDiff from '../src';

const templatesDir = '__tests__/fixtures/';

test('compare json', () => {
  expect(genDiff(`${templatesDir}before.json`, `${templatesDir}after.json`))
    .toBe(`
{
   host: hexlet.io
-  proxy: 123.234.53.22
+  timeout: 20
-  timeout: 50
+  verbose: true
}`);
});

test('compare yml', () => {
  expect(genDiff(`${templatesDir}before.yml`, `${templatesDir}after.yml`))
    .toBe(`
{
   host: hexlet.io
-  proxy: 123.234.53.22
+  timeout: 20
-  timeout: 50
+  verbose: true
}`);
});
