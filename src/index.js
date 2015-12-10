import * as assert  from 'assert';
import * as metadoi from 'meta-doi';

module.exports = function ist(exec, execmap) {
  const filters = {};

  /**
   * resolve the DOI(s) into metadata
   *
   * @param  {String|Array} input An array of or a DOI (string)
   * @param  {Boolean}      arg   not used (could be used for options)
   * @return {Object|Array}       an object or an array of objects
   */
  filters.resolveDOI = function (input, arg) {
    return exec(arg, function (arg) {
      return metadoi.resolve(input, {}, (err, metadata) => {
        if (err) { return err; }
        return metadata;
      })
    }, "resolveDOI");
  }

  return filters;
}
