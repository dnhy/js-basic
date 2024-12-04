Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new Error("TypeError");
  }

  context = context || window;

  const args = [...arguments].slice(1);

  const symbol = Symbol();

  context[symbol] = this;
  let result = context[symbol](...args);
  delete context[symbol];

  return result;
};

Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new Error("TypeError");
  }

  const args = arguments[1] || [];

  if (args && !(args instanceof Array)) {
    throw new Error("TypeError: CreateListFromArrayLike called on non-object");
  }

  context = context || window;

  const symbol = Symbol();
  context[symbol] = this;
  let result = context[symbol](...args);

  delete context[symbol];

  return result;
};

Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error("TypeError");
  }
  context = context || window;

  const argsBind = [...arguments].slice(1);
  const originFn = this;

  return function Fn() {
    const allArgs = argsBind.concat([...arguments]);
    return originFn.apply(this instanceof Fn ? this : context, allArgs);
  };
};

let name = "outside";
const obj = {
  name: "obj is here",
};
function foo(tips1, tips2) {
  console.log(this.name + "," + tips1 + "," + tips2);
}

foo.myCall(obj, "12", "34");

foo.myApply(obj, [12, 3223]);

const newFoo = foo.myBind(obj, "qwe");
newFoo("two");
