function ObjectFactory() {
  var obj = new Object();
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}

function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
};

var objOtaku = ObjectFactory(Otaku, 'xxx', 12);
console.log('objOtaku :', objOtaku);
