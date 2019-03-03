// 在 Node 中使用 var 名称 = require('模块标识符') 导入成员
// module.exports 和 export 来暴露成员
// 这是 Node 中向外暴露成员的形式
// module.exports = {
// }

// 在 ES6 中，也通过规范的形式规定了 ES6 中如何导入和导出模块
// ES6 中导入模块使用：
// import 模块名称 from '模块标识符'
// import '表示路径'

// 在 ES6 中，使用 export default 和 export 向外暴露成员
// export default 向外暴露的成员可以使用任意的变量来接受
var info = {
    name: 'zs',
    age: 20
};

export default info;

// 注意：在一个模块中 export default 只允许向外暴露一次
// export default {
//     address: 'tokyo'
// }

// 注意：在一个模块中可以同时使用 export default 和 export 向外暴露成员
// 注意：使用 export 向外暴露的成员只能使用 {} 的形式来接受，这种形式叫做 [按需导出]
// 注意：export 可以向外暴露多个成员，同时如果这些成员不需要在 import 导入的时候可以不在 {} 中定义
// 注意：使用 export 导出的成员必须严格按照导出时候的名称来使用 {} 按需接收
// 注意：使用 export 导出的成员，如果就想换个名称来接受，可以使用 as 来起别名
// 例：title as title123
export var title = 'little star'
export var content = 'hhhhhhhh'