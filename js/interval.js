var count = 0;
function changeCount() {
  count = 3;
}

setInterval(() => {
  console.log('[ count ] >', count);
},1000);
