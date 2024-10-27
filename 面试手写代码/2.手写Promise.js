const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  const that = this;
  that.state = PENDING;
  that.value = null; //存储resolve或reject的参数值
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      // resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，
      // 因为当执行完 Promise 时状态可能还是等待中（异步调用resolve），这时候应该把 then 中的回调保存起来用于状态改变时使用
      that.resolvedCallbacks.map((cb) => cb(that.value));
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map((cb) => cb(that.value));
    }
  }

  // MyPromise构造函数调用的核心是调用传入的回调函数
  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
  const that = this;
  // 判断传入的是否是函数
  onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : (v) => v;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (r) => {
          throw r;
        };
  // 异步调用，状态还没改变，先保存起来，等状态改变后调用
  if (that.state === PENDING) {
    this.resolvedCallbacks.push(onFullfilled);
    that.rejectedCallbacks.push(onRejected);
  }

  let res = null;

  if (that.state === RESOLVED) {
    res = onFullfilled(that.value);
    return new MyPromise((resolved) => {
      resolved(res);
    });
  }

  if (that.state === REJECTED) {
    res = onRejected(that.value);
    return new MyPromise((resolved, rejected) => {
      resolved(res);
    });
  }
};

new MyPromise((resolve, reject) => {
  //   resolve(1);
  reject('112');
})
  .then(
    (res) => {
      console.log('res :', res);
      return 123;
    },
    (err) => {
      console.error(err);
    },
  )
  .then((res2) => {
    console.log('res2 :', res2);
  });
