function MyPromise(func) {
  let _this = this;
  this.state = "Pending";
  this.value = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(val) {
    _this.state = "Fullfilled";
    _this.value = val;

    this.resolvedCallbacks.map((fn) => fn(val));
  }
  function reject(err) {
    _this.state = "Rejected";
    _this.value = err;

    this.rejectedCallbacks.map((fn) => fn(err));
  }

  try {
    func(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

MyPromise.prototype.then = function (onFullfilled, onRejected) {
  let myPromise2 = null;
  onFullfilled =
    typeof onFullfilled === "function" ? onFullfilled : (val) => val;
  onRejected = typeof onRejected === "function" ? onRejected : (val) => val;
  if (this.state === "Pending") {
    this.resolvedCallbacks.push(onFullfilled);
    this.rejectedCallbacks.push(onRejected);
  }

  if (this.state === "Fullfilled") {
    let res = onFullfilled(this.value);

    return res;
  }

  if (this.state === "Rejected") {
    let res = onFullfilled(this.value);

    return res;
  }
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
