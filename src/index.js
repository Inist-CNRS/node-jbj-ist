import * as assert  from 'assert';
import * as metadoi from 'meta-doi';
import * as sudoc   from 'sudoc';

module.exports = function ist(exec, execmap) {
  const filters = {};

  /**
   * resolve the DOI(s) into metadata
   *
   * @param  {String|Array} input An array of or a DOI (string)
   * @param  {Boolean}      arg   not used (could be used for options)
   * @param  {function}     next  callback(err,res) to trigger next action in
   *                              stylesheet
   */
  filters.resolveDOI = function (input, arg, next) {
    exec(arg, function (arg) {
        metadoi.resolve(input, {}, next)
    }, "resolveDOI");
  }

  /**
   * Return the PPN of an ISSN (or several)
   *
   * @param  {String|Array}   input An array of or one ISSN (string)
   * @param  {Boolean}        arg  not used
   * @param  {Function}       next  next(err,res) to trigger next action in
   *                                stylesheet
   */
  filters.issn2ppn = function (input, arg, next) {
    exec(arg, function(arg) {
      sudoc.issn2ppn(input, (err, result) => {
        const record2ppn = record => record.query.result.ppn;
        if (err) { next(err); }
        if (Array.isArray(result)) {
          const results = result.map(record2ppn);
          next(err, results);
        }
        else {
          const res = record2ppn(result);
          next(err, res);
        }
      });
    }, "issn2ppn");
  }

  return filters;
}
