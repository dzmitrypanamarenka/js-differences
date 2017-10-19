import genDiff from '../';

test('parse json', () => {
  expect(genDiff('before.json', 'after.json')).toBe(`
{
   host: hexlet.io
-  proxy: 123.234.53.22
-  timeout: 50
+  timeout: 20
+  verbose: true
}`);
});
