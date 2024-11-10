function MyInstanceof(obj, className) {
  if (className !== Object(className)) {
    throw 'TypeError: Right-hand side of " instanceof " is not an object';
  }
  if (typeof className !== "function") {
    throw 'TypeError: Right-hand side of "instanceof" is not callable';
  }
  if (typeof obj !== "object" || obj === null) return false;

  let curr = Object.getPrototypeOf(obj);

  while (curr) {
    if (curr === className.prototype) {
      return true;
    }
    curr = Object.getPrototypeOf(curr);
  }

  return false;
}
// console.log(null instanceof 123);
console.log("MyInstanceof([1, 2, 3], Array) :", MyInstanceof(null, {}));

function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

console.log(a instanceof B); // true

console.log(MyInstanceof(a, B));
