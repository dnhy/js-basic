class A {
  name = "A-name";

  constructor(age) {
    this.age = age;
  }
  foo() {
    console.log("foo");
  }
}
A.attr = "static attr";

class B extends A {
  bName = "B-name";
}

const a = new A(111);
console.log("a :", a);

const b = new B();
console.log("b :", b);

console.log(A.attr, B.attr);

console.log(b.foo());
