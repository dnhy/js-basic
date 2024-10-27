function test() {
  let doms = new Array(100000).fill(0).map((_, index) => {
    let node = document.createElement('div');
    node.innerHTML = index;
    return node;
  });
  function other() {
    return doms;
  }
  function increse() {
    // return doms;
  }

  return increse;
}
let getFunc;

createBtn.onclick = function () {
  console.log(111);
  getFunc = test();
};

removeBtn.onclick = function () {
  console.log(222);
  getFunc = null;
};

function createAndAppendNodes(count) {
  const fragment = document.createDocumentFragment(); // 创建一个文档片段
  for (let i = 0; i < count; i++) {
    const node = document.createElement('div'); // 创建一个div元素
    node.textContent = 'Node ' + i; // 设置节点文本内容
    fragment.appendChild(node); // 将节点添加到文档片段
  }
  document.body.appendChild(fragment); // 将所有节点一次性添加到DOM

  return fragment;
}
