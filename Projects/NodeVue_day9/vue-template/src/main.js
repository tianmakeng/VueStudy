// 入口文件
console.log('ok');

import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue';

const vm = new Vue({
    el: '#app',
    render: c => c(App)
});