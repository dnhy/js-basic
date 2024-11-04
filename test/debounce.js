function debounce(func, delay) {
  let timer;
  const debounced = function () {
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  return debounced;
}

// 加入immediate，第一次点击可以立即执行
// 后续如果在delay范围内再点击不执行，delay之后点击可以执行
function debounce(func, delay, immediate) {
  let timer;
  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(timer);
    if (immediate) {
      const callnow = !timer;
      //   存在计时器时不执行，计时器为null时执行，一直点击一直为null，不点击delay之后才会是null
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callnow) {
        func.apply(context, args);
      }
    } else {
      setTimeout(() => {
        func.apply(context, args);
      }, delay);
    }
  };
}

// 节流
//每次触发的时候判断，满足时间触发，不满足不触发。停止触发之后不会再执行事件
const throttle = function (func, wait = 500) {
  let startTime = new Date();
  return function () {
    const context = this;
    const endTime = new Date();
    if (endTime - startTime >= wait) {
      func.apply(context, arguments);
      startTime = new Date();
    }
  };
};

// 触发之后等一段时间会执行一次，这期间停止触发，上一次的还会执行完成
const throttle2 = function (func, wait = 500) {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait);
    }
  };
};

const content = document.getElementById("content");
var count = 1;

const countter = () => {
  content.innerHTML = count++;
};
content.addEventListener("mousemove", throttle2(countter, 3000));
