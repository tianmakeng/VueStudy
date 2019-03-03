// main.js 是项目的 JS 入口文件

// 1.导入 Jquery
// import *** from *** 是 ES6 中导入模块的方式
// 由于 ES6 的代码太高级了，浏览器解析不了，所以这一行执行代码会报错
import $ from 'jquery';
// const $ = require('jquery');

// 使用 import 语法，导入 css 样式表
// 注意：webpack 默认只能打包处理 JS 类型文件，无法处理其他的非 JS 文件
// 如果需要处理非 JS 类型的文件，需要手动安装一些适合第三方 loader 加载器
// 如果想要打包处理 css 文件，需要安装 npm install style-loader css-loader --save-dev
// 打开 webpack.gonfig.js 这个配置文件，在里面新增一个配置节点，叫做 module，它是一个对象，在这个 module 对象身上有个 rules 属性，这个 rules 属性是个数组，这个数组中存放了所有第三方文件的匹配和处理规则
import css from './css/index.css';
import less from './css/index.less';
import scss from './css/index.scss';

$(function() {
    $('li:odd').css('backgroundColor', 'red');
    $('li:even').css('backgroundColor', function() {
        return '#' + 'd97634';
    });
})

// 经过刚才的演示， webpack 可以做什么事情
// 1.webpack 能够处理 JS 文件的互相依赖关系
// 2.webpack 能够处理 js 的兼容问题，把高级的、浏览器不识别的语法转为低级的浏览器能正常识别的语法

// 刚才运行的命令格式：webpack 要打包文件的路径 -o 打包好的输出文件的路径

// 使用 webpack-dev-server 这个工具实现自动打包编译的功能
// 1.运行 npm install webpack-dev-server --save-dev 把这个工具安装到项目的本地开发依赖
// 2.安装完毕后，这个工具的用法和 webpack 命令的用法完全一样
// 3.由于是在项目中本地安装的 webpack-dev-server，所以无法把它当作脚本命令在 powershell 终端中直接运行，只有那些安装到全局 -g 的工具才能在终端中正常运行
// 4.注意：webpack-dev-server 这个工具，如果想要正常运行，要求在本地项目中必须安装 webpack
// 5.webpack-dev-server 帮我们打包生成的 bundle.js 文件并没有存放到实际的物理磁盘上而是直接托管到了电脑的内存中，所以我们在项目根目录中根本找不到这个打包好的 bundle.js
// 6.我们可以认为，webpack-dev-server 把打包好的文件以一种虚拟的形式托管到了咱们项目的根目录中，虽然看不到它，但是可以认为和 dist src node_modules 平级，有一个看不见的文件叫 bundle.js

// 注意：webpack 处理第三方文件类型的过程：
// 1.发现这个要处理的文件不是 JS 文件，然后就去配置文件中查找有没有对应的第三方 loader 规则
// 2.如果能找到对象的规则，就会调用对应的 loader 处理这种文件类型
// 3.在调用 loader 的时候是从后往前调用的
// 4.当最后的一个 loader 调用完毕会把处理的结果直接交给 webpack 进行打包合并，最终输出到 bundle.js 中去