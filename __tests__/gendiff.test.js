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
        setting7: {
        key: value
      + value: key
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

test('compare tree yml', () => {
  expect(genDiff(`${templatesDir}/tree/before.yml`, `${templatesDir}/tree/after.yml`))
    .toBe(
      `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
        setting7: {
        key: value
      + value: key
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

test('compare tree ini', () => {
  expect(genDiff(`${templatesDir}/tree/before.ini`, `${templatesDir}/tree/after.ini`))
    .toBe(
      `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            key: value
        }
        setting7: {
        key: value
      + value: key
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

test('compare plain json', () => {
  expect(genDiff(`${templatesDir}/tree/before.json`, `${templatesDir}/tree/after.json`, 'plain'))
    .toBe(
`
Property common.setting2 was removed
Property common.setting6 was removed
Property common.setting7.value was added with value: key
Property common.setting4 was added with value: blah blah
Property common.setting5 was added with complex value
Property group1.baz was updated. From bars to bas
Property group2 was removed
Property group3 was added with complex value
`);
});

test('compare plain yml', () => {
  expect(genDiff(`${templatesDir}/tree/before.yml`, `${templatesDir}/tree/after.yml`, 'plain'))
    .toBe(
`
Property common.setting2 was removed
Property common.setting6 was removed
Property common.setting7.value was added with value: key
Property common.setting4 was added with value: blah blah
Property common.setting5 was added with complex value
Property group1.baz was updated. From bars to bas
Property group2 was removed
Property group3 was added with complex value
`);
});

test('compare plain ini', () => {
  expect(genDiff(`${templatesDir}/tree/before.ini`, `${templatesDir}/tree/after.ini`, 'plain'))
    .toBe(
`
Property common.setting2 was removed
Property common.setting6 was removed
Property common.setting7.value was added with value: key
Property common.setting4 was added with value: blah blah
Property common.setting5 was added with complex value
Property group1.baz was updated. From bars to bas
Property group2 was removed
Property group3 was added with complex value
`);
});

test('compare json json', () => {
  expect(genDiff(`${templatesDir}/tree/before.json`, `${templatesDir}/tree/after.json`, 'json'))
    .toBe(
      `{
 "common": {
  "type": "complex",
  "value": {
   "setting1": {
    "type": "same",
    "value": "Value 1"
   },
   "setting2": {
    "type": "removed",
    "value": "200"
   },
   "setting3": {
    "type": "same",
    "value": true
   },
   "setting6": {
    "type": "removed",
    "value": {
     "key": "value"
    }
   },
   "setting7": {
    "type": "complex",
    "value": {
     "key": {
      "type": "same",
      "value": "value"
     },
     "value": {
      "type": "added",
      "value": "key"
     }
    }
   },
   "setting4": {
    "type": "added",
    "value": "blah blah"
   },
   "setting5": {
    "type": "added",
    "value": {
     "key5": "value5"
    }
   }
  }
 },
 "group1": {
  "type": "complex",
  "value": {
   "baz": {
    "type": "edited",
    "value": {
     "oldVal": "bas",
     "newVal": "bars"
    }
   },
   "foo": {
    "type": "same",
    "value": "bar"
   }
  }
 },
 "group2": {
  "type": "removed",
  "value": {
   "abc": "12345"
  }
 },
 "group3": {
  "type": "added",
  "value": {
   "fee": "100500"
  }
 }
}`);
});

test('compare json yml', () => {
  expect(genDiff(`${templatesDir}/tree/before.yml`, `${templatesDir}/tree/after.yml`, 'json'))
    .toBe(
      `{
 "common": {
  "type": "complex",
  "value": {
   "setting1": {
    "type": "same",
    "value": "Value 1"
   },
   "setting2": {
    "type": "removed",
    "value": 200
   },
   "setting3": {
    "type": "same",
    "value": true
   },
   "setting6": {
    "type": "removed",
    "value": {
     "key": "value"
    }
   },
   "setting7": {
    "type": "complex",
    "value": {
     "key": {
      "type": "same",
      "value": "value"
     },
     "value": {
      "type": "added",
      "value": "key"
     }
    }
   },
   "setting4": {
    "type": "added",
    "value": "blah blah"
   },
   "setting5": {
    "type": "added",
    "value": {
     "key5": "value5"
    }
   }
  }
 },
 "group1": {
  "type": "complex",
  "value": {
   "baz": {
    "type": "edited",
    "value": {
     "oldVal": "bas",
     "newVal": "bars"
    }
   },
   "foo": {
    "type": "same",
    "value": "bar"
   }
  }
 },
 "group2": {
  "type": "removed",
  "value": {
   "abc": 12345
  }
 },
 "group3": {
  "type": "added",
  "value": {
   "fee": 100500
  }
 }
}`);
});

test('compare json ini', () => {
  expect(genDiff(`${templatesDir}/tree/before.ini`, `${templatesDir}/tree/after.ini`, 'json'))
    .toBe(
      `{
 "common": {
  "type": "complex",
  "value": {
   "setting1": {
    "type": "same",
    "value": "Value 1"
   },
   "setting2": {
    "type": "removed",
    "value": "200"
   },
   "setting3": {
    "type": "same",
    "value": true
   },
   "setting6": {
    "type": "removed",
    "value": {
     "key": "value"
    }
   },
   "setting7": {
    "type": "complex",
    "value": {
     "key": {
      "type": "same",
      "value": "value"
     },
     "value": {
      "type": "added",
      "value": "key"
     }
    }
   },
   "setting4": {
    "type": "added",
    "value": "blah blah"
   },
   "setting5": {
    "type": "added",
    "value": {
     "key5": "value5"
    }
   }
  }
 },
 "group1": {
  "type": "complex",
  "value": {
   "baz": {
    "type": "edited",
    "value": {
     "oldVal": "bas",
     "newVal": "bars"
    }
   },
   "foo": {
    "type": "same",
    "value": "bar"
   }
  }
 },
 "group2": {
  "type": "removed",
  "value": {
   "abc": "12345"
  }
 },
 "group3": {
  "type": "added",
  "value": {
   "fee": "100500"
  }
 }
}`);
});

