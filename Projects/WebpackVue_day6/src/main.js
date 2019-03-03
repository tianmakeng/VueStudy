// main.js 是项目的 JS 入口文件
console.log('ok');

// 如何在 webpack 构建的项目中使用 Vue 进行开发

// 复习,在普通网页中如何使用 vue：
// 1.使用 script 标签引入 vue 包
// 2.在 index 页面中创建一个 id 为 app 的 div 容器
// 3.通过 new Vue 得到一个 vm 的实例

// 在 webpack 中尝试使用 Vue:
// 注意:在 webpack 中,使用 import vue from 'vue' 导入的 Vue 构造函数,功能不完整,只提供了 runtime-only 的方式,并没有提供像网页中那样的使用方式
import Vue from 'vue';
// import Vue from '../node_modules/vue/dist/vue.js'

// 回顾 包的查找规则:
// 1.找项目艮目录中有没有 node_modules 的文件夹
// 2.在 node_modules 中根据包名查找对应的 vue 文件夹
// 3.在 vue 文件夹中找一个叫 package.json 的包配置文件
// 4.在 package.json 文件夹中查找一个 main 属性【 main 属性指定了这个包在被加载时候的入口文件】

// var login = {
//     template: '<h1>login</h1>'
// }

// 导入 login 组件
import login from './login.vue';
// 默认 webpack 无法打包 .vue 文件，需要安装相关的 loader
// npm install vue-loader vue-template-compiler --save-dev
// 在配置文件中，新增配置 loader 配置对象
// { test:/\.vue$/,use:'vue-loader' }

var vm = new Vue({
    el: '#app',
    data: {
        msg: '123'
    },
    // components: {
    //     login,
    // },
    // render: function(createElements) {
    //     // 在 webpack 中，如果想要通过 Vue 把一个组件放到页面中去展示，vm 实例中的 render 函数可以实现
    //     return createElements(login);
    // }，
    render: c => c(login),
})

// 总结梳理：webpack 中如何使用 Vue
// 1.安装 Vue 的包：
// npm install vue --save-dev
// 2.由于在 webpack 中推荐使用 .vue 这个组件模板文件定义组件，所以需要安装能解析这种文件的 loader ：
// npm install vue-loader vue-template-compiler --save-dev
// 3.在 main.js 中导入 vue 模块 impo Vue from 'vue
// 4.定义一个 .vue 结尾的组件，其中，组件有三部分组成：
// template script style
// 5.使用 import login from './login.vue' 导入这个组件
// 6.使用 vm 的实例 var vm = new Vue({el:'#app',render: c => c(login) })
// 7.在页面中创建一个 id 为 app 的 div 元素，作为我们 vm 实例要控制的区域；

import m1, { title } from './test.js';
console.log(m1);
console.log(title);
console.log(content);