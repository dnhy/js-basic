var arr = [];
for (var i = 0; i < 3; i++) {
  (function (i) {
    arr[i] = function () {
      console.log(i);
    };
  })(i);
}

arr[0]();

//模拟私有变量
function Person() {
  let privateAge = 123;

  function setPrivateAge(val) {
    privateAge = val;
  }

  return {
    setInfo(age) {
      return setPrivateAge(age);
    },
    value() {
      return privateAge;
    },
  };
}
const person = Person();
console.log('person :', person.value());
person.setInfo(12);
console.log('person :', person.value());
