import * as all from "./b.js";
console.log("all:", all);
import { aaaa, obj } from "./b.js";
console.log("aaaa :", aaaa);
obj.test = 11111;
console.log("obj :", obj);

import { default as defImpt } from "./b.js";
console.log("defImpt :", defImpt);
import defImpt2 from "./b.js";
console.log("defImpt2 :", defImpt2);

const arr = [1, 2, 3];
arr.forEach((e, i, arr) => {
  arr.splice(0, 1);
  console.log(e, i, arr);
});
//1 0  [2, 3]
//3 1 [3]
