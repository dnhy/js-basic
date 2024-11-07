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
