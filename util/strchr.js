define(function(require, exports, module){
/**!phpjs;module:strings
 */
exports.strchr = function strchr (haystack, needle, bool) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philip Peterson
  // -    depends on: strstr
  // *     example 1: strchr('Kevin van Zonneveld', 'van');
  // *     returns 1: 'van Zonneveld'
  // *     example 2: strchr('Kevin van Zonneveld', 'van', true);
  // *     returns 2: 'Kevin '
  return module.strstr(haystack, needle, bool);
};// Fork from https://github.com/kvz/phpjs
});