class PersonTest {
  constructor(name: string, age: number) {}
}

const p: PersonTest = new PersonTest("Tom", 21);

type C = typeof PersonTest;

type r = typeof PersonTest extends PersonTest ? true : false;

function createInstance2<T extends new (...args: any) => any>(
  target: T,
  ...args: any[]
): InstanceType<T> {
  return new target(...args);
}

createInstance2(PersonTest, "Tom", 23);
