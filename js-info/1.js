"use strict";
function camelize(str) {
  return str
    .split("-")
    .map((item, index) => {
      return item === "" || index === 0
        ? item
        : item[0].toUpperCase() + item.slice(1);
    })
    .join("");
}

camelize("bb-aa");
console.log('camelize("bb-aa"); :', camelize("bb-aa"));

var gVar = 5;

console.log(window.gVar);

function test() {
  console.log(this);
}

test();

let sayHi = function func(who) {
  console.log(func.name); //func
  console.log(sayHi.name); //func

  // func();
  // sayHi();
};

sayHi();
func();

let sayHi2 = function (who) {
  console.log(sayHi2.name); //sayHi2
};

sayHi2();
