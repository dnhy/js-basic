//递归
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
      // const arrRes = flatten(arr[i]);
      // arrRes.forEach((e) => {
      //   result.push(e);
      // });
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
var arr2 = [1, [2, [3, 4]]];
console.log('arr :', flatten(arr2));

// toString -只适用于数组元素都是数字的情况
[1, [2, [3, 4]]].toString(); // "1,2,3,4"
function flatten2(arr) {
  return arr
    .toString()
    .split(',')
    .map((item) => {
      return +item;
    });
}
var arr2 = [1, [2, [3, 4]]];
console.log('arr2 :', flatten2(arr2));

// recude
function flatten3(arr) {
  return arr.reduce((pre, item) => {
    return pre.concat(Array.isArray(item) ? flatten3(item) : item);
  }, []);
}

var arr3 = [1, [2, [3, 4]]];
console.log('arr3 :', flatten3(arr3));

// 扩展运算符
function flatten4(arr) {
  //   function hasArray(arr) {
  //     return (
  //       arr.find((e) => {
  //         return Array.isArray(e);
  //       }) != undefined
  //     );
  //   }
  //   while (hasArray(arr)) {
  //     arr = [].concat(...arr);
  //   }

  while (
    arr.some((e) => {
      return Array.isArray(e);
    })
  ) {
    arr = [].concat(...arr);
  }
  return arr;
}
var arr4 = [1, [2, [3, 4, [5, 6]]]];
console.log('arr4 :', flatten4(arr4));

//向bar中添加foo的元素
var foo = [1, 2, 3];
var bar = [4, 5, 6];

// push写法
foo.forEach((e) => {
  bar.push(e);
});

//concat写法
bar = bar.concat(foo);
