import Vue from 'vue';
// 导入 vue-router 包
import VueRouter from 'vue-router';
// 导入 app 组件
import app from './App.vue';
// 导入自定义路由模块
import router from './router.js';
// 导入 mint ui 的所有组件
// import MintUI from 'mint-ui';
// 这里可以省略 node_modules 这一层目录
// import 'mint-ui/lib/style.css';
// 导入 bootstrap 样式
import 'bootstrap/dist/css/bootstrap.css';
// 按需导入 mint-ui 组件
import { Button } from 'mint-ui';
// 导入 css 文件
import './css/app.css';
// 导入 mui 的样式表 和 bootstrap 用法没有差别
import './lib/mui/css/mui.min.css';

// 将 mint ui 安装到 Vue 中，并把所有的组件注册为全局的组件
// Vue.use(MintUI);

// 使用 vue.component 注册按钮组件
Vue.component(Button.name, Button);
Vue.component('btn', Button);

// 手动安装 VueRouter
Vue.use(VueRouter);

var vm = new Vue({
    el: '#app',
    // render 会把 el 指定的容器中所有的内容都清空覆盖,所以不要吧路由的 router-view router-link 直接写道 el 所控制的元素中
    render: c => c(app),
    // 将路由对象挂载到 vm 上
    router,
});

// 注意: App 这个组件是通过 vm 实例的 render 函数渲染出来的, render 函数如果要渲染组件,渲染出来的组件只能放到 el:'#app' 所指定的元素中
// Account 和 GoodsList 组件是通过路由匹配规则监听到的,所以这两个组件只能展示到属于路由的 <router-view></router-view> 中去