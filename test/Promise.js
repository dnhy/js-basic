let PENDING = 'pending';
let REJECTED = 'rejected';
let FULFILLED = 'fulfilled';

function MyPromise(fn) {
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.fullfieldCallbacks = [];
  that.rejectedCallbacks = [];

  function reslove(value) {
    that.status = FULFILLED;
    that.value = value;
    that.fullfieldCallbacks.map((cb) => cb(that.value));
  }

  function reject(value) {
    that.status = REJECTED;
    that.value = value;
    that.rejectedCallbacks.map((cb) => cb(that.value));
  }

  try {
    fn(reslove, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
  const that = this;
  onFullfilled =
    typeof onFullfilled === 'function'
      ? onFullfilled
      : (v) => {
          return v;
        };
  if (onRejected) {
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };
  }

  if (that.status === PENDING) {
    that.fullfieldCallbacks.push(onRejected);
    that.rejectedCallbacks.push(rejectedCallback);
  }

  let res;
  if (that.status === FULFILLED) {
    res = onFullfilled(that.value);
    return new MyPromise((reslove, reject) => {
      reslove(res);
    });
  }

  if (onRejected && that.status === REJECTED) {
    res = onRejected(that.value);
  }

  return new MyPromise((reslove, reject) => {
    reject(onRejected ? res : that.value);
  });
};

MyPromise.prototype.catch = function (onRejected) {
  const that = this;

  if (that.status === PENDING) {
    that.rejectedCallbacks.push(rejectedCallback);
  }

  if (that.status === REJECTED) {
    let res = onRejected(that.value);
    return new MyPromise((reslove, reject) => {
      reject(res);
    });
  }
};

new MyPromise((resolve, reject) => {
  //   resolve(123);
  reject(123);
})
  .then((res) => {
    console.log('res :', res);
  })
  .catch((err) => {
    console.error(err);
  });
