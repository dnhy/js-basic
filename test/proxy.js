//1.数组读取负数的索引
function createArr(...elements) {
  let target = [];
  target.push(...elements);

  return new Proxy(target, {
    get: function (target, key) {
      if (key < 0) {
        key = +key + target.length;
      }

      return Reflect.get(target, key);
    },
  });
}

const arr = createArr(1, 2, 12, 1211, 23131);
console.log(arr[-3]);

//2.将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作
var double = (n) => n * 2;
var pow = (n) => n * n;
var reverseInt = (n) => n.toString().split('').reverse().join('') | 0;

console.log( pipe(3).double.pow.reverseInt.get);// 63

function pipe(value) {
  const funcs = [];
  let globalThis;
  const oProxy = new Proxy(
    {},
    {
      get: function (target, key) {
        if (key === 'get') {
          return funcs.reduce((pre, currFunc) => {
            return currFunc(pre);
          }, value);
        }
        funcs.push(eval(key));
        return oProxy;
      },
    },
  );

  return oProxy;
}
