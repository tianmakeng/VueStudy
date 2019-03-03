// main.js 是项目的 JS 入口文件
console.log('ok');

import './css/index.css';
import './css/index.less';
import './css/index.scss';
// 如果要通过路径的形式去引入 node_modules 中相关的文件，可以直接省略路径前面的 node_modules 这一层目录，直接写包的名称，然后后面跟上具体的文件路径
// 不写 node_modules 这一层目录，默认就回去 node_modules 中查找
import 'bootstrap/dist/css/bootstrap.css';

// class 关键字是 ES6 中提供的新语法，用来实现 ES6 中面向对象编程的方式
class Person {
    // 使用 static 关键字可以定义静态属性
    // 所谓的静态属性就是可以通过类名直接访问的属性
    // 实例属性：只能通过类的实例来访问的属性，叫做实例属性
    static info = { name: 'zs', age: 20 }
};

// java c# 实现面向对象的方式完全一样了, class 是从后端语言中借鉴过来的，来实现面向对象
// const p1 = new Person();

// 访问 Person 类身上的 info 属性
console.log(Person.info);
// 在 webpack 中，默认只能处理一部分 ES6 的新语法，一些更高级的 ES6或 ES7语法，webpack 是处理不了的，这时候就需要借助于第三方的 loader 来帮助 webpack 处理这些高级的语法，当第三方 loader 把高级语法转为低级的语法之后，会把结果交给 webpack 去打包到 bundle.js 中

// 通过 Babel 可以帮我们将高级的语法转换为低级的语法
// 在 webpack 中，可以运行如下两套命令去安装 Babel 相关的 loader 功能；
// 1.npm install babel-core babel-loader@7 babel-plugin-transform-runtime --save-dev
// 2.npm install babel-preset-env babel-preset-stage-0 --save-dev

// 打开 webpack 的配置文件，在module 节点下的 rules 数组中添加一个新的匹配规则
// { test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
// 注意：在配置 babel 的 loader 规则的时候，必须把 node_modules 目录通过 exclude 选项排除掉，原因有俩
// 如果不排除 node_modules ，这 babel 会把 node_modules 中所有的第三方 JS 文件都打包编译，这样会非常消耗 CPU ，同时打包速度非常慢；
// 哪怕最终 babel 把所有 node_modules 中的 JS 转换完毕了，项目也无法正常运行

// 在项目的根目录中新建一个叫做 .babelrc 的 babel 配置文件，这个配置文件属于 JSON 格式，所以在写 .babelrc 配置的时候必须符合 JSON 语法规范：不能写注释 字符串必须用双引号
// 在 .babelrc 写如下的配置: 大家可以把 preset 翻译成 【语法】 的意思
// {
//     "presets":["env","stage-0"],
//     "plugins":["transform-runtime"]
// }

// 了解：babel-preset-env 是比较新的 ES 语法，之前的版本是 babel-preset-es2015 ，现在出了一个最新的语法插件，叫 @babel/preset-env ，它包含了所有的和 es**** 相关的语法