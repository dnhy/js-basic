"use strict";

var _lodash = _interopRequireWildcard(require("lodash"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
var obj = _lodash["default"].cloneDeep(user);
console.log("obj :", obj);

// TODO：手写深浅拷贝

var fruit = "apple";
var bag = _defineProperty({}, fruit + " and orange", 5);
var bag2 = {};
bag2[fruit] = 123;
console.log(bag);
console.log(bag2);

// 表达式可以分为字面量和变量
// 按数据类型也可以划分为原始数据类型和引用数据类型

var s = Symbol();
var f = function f() {};
var objT = {
  a: 123
};
// 属性名只能是字符串或Symbol类型，其他类型会被转成字符串
// 字符串可以省略"",变量必须加[]表示是一个变量
var foo = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, s, 123), 123, "!!!"), "bar", "111"), "true", true), f, true), objT, 1212);
console.log("foo", foo);
// 字符串可以点取值，变量需要加[]表示是一个变量取值
// []取到变量或字面量值之后会先被转成字符串，再去变量中找
var num = 123;
console.log(foo.bar, foo[123],
//123转成"123""
foo["123"], foo[num],
//num是变量拿到123,转成"123"
foo[s], foo["true"], foo[true],
//拿到布尔值true，转成字符串"true""
foo["true"],
//true实际上是"true"
foo[objT]);
var codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};
for (var key in codes) {
  console.log(key);
}

// 创建一个函数并立即使用 new 调用它
var userTest = new function () {
  this.name = "John";
  this.isAdmin = false;

  // ……用于用户创建的其他代码
  // 也许是复杂的逻辑和语句
  // 局部变量等
}();
function User() {
  console.log(this instanceof User ? this.constructor : void 0);
  console.log("this", this instanceof User);
}
User();
new User();
var user1221 = null;
var x = 0;
user1221 === null || user1221 === void 0 || user1221.sayHi(x++);
// 对象Symbol属性的隐藏式对于遍历方法forin Object.keys的隐藏、以及其他模块拿到对象后直接访问该属性的隐藏
// 使用in、 Object.getOwnPropertySymbols(obj) 、Reflect.ownKeys(obj) 还是可以访问到

var a = {
  test: 123
};
Object.freeze(a);