function Parent() {
  this.name = 'kevin';
}

Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();

var child1 = new Child();

child1.getName(); // kevin
console.log(child1.name); // kevin
child1.name = 233;
console.log(child1.name); // 233
child1.getName(); // 23
console.log(c);
console.log(child1.__proto__);

var child2 = new Child();
console.log(child2.name);

