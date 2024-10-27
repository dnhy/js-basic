function Person() {
  this.name = 123;
  return {
    age: 123,
  };
}

Person.prototype.say = function () {};

const person = new Person();
console.log('person :', person.say);

function new2(func, ...args) {
  const obj = {};
  obj.__proto__ = func.prototype;
  const res = func.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

function new3(func, ...args) {
  const obj = {};
  // obj.__proto__ == func.prototype;
  Object.setPrototypeOf(obj, func.prototype);
  const res = func.apply(this, args);
  return typeof res === 'object' ? res : obj;
}