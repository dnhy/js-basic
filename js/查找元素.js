function findIndex(array, predicate, context) {
  for (let i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) {
      return i;
    }

    return -1;
  }
}

function findLastIndex(array, predicate, context) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate.call(context, array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

function createIndexFinder(dir) {
  return function (array, predicate, context) {
    var i = dir > 0 ? 0 : array.length - 1;
    for (; i >= 0 && i < array.length; i += dir) {
      if (predicate.call(context, array[i], i, array)) {
        return i;
      }
    }

    return -1;
  };
}

var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);

function cb(iteratee, context) {
  if (context === void 0) {
    return iteratee;
  }

  return function () {
    return iteratee.apply(context, arguments);
  };
}

function sortedIndex(array, target, iteratee, context) {
  iteratee = cb(iteratee, context);
  var low = 0;
  let high = array.length;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    let judge =
      iteratee === void 0
        ? array[mid] < target
        : iteratee(array[mid]) < iteratee(target);
    if (judge) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return high;
}

// console.log('[ 11 ] >', sortedIndex([10, 20, 30, 40, 50], 35));
// stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [
  { name: 'stooge1', age: 10 },
  { name: 'stooge2', age: 30 },
];

var result = sortedIndex(
  stooges,
  { name: 'stooge3', age: 20 },
  function (stooge) {
    return stooge.age;
  },
);

// console.log(result); // 1

function createIndexOf(dir, predicate, sortedIndex) {
  // idx传数字表示开始查找的下标，传true表示数组已经排序
  return function (array, target, idx) {
    let index = 0;
    let length = array.length;
    if (typeof idx === 'number') {
      if (dir > 0) {
        // 正向查找寻找数组的起始位置
        index = idx >= 0 ? idx : Math.max(0, length + idx);
      } else {
        // 反向查找需要按需限定查找数组的长度
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, target);
      return array[idx] === target ? idx : -1;
    }

    // 判断元素是否是 NaN
    if (target !== target) {
      // 在截取好的数组中查找第一个满足isNaN函数的元素的下标,这里是找出NaN的下标
      // 区别于原生indexOf无法找出Nan的下标[1, NaN].indexOf(NaN) // -1
      idx = predicate(array.slice(index, length), isNaN);
      return idx >= 0 ? idx + index : -1;
    }

    let k = dir > 0 ? index : length - 1;
    for (; k >= 0 && k < length; k += dir) {
      if (array[k] === target) {
        return k;
      }
    }

    return -1;
  };
}

var indexOf = createIndexOf(1, findIndex, sortedIndex);
var lastIndexOf = createIndexOf(-1, findLastIndex);

console.log(lastIndexOf([1, 4, 5, 12], 12, true));
console.log(indexOf([1, NaN], NaN));
