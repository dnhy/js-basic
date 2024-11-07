function TreeNode(val, left, right) {
  this.val = val ?? 0;
  this.left = left ?? null;
  this.right = right ?? null;
}

const root = new TreeNode("5");

const node4 = new TreeNode("4");
const node6 = new TreeNode("6");
const node1 = new TreeNode("1");
const node2 = new TreeNode("2");

root.left = node4;
root.right = node6;

node4.left = node1;
node4.right = node2;

console.log(root);
// 迭代法统一遍历法
// 前序遍历
const preorderTravesal = function (root, res = []) {
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const top = stack.pop();
    if (top === null) {
      res.push(stack.pop().val);
      continue;
    }

    top.right && stack.push(top.right);
    top.left && stack.push(top.left);
    stack.push(top);
    stack.push(null);
  }

  return res;
};

console.log(preorderTravesal(root));

// 中序遍历
const inorderTravesal = function (root, res = []) {
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const top = stack.pop();
    if (top === null) {
      res.push(stack.pop().val);
      continue;
    }

    top.right && stack.push(top.right);
    stack.push(top);
    stack.push(null);
    top.left && stack.push(top.left);
  }

  return res;
};
console.log(inorderTravesal(root));

// 后续遍历
const postorderTravesal = function (root, res = []) {
  const stack = [];
  stack.push(root);
  while (stack.length > 0) {
    const top = stack.pop();
    if (top == null) {
      res.push(stack.pop().val);
      continue;
    }

    stack.push(top);
    stack.push(null);
    top.right && stack.push(top.right);
    top.left && stack.push(top.left);
  }

  return res;
};

console.log(postorderTravesal(root));

// 层序遍历
function levelOrder(root, res = []) {
  const queue = [];
  if (!root) return [];
  queue.push(root);
  while (queue.length) {
    let length = queue.length;
    while (length--) {
      const top = queue.shift();
      res.push(top.val);

      top.left && queue.push(top.left);
      top.right && queue.push(top.right);
    }
  }

  return res;
}

console.log(levelOrder(root));
