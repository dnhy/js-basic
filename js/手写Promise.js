// new Promise((resolve, reject) => {
//   if (true) {
//     resolve(123);
//   } else {
//     reject();
//   }
// })
//   .then(
//     (res) => {
//       console.log('res :', res);
//       return new Promise((resolve, reject) => {
//         resolve(456);
//       });
//     },
//     (err) => {},
//   )
//   .then((res) => {
//     console.log('res2 :', res);
//   }).catch((err) => {

//   });

// var promise2 = new Promise((resolve, reject) => {
//   var x = new Promise((resolve, reject) => {
//     resolve(7777);
//   });

//   console.log('[ x ] >', x);
//   x.then(resolve, reject);
// }).then((res) => {
//   console.log('res2121 :', res);
// });

function myPromise(executor) {
  var self = this;
  self.status = 'pending';
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
      for (var i = 0; i < self.onResolvedCallback; i++) {
        self.onResolvedCallback[i](value);
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      for (var i = 0; i < self.onRejectedCallback; i++) {
        self.onRejectedCallback[i](reason);
      }
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

myPromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var myPromise2 = null;
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (reason) {
          return reason;
        };

  if (self.status === 'resolved') {
    return (myPromise2 = new myPromise((resolve, reject) => {
      try {
        var x = onResolved(self.data);
        if (x instanceof myPromise) {
          x.then(resolve, reject);
        }
        resolve(x);
      } catch (error) {
        reject(error);
      }
    }));
  }

  if (self.status === 'rejected') {
    return (myPromise2 = new myPromise((resolve, reject) => {
      var x = onRejected(self.data);
      if (x instanceof myPromise) {
        x.then(resolve, reject);
      }
      reject(x);
    }));
  }

  if (self.status === 'pending') {
    return (myPromise2 = new myPromise((resolve, reject) => {}));
  }
};

myPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

new myPromise((resolve, reject) => {
  resolve(111);
})
  .then()
  .then()
  .then()
  .then((res) => {
    console.log('res~!!! :', res);
  })
  .catch((err) => {
    console.log('[ err22 ] >', err);
  });
