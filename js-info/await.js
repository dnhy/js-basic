function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("delay");
      resolve();
    }, 1000);
  });
}

await delay();

console.log("1111");

// async function loadJson(url) {
//   const response = await fetch(url);
//   if (response.status == 200) {
//     return await response.json();
//   }
//   throw new Error(response.status);
// }

// loadJson("https://javascript.info/no-such-user.json").catch(console.log); // Error: 404

// class HttpError extends Error {
//   constructor(response) {
//     super(`${response.status} for ${response.url}`);
//     this.name = "HttpError";
//     this.response = response;
//   }
// }

// async function loadJson(url) {
//   const response = await fetch(url);
//   if (response.status == 200) {
//     return await response.json();
//   }
//   throw new HttpError(response);
// }

// // 询问用户名，直到 github 返回一个合法的用户
// async function demoGithubUser() {
//   let user;
//   while (true) {
//     let name = prompt("Enter a name?", "iliakan");

//     try {
//       user = await loadJson(`https://api.github.com/users/${name}`);
//       alert(`Full name: ${user.name}.`);
//       return user;
//     } catch (err) {
//       if (err instanceof HttpError && err.response.status == 404) {
//         alert("No such user, please reenter.");
//       } else {
//         throw err;
//       }
//     }
//   }
// }

// demoGithubUser();

async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ……这里你应该怎么写？
  // 我们需要调用 async wait() 并等待以拿到结果 10
  // 记住，我们不能使用 "await"
  wait().then((res) => {
    let count = res;
    console.log(count + 1);
  });
}

f();
