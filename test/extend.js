function Animal(name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function () {
    console.log(this.name + '正在睡觉！');
  };
  //实例引用属性
  this.features = [];
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};

console.log('Animal :', Animal.prototype);

// 组合继承
// function Cat(name) {
//   Animal.call(this);
//   this.name = name || 'Tom';
// }

// Cat.prototype = new Animal();
// Cat.prototype.constructor = Cat;
// Cat.prototype.test = 'cat-test';

// const cat = new Cat();
// console.log('cat :', cat);

// 寄生组合继承
function Cat(name) {
  Animal.call(this);
  this.name = name || 'Tom';
}

const Nof = function () {};
// cat.__proto__.__proto__
Nof.prototype = Animal.prototype;
// cat.__proto__
Cat.prototype = new Nof();
console.log('Cat.prototype :', Cat.prototype);

// Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.constructor = Cat;
Cat.prototype.test = 'cat-test';

const cat = new Cat();
console.log('cat :', cat);

// 组合继承+寄生的方式=寄生组合继承