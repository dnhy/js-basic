function Animal() {
  this.name = 'animal';
  this.sleep = function () {
    console.log('sleep eat....');
  };
}

Animal.prototype.eat = function () {
  console.log('animal eat....');
};
// 原型链继承
// 实例是子类的实例，也是父类的实例
// 父类新增原型方法/原型属性，子类都能访问到
// function Cat(name) {
//   this.name = name || 'Tom';
// }

// Cat.prototype = new Animal();
// 修复原型对象的constructor
// Cat.prototype.constructor = Cat;

// 构造函数继承
// 只能继承父类实例方法，不能继承原型方法
// 实例只是子类的，不是父类的
// function Cat(name) {
//   // 调用父类构造函数，子类实例创建后接管父类属性
//   Animal.call(this);
//   this.name = name || 'Tom';
// }

// 组合继承
// 继承了父类实例属性、原型对象属性
// 既是子类的实例也是父类的实例
// 缺点：调用了两次父类构造函数，占有内存空间
// function Cat(name) {
//   Animal.call(this);
//   this.name = name || 'Tom';
// }

// Cat.prototype = new Animal();
// Cat.prototype.constructor = Cat;

// 寄生组合继承
// 继承了父类实例属性、原型对象属性
// 既是子类的实例也是父类的实例
function Cat(name) {
  Animal.call(this);
  this.name = name || 'Tom';
}

// 使用空函数寄生
// const Nfc = function () {};
// Nfc.prototype = Animal.prototype;
// Cat.prototype = new Nfc();

// 使用Object.create寄生
Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.constructor = Cat;

// test
const cat = new Cat();
console.log('cat :', cat);
console.log(cat instanceof Animal);
