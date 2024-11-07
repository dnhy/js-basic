type IFunc = () => string;
const fun: IFunc = () => {
  return "12";
};

interface IMethod {
  test(): void;
  speak: () => void;
}

class Test implements IMethod {
  constructor() {
    this.speak = () => {};
  }
  test(): void {
    throw new Error("Method not implemented.");
  }
  speak: () => void;
}

const test = new Test();
console.log("test :", test);

const obj = {
  a: 1,
  b: 2,
};
type a222 = keyof any;
