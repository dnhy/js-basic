const a = [];
a.reduce((previousValue, item, index, arr) => {}, 1);
// （1）计算数组中每个元素出现的次数
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var res = names.reduce((preValue, item, index, arr) => {
  if (!preValue[item]) {
    preValue[item] = 1;
  } else {
    preValue[item]++;
  }
  return preValue;
}, {});
console.log('res1 :', res);

//（2）数组去重
let arr = [1, 2, 3, 4, 4, 1];
res = arr.reduce((preValue, item, index, arr) => {
  if (!preValue.includes(item)) {
    return preValue.concat(item);
  } else {
    return preValue;
  }
}, []);
console.log('res2 :', res);

//（3）将二维数组转化为一维数组
arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];

res = arr.reduce((preValue, item, index, arr) => {
  return preValue.concat(item);
}, []);
console.log('res3 :', res);

// （4）将多维数组转化为一维数组
arr = [
  [0, 1],
  [2, 3],
  [4, [5, 6, 7]],
];
function flatten() {
  return arr.reduce((preValue, item, index, arr) => {
    return preValue.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

console.log('res4 :', res);

// （5）对象里的属性求和
var result = [
  {
    subject: 'math',
    score: 10,
  },
  {
    subject: 'chinese',
    score: 20,
  },
  {
    subject: 'english',
    score: 30,
  },
];
res = result.reduce((prev, item) => {
  return prev + item.score;
}, result[0].score);
console.log('res5 :', res);

//(6)求最大值
arr = [6, 4, 1, 8, 2, 11, 23, 12, 11];
res = arr.reduce((prev, item) => {
  return Math.max(prev, item);
});
console.log('res6 :', res);
