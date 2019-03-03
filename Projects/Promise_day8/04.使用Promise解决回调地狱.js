const fs = require('fs');

function getFileByPath(fpath) {
    const promise = new Promise(function(resolve, reject) {
        fs.readFile(fpath, 'utf-8', (err, dataStr) => {
            if (err) return reject(err);
            resolve(dataStr);
        });
    });
    return promise;
}

// 先读取文件1,再读取2,最后读取3
// 注意:通过 .then 指定回调函数的时候成功的回调函数必须传,但是失败的回调可以省略不传
// 这是一个错误的示范,千万不要这么用,硬是把法拉利开成了拖拉机
// getFileByPath('./files/1.txt')
//     .then(function(data) {
//         console.log(data);
//         getFileByPath('./files/2.txt')
//             .then(function(data) {
//                 console.log(data);
//                 getFileByPath('./files/3.txt')
//                     .then(function(data) {
//                         console.log(data);
//                     });
//             });
//     });


// 在上一个 .then 中,返回一个新的 promise 实例,可以继续用下一个 .then 来处理
// 如果前面的 Promise 执行失败,我们不想让后续的 Promise 操作被终止,可以为每个 promise 指定失败的回调

// 读取文件1
// getFileByPath('./files/1.txt')
//     .then(function(data) {
//         console.log(data);

//         // 读取文件2
//         return getFileByPath('./files/2.txt');
//     }, function(err) {
//         console.log('这是失败的结果:' + err.message);
//         // return 一个新的 Promise
//         return getFileByPath('./files/2.txt');
//     })
//     .then(function(data) {
//         console.log(data);

//         // 读取文件3
//         return getFileByPath('./files/3.txt');
//     }, function(err) {
//         console.log('这是失败的结果:' + err.message);
//         // return 一个新的 Promise
//         return getFileByPath('./files/3.txt');
//     })
//     .then(function(data) {
//         console.log(data);
//     }, function(err) {
//         console.log('这是失败的结果:' + err.message);
//     });

// console.log('okokok');

// 当我们有这样的需求,哪怕前面的 Promise 执行失败了,但是,不要影响后续 promise 的正常执行,此时我们可以单独为每个 promise 通过 .then 指定一下失败的回调

// 有时候我们有这样的需求,跟上面的需求正好相反:如果后续的 Promise 执行依赖于前面 Promise 执行的结果,如果前面的失败了,则后面的就没有继续执行下去的意义了,此

// 读取文件1
getFileByPath('./files/1.txt')
    .then(function(data) {
        console.log(data);

        // 读取文件2
        return getFileByPath('./files/22.txt');
    })
    .then(function(data) {
        console.log(data);

        // 读取文件3
        return getFileByPath('./files/3.txt');
    })
    .then(function(data) {
        console.log(data);
    })
    // catch 的作用,如果前面有任何的 Promise 执行失败,则立即终止所有 promise 的执行,并马上进入 catch 去处理 Promise 中抛出的异常
    .catch(function(err) {
        console.log(err.message);
    });