function new2(func, ...args) {
  const obj = {};
  obj.__proto__ = func.prototype;
  const res = func.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

function Person(name) {
  this.age = 123;
  this.name = name;
}

Person.prototype.sleep = () => {
  console.log('sleep');
};

const person = new2(Person, 'john');
console.log('person :', person);
person.sleep();
