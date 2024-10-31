function camelize(str) {
  return str
    .split("-")
    .map((item, index) => {
      return item === "" || index === 0
        ? item
        : item[0].toUpperCase() + item.slice(1);
    })
    .join("");
}

camelize("bb-aa");
console.log('camelize("bb-aa"); :', camelize("bb-aa"));
