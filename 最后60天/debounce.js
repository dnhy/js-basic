function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...arguments);
    }, delay);
  };
}

function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn(...arguments);
      }, delay);
    }
  };
}
