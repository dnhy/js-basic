function loadScript(src, success, fail) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => success(script);
  script.onerror = () => fail(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// loadScript(
//   "./1.js",
//   (script) => {
//     console.log(`handle ${script} success`);
//   },
//   (err) => {
//     console.log("error", err);
//   },
// );

// function loadScriptPromise(src) {
//   return new Promise((resolve, reject) => {
//     loadScript(
//       src,
//       (script) => {
//         resolve(script);
//       },
//       (err) => {
//         reject(err);
//       },
//     );
//   });
// }

function promisify(func, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function success(...results) {
        resolve(manyArgs ? results : results[0]);
      }
      function fail(err) {
        reject(err);
      }
      args.push(success);
      args.push(fail);
      func(...args);
    });
  };
}

const loadScriptPromise = promisify(loadScript);
loadScriptPromise("./1.js")
  .then((res) => {
    console.log(`handle ${res} success`);
  })
  .catch((err) => {
    console.log("error", err);
  });

new Promise((resolve, reject) => {
  resolve(123);
})
  .then((res) => {
    console.log("res1 :", res);
  })
  .then((res) => {
    func();
  })
  .then((res) => {
    console.log("res2 :", res);
  })
  .catch((err) => {
    console.log("err :", err);
    return 111;
  })
  .then((res) => {
    console.log("res3 :", res);
  });
