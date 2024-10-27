// 一切的对象由他们的构造函数构造，继承自Object对象

// 一切的函数对象由Function函数构造，继承自Object对象

// Object对象继承自null，由Function函数（匿名函数）构造

// Function对象继承自Object对象，由Function对象（匿名函数）自己构造

// __proto__一层是构造，两层以上是继承
Function.prototype.bind2 = function (newObj) {
  var aArgs = Array.prototype.slice.call(arguments, 1);
  var caller = this; //caller.bind(newObj)
  var fBound = function () {
    return caller.apply(
      // 如果this是fBound的实例，说明新函数用来new了,调用原函数的this是fBound的实例
      // 如果不是，改变this的指向
      this instanceof fBound ? this : newObj,
      aArgs.concat(Array.prototype.slice.call(arguments)),
    );
  };
  //   var fNOP = function () {};
  //   fNOP.prototype = caller.prototype;
  //   fBound.prototype = new fNOP();

  //   解析：
  //   *var fNOP = function () {};
  //   var f2 = new fNOP();
  //   *f2.__proto__ = fNOP.prototype = caller.prototype;
  //   目标：fbindObj.__proto__.__proto__  = caller.prototype = f2.__proto__;
  //   化简fbindObj.__proto__ = f2;
  //   由于fbindObj.__proto__ = fBound.prototype
  //   所以fBound.prototype = f2;
  //   *fBound.prototype = new fNOP();

  var fNOP = function () {};
  fNOP.prototype = caller.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

Function.prototype.bind3 = function (oThis) {
  let originalFunc = this;
  let args = Array.prototype.slice.call(arguments, 1);
  const fBound = function () {
    originalFunc.apply(
      this instanceof fBound ? this : oThis,
      args.concat(Array.prototype.slice.call(arguments)),
    );
  };

  fBound.prototype = Object.create(originalFunc.prototype);

  return fBound;
};
// test
const obj = {
  bar: 'obj bar',
};

var bar = 123;
function foo(name, test) {
  console.log('this.bar :', this.bar);
  console.log('name :', name);
  console.log('test :', test);
}
foo.prototype.test = () => {
  console.log('this is test');
};


// foo.bind3(obj, 1)(2);
const FooCons = foo.bind3(obj, 1);
console.log('fooCons :', FooCons);
const fooObj = new FooCons();
console.log('fooObj :', fooObj);
fooObj.test();
