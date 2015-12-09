/*jshint node:true, laxcomma:true */
/* global describe, it */
'use strict';
var assert = require('assert')
  , JBJ = require('jbj')
  , examples = require('./examples.json');

// JBJ.use(require('../lib/'));


describe('ist', function () {
  for (var example in examples) {
    it(example, function () {
      var input      = examples[example].input;
      var stylesheet = examples[example].stylesheet;
      var expected   = examples[example].expected;
      var output     = JBJ.renderSync(stylesheet, input);
      assert.deepEqual(expected, output);
    });
  }
});
