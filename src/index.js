import * as assert  from 'assert';
import * as metadoi from 'meta-doi';
import * as sudoc   from 'sudoc';
import * as metaELS from 'meta-els';
import * as methal  from 'methal';

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
   * record2ppn return the record.query.result.ppn
   *
   * @param  {Object} record A result of a sudoc function
   * @return {String|Array}  One PPN, or an array of PPNs.
   */
  const record2ppn = record => {
    if (record && record.query && record.query.result &&
        Array.isArray(record.query.result)) {
      return record.query.result.map(item => item.ppn);
    }
    return record.query.result.ppn;
  }

  /**
   * sudoAction return the filter using the func
   *
   * @param  {Function} func     sudoc function
   * @param  {String} actionName name of the action to create
   * @return {Function}          filter to add to the module
   */
  const sudocAction = function (func,actionName) {
    return function (input, arg, next) {
      exec(arg, function(arg) {
        func(input, (err, result) => {
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
      }, actionName);
    }
  }

  /**
   * Return the PPN of an ISSN (or several)
   *
   * @param  {String|Array}   input An array of or one ISSN (string)
   * @param  {Boolean}        arg  not used
   * @param  {Function}       next  next(err,res) to trigger next action in
   *                                stylesheet
   */
   filters.issn2ppn = sudocAction(sudoc.issn2ppn, "issn2ppn");

  /**
   * Return the PPN of an ISBN (or several)
   *
   * @param  {String|Array}   input An array of or one ISBN (string)
   * @param  {Boolean}        arg  not used
   * @param  {Function}       next  next(err,res) to trigger next action in
   *                                stylesheet
   */
  filters.isbn2ppn = sudocAction(sudoc.isbn2ppn, "isbn2ppn");

  /**
   * Return the PPN of an EAN (or several)
   *
   * @param  {String|Array}   input An array of or one EAN (string)
   * @param  {Boolean}        arg  not used
   * @param  {Function}       next  next(err,res) to trigger next action in
   *                                stylesheet
   */
  filters.ean2ppn = sudocAction(sudoc.ean2ppn, "ean2ppn");


  /**
   * resolve the PII into metadata
   *
   * @param  {String|Array} input An array of or a PII (string)
   * @param  {Boolean}      arg   not used (could be used for options)
   * @param  {function}     next  callback(err,res) to trigger next action in
   *                              stylesheet
   */
  filters.resolvePII = function (input, arg, next) {
    exec(arg, function (arg) {
        metaELS.resolve({"pii":input}, next)
    }, "resolvePII");
  }

  /**
   * resolve the HAL identifier into metadata
   *
   * @param  {String|Array} input HAL identifier (string)
   * @param  {Boolean}      arg   not used (could be used for options)
   * @param  {function}     next  callback(err,res) to trigger next action in
   *                              stylesheet
   */
  filters.resolveHAL = function (input, arg, next) {
    exec(arg, function (arg) {
        methal.findOne({"docid":input}, next)
    }, "resolveHAL");
  }

  return filters;
}
