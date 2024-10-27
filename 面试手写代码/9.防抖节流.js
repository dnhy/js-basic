// 防抖
function debounced(func, wait) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  };
}

// 节流
function throttle(func, wait) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func(this, arguments);
        timer = null;
      }, wait);
    }
  };
}