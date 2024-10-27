## Map

## Set

[ES6 系列之模拟实现一个 Set 数据结构 · Issue #91 · mqyqingfeng/Blog (github.com)](https://github.com/mqyqingfeng/Blog/issues/91)

## WeakMap

WeakMap 保持了对**键名**所引用的对象的**弱引用**（键值和map相同是强引用，可以是任何值）。

`WeakMap` 只接受**对象**作为键（null除外）

```js
let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
```

key对obj强引用，map对key强引用。

```js
key = null;
```

取消了key的引用，但是map还对obj引用，obj不会被垃圾回收机制回收，造成内存泄露。

```js
map.delete(key);
key = null;
```

这样obj可以被回收。

```js
const wm = new WeakMap();
let key = new Array(5 * 1024 * 1024);
wm.set(key, 1);
key = null;
```

当我们设置 `wm.set(key, 1)` 时，其实建立了 wm 对 key 所引用的对象的弱引用，但因为 `let key = new Array(5 * 1024 * 1024)` 建立了 key 对所引用对象的强引用，被引用的对象并不会被回收，但是当我们设置 `key = null` 的时候，就只有 wm 对所引用对象的弱引用，下次垃圾回收机制执行的时候，该引用对象就会被回收掉。

WeakMap 可以帮你省掉手动删除对象关联数据的步骤，所以当你不能或者不想控制关联数据的生命周期时就可以考虑使用 WeakMap。

总结这个**弱引用**的特性，就是 WeakMaps 保持了对键名所引用的对象的弱引用，即垃圾回收机制不将该引用考虑在内。**只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存，WeakMap不会进行阻止**。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

也正是因为这样的特性，WeakMap 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakMap **不可遍历**。

所以 WeakMap 不像 Map，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有 size 属性，也不支持 clear 方法，所以 WeakMap只有四个方法可用：get()、set()、has()、delete()。

**比较**

Map 相对于 WeakMap ：

- Map 的键可以是任意类型，WeakMap 只接受对象作为键（null除外），不接受其他类型的值作为键
- Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； WeakMap 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
- Map 可以被遍历， WeakMap 不能被遍历

**应用**

### 1. 在 DOM 对象上保存相关数据

### 2. 数据缓存

### 3. 私有属性

**参考**

[ES6 系列之 WeakMap · Issue #92 · mqyqingfeng/Blog (github.com)](https://github.com/mqyqingfeng/Blog/issues/92)

[WeakMap 和 Map 的区别，WeakMap 原理，为什么能被 GC？-CSDN博客](https://blog.csdn.net/weixin_42333548/article/details/135285164)

[JavaScript-使用WeakMap创建对象的私有属性 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/43274222)

