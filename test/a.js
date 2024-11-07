// export var a = {
//   foo: 1243,
// };

// export var b = {
//   bar: true,
// };

module.exports = {
  a: {
    foo: "12121",
    test() {
      console.log("[ 1211212 ] >", 1211212);
    },
  },
};

exports.b = 121;

var obj = { foo: 123 };

function bar(a) {
  // a.foo = 456;
  a = { test: "wqwqqw" };
  console.log("a :", a);
}

bar(obj);

console.log("obj :", obj);
