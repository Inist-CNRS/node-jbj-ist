import * as assert  from 'assert';
import * as metadoi from 'meta-doi';

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

  return filters;
}
