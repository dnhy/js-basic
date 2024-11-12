function PromiseAll(arr) {
  //   if (!Array.isArray(arr)) throw Error(`${arr} is not a array`);

  return new Promise((resolve, reject) => {
    let l = 0;
    const res = [];

    arr.forEach((item, index) => {
      Promise.resolve(item).then(
        (data) => {
          res[index] = data;
          console.log("res :", res);

          l++;

          if (l === arr.length) {
            return resolve(res);
          }
        },
        (err) => reject(err),
      );
    });
  });
}

// promiseAll(123);
// 异步操作包promise，完成时resolve，触发then，进行计数
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
PromiseAll([p3, p1, p2, 2333]).then((res) => {
  console.log(res); // [3, 1, 2]
});

// new Promise((resolve, reject) => {
//   resolve(p1);
// }).then((res) => {
//   console.log("res :", res);
// });
