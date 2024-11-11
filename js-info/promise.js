// 较完善版本
function MyPromise(excutor) {
  const _this = this;
  this.status = "pending";
  this.value = "";
  this.onFullfilledCallBacks = [];
  this.onRejectedCallBacks = [];

  function resolve(res) {
    _this.status = "fullfilled";
    _this.value = res;
    _this.onFullfilledCallBacks.map((fn) => fn(_this.value));
  }

  function reject(err) {
    _this.status = "rejected";
    _this.value = err;
    _this.onRejectedCallBacks.map((fn) => fn(_this.value));
  }

  try {
    excutor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
  let promise2;
  onFullfilled =
    typeof onFullfilled === "function"
      ? onFullfilled
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (reason) {
          return reason;
        };

  if (this.status === "pending") {
    this.onFullfilledCallBacks.push(onFullfilled);
    this.onRejectedCallBacks.push(onRejected);
  }

  if (this.status === "fullfilled") {
    return (promise2 = new MyPromise((resolve, reject) => {
      try {
        let x = onFullfilled(this.value);

        if (x instanceof MyPromise) {
          // x就是then中return的promise对象
          // 这个resolve传入的是promise2对象的resolve
          //x中resolve了，x的状态是fullfilled，调用then函数，就调用了传入的promise2的resolve，并将233333值传给它，
          //此时promise2也调用了resolve，promise2的状态也是fullfilled,会调用后续的then
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (error) {
        reject(error);
      }
    }));
  }

  if (this.status === "rejected") {
    return (promise2 = new MyPromise((resolve, reject) => {
      try {
        let x = onRejected(this.value);

        if (x instanceof MyPromise) {
          x.then(resolve, reject);
        } else if (x instanceof Error) {
          reject(x); //错误对象无onRejected往下传递，传到catch有onRejected了就进行处理，处理后继续往下传递返回值
        } else {
          resolve(x);
        }
      } catch (error) {
        reject(error);
      }
    }));
  }
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

new MyPromise((resolve, reject) => {
  resolve(123);
  //   throw new Error("error!!!!!");
  //   func();
})
  .then(
    (res) => {
      console.log("res :", res);

      return new MyPromise((resolve, reject) => {
        resolve(233333);
      });
    },
    // (err) => {
    //   console.error("middle", err);
    // },
  )
  .then((res) => {
    console.log("res2 :", res);

    func();
    return "hhhhhhh";
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("catch", err);
    return 111;
  })
  .catch((err) => {
    console.error("catch2", err);
  })
  .then((res) => {
    console.log("qwqwwq", res);
  });
