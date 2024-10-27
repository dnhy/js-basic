function pipe(...funcs) {
  return function (param) {
    return funcs.reduce((val, func) => {
      return func(val);
    }, param);
  };
}

function compose(...funcs) {
  return function (param) {
    return funcs.reduceRight((val, func) => {
      return func(val);
    }, param);
  };
}
