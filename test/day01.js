var arrLike = {
  0: 'name',
  1: 'age',
  2: 'job',
  length: 3,
};

let set = new Set(['red', 'green', 'blue']);

let arr = Array.from(arrLike); //['name', 'age', 'job']
let arr2 = Array.from(set); //['red', 'green', 'blue']
console.log('set :', set);
console.log('arr2 :', arr2);
