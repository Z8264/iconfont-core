const fs = require('fs');

// ..
// const start = new Date();
// for (let i = 0; i < 100000; i += 1) {
//   fs.readFileSync('test/svg/i.svg');
// }
// const end = new Date();
// console.log(end - start);


// ..
// const start = new Date();
// const promises = [];
// for (let i = 0; i < 10000; i += 1) {
//   promises.push(new Promise((resolve) => {
//     const res = fs.readFileSync('test/svg/i.svg');
//     resolve(res);
//   }));
// }
// Promise.all(promises).then(() => {
//   const end = new Date();
//   console.log(end - start);
// });

// ..
const start = new Date();
const promises = [];
for (let i = 0; i < 100000; i += 1) {
  promises.push(new Promise((resolve) => {
    fs.readFile('test/svg/i.svg', (error, res) => {
      resolve(res);
    });
  }));
}
Promise.all(promises).then(() => {
  const end = new Date();
  console.log(end - start);
});
