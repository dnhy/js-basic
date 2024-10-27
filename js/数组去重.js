//1.原始方法

function unique(array) {
  var res = [];

  for (var i = 0; i < array.length; i++) {
    for (var k = 0; k < res.length; k++) {
      if (array[i] === res[k]) {
        break;
      }
    }

    if (k === res.length) {
      res.push(array[i]);
    }
  }
  return res;
}

// 使用indexOf简化内层循环
function unique2(array) {
  var res = [];

  for (var i = 0; i < array.length; i++) {
    // !res.includes(array[i])
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i]);
    }
  }
  return res;
}

// 排序后去重
function unique3(array) {
  var res = [],
    seen;

  var sortedArray = array.concat().sort();
  for (var i = 0; i < sortedArray.length; i++) {
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }

    seen = sortedArray[i];
  }

  return res;
}

// unique API
function unique4(array, isSorted, iteratee) {
  var res = [],
    seen;

  for (var i = 0; i < array.length; i++) {
    var value = array[i];
    var computed = iteratee ? iteratee(value, i, array) : value;
    console.log('computed :', computed);
    value = computed;
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }

      seen = value;
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }

  return res;
}
var array = [1, 1, 'a', 'A', 2, 2];
var iteratee = function (item) {
  return typeof item == 'string' ? item.toLowerCase() : item;
};
console.log(unique4(array, false, iteratee)); // [1, "1"]
