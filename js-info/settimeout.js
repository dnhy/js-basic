function printNumbers2(from, to) {
  let curr = from;
  function go() {
    console.log(curr);
    curr += 1;
    if (curr > to) {
      clearInterval(interval);
    }
  }
  go();
  const interval = setInterval(go, 1000);
}

function printNumbers(from, to) {
  let curr = from;
  setTimeout(function fnc() {
    console.log(curr);
    curr++;
    if (curr <= to) {
      setTimeout(fnc, 1000);
    }
  }, 1000);
}

printNumbers2(1, 10);
