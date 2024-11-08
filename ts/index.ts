class Person {
  constructor(public name: string, public age: number) {}
}

class Animal {
  constructor(public name: string, public age: number) {}
}
type IClazz<T> = new (name: string, age: number) => T;

type IPerson = new (name: string, age: number) => Person;

function test233(t: typeof Person) {
  return t;
}

test233(Person);

// 函数中的泛型相当于定义了类型的形参，<>位置在函数名之后或形参之前
function createInstance<T, K>(target: IClazz<T>, name: K, age: number) {
  // 使用IClazz类型的target new的时候，传的name是K，那IClazz里接收的name自然也要是K
  // 注意定义的时候下面的createInstance还没执行，K还没传入string
  return new target(name as string, age);
}

// 给泛型传类型
createInstance<Animal, string>(Animal, "test", 123);

// 不给泛型传类型，可以通过实参自动推导形参的类型T为string，并把string赋值给<>中的泛型T，泛型再把类型传给所有形参
// createInstance(Person, '122qw', 123);

function swap<T, K>(arr: [T, K]): [K, T] {
  return [arr[1], arr[0]];
}

// 抽出函数类型
// type ISwap = <T, K>(tuple: [T, K]) => [K, T];
// 使用接口的写法
interface ISwap {
  <T, K>(tuple: [T, K]): [K, T];
}

const swap2: ISwap = function (arr) {
  return [arr[1], arr[0]];
};

let r = swap([111, "qwqqw"]);

// 函数定义时，泛型的类型多个类型之间推导时会模拟一遍函数执行，进行泛型传递
// 函数执行时再把实际的类型传入进去

// 泛型写在类型后面，表示使用类型的时候传参（函数里需要和函数外保持一致的类型），写在函数前面，表示函数调用的时候传参（函数内部可以有自己的类型，函数外部没有把T传进去）
type ICallback<T> = (item: T, index: number) => void;
type IForeach = <T>(arr: T[], callback: ICallback<T>) => void;

const foreach: IForeach = function (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
};

foreach([1, 2, 3, "wqwq", "212wqwq"], (item, index) => {});

var a: number | string;
a = 123;

interface moduleType {
  length: number;
}

// extends用法
function getVal<
  T,
  K extends keyof T,
  N extends "123" | "21221",
  M extends moduleType,
>(obj: T, key: K, n: N, m: M) {
  return obj[key];
}

getVal({ name: "Tom", age: 12 }, "age", "123", { length: 123, a: 111 });

// 泛型的应用1
interface IResponse<T> {
  message?: string;
  code: number;
  data: T;
}

interface ICommon {
  token: string;
}

interface ILoginForm extends ICommon {
  role: number[];
  username: string;
}

interface IDataList extends ICommon {
  dataList: object[];
}

function toLogin(): IResponse<ILoginForm> {
  return {
    code: 200,
    data: {
      token: "wqwqwq",
      role: [1, 2, 5],
      username: "Tom",
    },
  };
}

function getDataList(key: string): IResponse<IDataList> {
  return {
    code: 200,
    data: {
      token: "wqwqwq",
      dataList: [{ id: 123, name: "qwwqqw" }],
    },
  };
}

class MyArray<T> {
  private arr: T[] = [];
  set(val: T) {}
  getMax(): T {
    let arr = this.arr;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      arr[i] > max ? (max = arr[i]) : void 0;
    }

    return max;
  }
}

// 泛型的应用2
const arr = new MyArray<number>();
arr.set(200);
arr.set(1221);
arr.set(123);
console.log(arr.getMax());
// console.log(arr.arr);

const wqwq = 123;
