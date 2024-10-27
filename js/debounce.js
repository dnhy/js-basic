var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
  console.log(this);
  console.log(e);
  container.innerHTML = count++;
}

function debounced(func, wait, immediate = false) {
  var timeOut = null,
    result;
  var debounced = function () {
    var args = arguments;
    if (immediate) {
      clearTimeout(timeOut);

      !timeOut ? (result = func.apply(this, args)) : '';
      timeOut = setTimeout(() => {
        timeOut = null;
      }, wait);
    } else {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }

    return result;
  };

  //取消防抖
  debounced.cancel = function () {
    clearTimeout(timeOut);
    timeOut = null;
  };

  return debounced;
}

var setUserAction = debounced(getUserAction, 10000, true);
document.getElementById('button').addEventListener('click', () => {
  setUserAction.cancel();
});

container.onmousemove = setUserAction;
// container.onmousemove = getUserAction;
