function shallowCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

const a = [1, 2, 3];
const b = shallowCopy(a);
console.log("b :", b);

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
}
const a2 = { test: 123, foo: { a: 111 } };
const b2 = deepCopy(a2);

b2.foo.a = 234;
console.log("a2 :", a2);
console.log("b2 :", b2);

const arr = [1, 2, "121", { a: ["qw", "dsds"] }];
const res = deepCopy(arr);

res[3].a[1] = true;
console.log("arr :", arr);
console.log("res :", res);
