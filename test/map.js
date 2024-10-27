const source = new Array(3).fill(Object.create(null));
Array.prototype.newMap = function (fn) {
  var newArr = [];
  for (var i = 0; i < this.length; i++) {
    let ress = fn(this[i], i, this);
    console.log('ress :', ress);
    newArr.push(ress);
    console.log('newArr :', newArr);
  }
  return newArr;
};
let res = source.newMap((item, index) => {
  console.log('index :', index);
  item.name = `当前第${index + 1}个元素`;
  console.log('item :', item);
  return item;
});

console.log('[ res ] >', res);
