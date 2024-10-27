function Person(name) {
  if (new.target !== undefined) {
    console.log('new.target :', new.target);
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}
var person = new Person('张三'); // 正确
(function a(){
    console.log(1)
}())