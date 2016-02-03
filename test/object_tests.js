var difflet = require('../');
var diff = difflet();
var test = require('tap').test;

test('diffing with empty nested array', function (t) {
  t.plan(1);

  var subjectA = {
    levelOne: {
      levelTwo: {
        array: ['a', 'b', 3]
      }
    }
  };

  var subjectB = {
    levelOne: {
      levelTwo: {
        array: []
      }
    }
  };

  var d = diff.compare(subjectA, subjectB);
  t.equal(d, "{\"levelOne\":{\"levelTwo\":{\"array\":[\n\u001b[31m\u001b[1m\"a\", \"b\", 3\u001b[0m\n]}}}");
});

test('diffing nested array with missing values', function (t) {
  t.plan(1);

  var subjectA = {
    levelOne: {
      levelTwo: {
        array: ['a', 'b', 3]
      }
    }
  };

  var subjectB = {
    levelOne: {
      levelTwo: {
        array: ['a']
      }
    }
  };

  var d = diff.compare(subjectA, subjectB);
  t.equal(d, "{\"levelOne\":{\"levelTwo\":{\"array\":[\"a\"\u001b[31m\u001b[1m, \"b\", 3\u001b[0m]}}}");
});

test('diffing nested array with added values', function (t) {
  t.plan(1);

  var subjectA = {
    levelOne: {
      levelTwo: {
        array: ['a']
      }
    }
  };

  var subjectB = {
    levelOne: {
      levelTwo: {
        array: ['a', 'b', 3]
      }
    }
  };
  
  var d = diff.compare(subjectA, subjectB);
  t.equal(d, "{\"levelOne\":{\"levelTwo\":{\"array\":[\"a\",\u001b[32m\u001b[1m\"b\"\u001b[0m,\u001b[32m\u001b[1m3\u001b[0m]}}}");
});

test('diffing nested array with string instead of array', function (t) {
  t.plan(1);

  var subjectA = {
    levelOne: [
      {
        test: 'sample string'
      }
    ]
  };

  var subjectB = {
    levelOne: [
      {
        test: [{ hello: 'world'}]
      }
    ]
  };

  var d = diff.compare(subjectA, subjectB);
  console.log(d);
  t.equal(d, '{"levelOne":[{"test":\u001b[34m\u001b[1m[{"hello":"world"}]\u001b[0m}]}');
});
