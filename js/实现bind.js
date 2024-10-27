var foo = {
  value: 1,
};

function bar(a, b) {
  this.habit = 'game';
  console.log('[ this.value ] >', this.value);
  console.log('[ this.habit ] >', this.habit);
  console.log('[ a ] >', a);
  console.log('[ b ] >', b);
  return this.value + ' ' + a + ' ' + b;
}

bar.prototype.friend = 'test';

Function.prototype.bind2 = function (context) {
  var self = this; //bar
  var args = Array.prototype.slice.call(arguments, 1);
  var fBound = function () {
    var newArgs = Array.from(arguments);
    // 1.如果是构造函数（this指向创建的实例），绑定函数创建的对象；2.如果是一般函数（this指向window），指向需要绑定的对象
    // 这里通过apply方法把bar中的this指向改成了fBound，相当于fBound中添加了bar中的属性
    // return 是为了返回bar的返回值，只用于fBound为一般函数时
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(newArgs),
    );
  };
  //   使用一个空函数，套一层原型链，使修改fBound的原型时不修改bar的原型
  var fNOP = function () {};
  fNOP.prototype = self.prototype;
  fBound.prototype = new fNOP();

  // 相当于
  // fBound.prototype = Object.create(this.prototype);

  // 不包对象的写法
  //   fBound.prototype = self.prototype;

  return fBound;
};

var bindBar = bar.bind2(foo, 123);
var res = bindBar();
console.log('res :', res);
console.log(
  'bindBar.prototype.friend12211 :',
  bindBar.prototype.__proto__.friend,
);

console.log('[ ****** ] >');
const qwqwq = new bindBar('obj111');

// qwqwq.__proto__ = fBound.prototype=new fNOP();
// fBound.prototype.__proto__ = fNOP.prototype = bar.prototype

console.log('bindBar.prototype.friend!!! :', bindBar.prototype.__proto__);
console.log('qwqwq :', qwqwq);
// 新对象qwqwq的__proto__就是fnop实例，fnop实例的__proto__就是bar.prototype
console.log('qwqwq.__proto__.friend :', qwqwq.__proto__.__proto__.friend);

function a() {
  this.test = 'A';
}

function b() {
  this.testB = 'B';
  return a.apply(this);
}

console.log(new b());
