'use strict';

// ES6
// Function.prototype.call2 = function(context,...args){
//     context.fn = this;
//     context.fn(...args);
//     delete context.fn
// }
//ES3

Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  // console.log('args :', args.join(','));
  let result = eval(`context.fn(${args.join(',')})`);
  delete context.fn;
  return result;
};

Function.prototype.apply2 = function (context, arr) {
  var context = Object(context || null);
  context.fn = this;
  let args = [];
  if (!arr) {
    result = context.fn();
  } else {
    for (let i = 0; i < arr.length; i++) {
      args.push(`arr[${i}]`);
    }

    let result = eval(`context.fn(${args.toString()})`);
    delete context.fn;
    return result;
  }
};

function bar(age, name) {
  console.log('age :', age);
  console.log('name :', name);
  console.log('[ this.value ] >', this.value);
  return 'res';
}

const foo = {
  value: 123,
};

// bar.call2(foo,233,'nb')
let res = bar.apply2(foo, [223, 'nb']);
console.log('res :', res);
