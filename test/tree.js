var TreeNode = /** @class */ (function () {
    function TreeNode(val, left, right) {
        if (val === void 0) { val = 0; }
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.val = val;
        this.left = left;
        this.right = right;
    }
    return TreeNode;
}());
var tree = new TreeNode();
console.log("tree :", tree);
var fun = function () {
    return "12";
};
var Test = /** @class */ (function () {
    function Test() {
        this.speak = function () { };
    }
    Test.prototype.test = function () {
        throw new Error("Method not implemented.");
    };
    return Test;
}());
var test = new Test();
console.log("test :", test);
