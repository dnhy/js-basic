var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var Animal = /** @class */ (function () {
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }
    return Animal;
}());
// 函数中的泛型相当于定义了类型的形参，<>位置在函数名之后或形参之前
function createInstance(target, name, age) {
    // 使用IClazz类型的target new的时候，传的name是K，那IClazz里接收的name自然也要是K
    // 注意定义的时候下面的createInstance还没执行，K还没传入string
    return new target(name, age);
}
// 给泛型传类型
createInstance(Animal, "test", 123);
// 不给泛型传类型，可以通过实参自动推导形参的类型T为string，并把string赋值给<>中的泛型T，泛型再把类型传给所有形参
// createInstance(Person, '122qw', 123);
function swap(arr) {
    return [arr[1], arr[0]];
}
var swap2 = function (arr) {
    return [arr[1], arr[0]];
};
var r = swap([111, "qwqqw"]);
var foreach = function (arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
};
foreach([1, 2, 3, "wqwq", "212wqwq"], function (item, index) { });
var a;
a = 123;
// extends用法
function getVal(obj, key, n, m) {
    return obj[key];
}
getVal({ name: "Tom", age: 12 }, "age", "123", { length: 123, a: 111 });
function toLogin() {
    return {
        code: 200,
        data: {
            token: "wqwqwq",
            role: [1, 2, 5],
            username: "Tom",
        },
    };
}
function getDataList(key) {
    return {
        code: 200,
        data: {
            token: "wqwqwq",
            dataList: [{ id: 123, name: "qwwqqw" }],
        },
    };
}
var MyArray = /** @class */ (function () {
    function MyArray() {
        this.arr = [];
    }
    MyArray.prototype.set = function (val) { };
    MyArray.prototype.getMax = function () {
        var arr = this.arr;
        var max = arr[0];
        for (var i = 1; i < arr.length; i++) {
            arr[i] > max ? (max = arr[i]) : void 0;
        }
        return max;
    };
    return MyArray;
}());
// 泛型的应用2
var arr = new MyArray();
arr.set(200);
arr.set(1221);
arr.set(123);
console.log(arr.getMax());
// console.log(arr.arr);
var wqwq = 123;
