define(function(require, exports, module){
/**!phpjs;module:math
 */
exports.atan2 = function atan2 (y, x) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: atan2(1, 1);
  // *     returns 1: 0.7853981633974483
  return Math.atan2(y, x);
};// Fork from https://github.com/kvz/phpjs
});