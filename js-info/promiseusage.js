new Promise((resolve, reject) => {
  throw new Error("error");
  //   reject("eeee");
})
  .finally(() => {
    console.log("Promise ready");
    throw new Error("1212212121");
  }) // 先触发
  .catch((err) => console.log("err", err)); // <-- .catch 显示这个 error

function delay(ms) {
  // 你的代码
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

delay(3000).then(() => console.log("runs after 3 seconds"));

const promise = new Promise((resolve, reject) => {
  //   resolve(1111);
  reject(123);
}).then((res) => {
  console.log(res);
});

promise.catch((err) => {
  console.log("promise :", promise);

  console.error(err);
});
// fetch("https://no-such-server.blabla") // reject
//   .then((response) => response.json())
//   .catch((err) => console.error("fetcherr", err));

// const xhr = new XMLHttpRequest();
// console.log("xhr :", xhr);
// xhr.open("GET", "https://no-such-server.blabla", true);
// xhr.send();

// xhr.onerror = () => {
//   console.error("xhr.status", xhr.status);
// };

// new Promise(function () {
//   noSuchFunction(); // 这里出现 error（没有这个函数）
// }).then(() => {
//   // 一个或多个成功的 promise 处理程序
//   console.log("after then");
// }); // 尾端没有 .catch！

// window.addEventListener("unhandledrejection", (e) => {
//   const { promise, reason } = e;
//   console.log("promise :", promise);

//   console.log("reason :", reason);
// });
new Promise((resolve, reject) => {
  setTimeout(() => {
    func();
  });
}).catch((err) => {
  console.log("1112", err);
});

try {
  setTimeout(() => {
    try {
      func();
    } catch (error) {
      console.log("error222", error);
    }
  });
} catch (error) {
  console.log("error111", error);
}
