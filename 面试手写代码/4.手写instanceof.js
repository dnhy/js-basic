function myInstanceof(left, right) {
  if ((typeof left != 'function' && typeof left != 'object') || left == null)
    return false;
  var prototype = Object.getPrototypeOf(left);
  // 原型链循环往上找，找到对象的构造函数、继承的父类、Object（由于原型是对象，由Object构造）、null(Object的原型对象的原型节点指向的是null)
  while (true) {
    console.log('prototype :', prototype);
    if (prototype === null) return false;
    if (prototype === right.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
}
function Car() {}
var benz = new Car();
console.log('benz :', benz);
console.log('myInstanceof(benz, Car; :', myInstanceof(benz, Array));
// console.log(myInstanceof([], Array));
