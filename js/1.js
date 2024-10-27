var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();

// 1.创建全局指向上下文入执行栈
ECStack = [
    globalContext
]

// 2.全局上下文初始化
globalContext = {
    VO: [global],
    Scope: [globalContext.VO],
    this: globalContext.VO
}

// 2.初始化的同时，checkscope 函数被创建，保存作用域链到函数的内部属性[[scope]]
checkscope.[[scope]] = [
    globalContext.VO
  ];

//   
ECStack = [
    checkscopeContext,
    globalContext
];

// 函数执行上下文
checkscopeContext = {
    AO:{
        arguments:{
            length:0
        },
        scope:undefined,//执行后赋值 "local scope"
        f:reference to function f(){}
    },
    Scope: [
        AO,
        globalContext.VO
      ],
      this:undefined
}
//函数执行，沿着作用域找到f函数
ECStack = [
    globalContext
];

// f函数创建
fscope.[[scope]] = [
    checkscopeContext.AO,
    globalContext.VO
  ];
 
  ECStack = [
    fContenxt,
    globalContext
];

fContenxt = {
    AO:{
        arguments:{
            length:0
        },
    },
    Scope:[ 
        AO,
        checkscopeContext.AO,
        globalContext.VO]
}

//f函数被调用，沿作用域找到scope
ECStack = [
    globalContext
];

// 对的，就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO 的值，
// 说明当 f 函数引用了 checkscopeContext.AO 中的值的时候，
// 即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，
// f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
}

