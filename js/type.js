var typeArray =
  'Boolean Number String Function Array Date RegExp Object Error Null Undefined';
var class2type = {};

typeArray.split(' ').map((item) => {
  class2type[`[object ${item}]`] = item.toLowerCase();
});

function type(obj) {
  if (obj == null) {
    return obj + '';
  }

  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj;
}

function isFunction(obj) {
  return type(obj) === 'function';
}

module.exports = { type, isFunction };
