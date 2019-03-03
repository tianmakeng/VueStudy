// 入口文件
import Vue from 'vue';
// 导入 App 根组件
import app from './App.vue';
// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// 导入 mint ui 组件
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
// 导入 mui 的样式表
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
// 导入路由的包
import VueRouter from 'vue-router';
// 导入自己的 router.js 模块
import router from './router.js';
// 导入 vue-resource
import VueResource from 'vue-resource';
// 导入格式化时间的插件
import moment from 'moment';
// 导入图片预览插件
import VuePreview from 'vue-preview';
// 导入 vuex
import Vuex from 'vuex';

// 安装路由
Vue.use(VueRouter);
// 安装 vuex
Vue.use(Vuex);
// 安装 vue-resource
Vue.use(VueResource);
// 安装懒加载插件
// Vue.use(Lazyload);
// 安装 mint ui
Vue.use(MintUI);
// 安装图片预览插件
Vue.use(VuePreview);
// Vue.use(preview, {
//     mainClass: 'pswp--minimal--dark',
//     barsSize: { top: 0, bottom: 0 },
//     captionEl: false,
//     fullscreenEl: false,
//     shareEl: false,
//     bgOpacity: 0.85,
//     tapToClose: true,
//     tapToToggleControls: false
// });

// 每次刚进入网站肯定会调用 main.js ，在刚调用的时候先从本地存储中把购物车的数据读出来，放到 store 中
let car = JSON.parse(localStorage.getItem('car' || '[]'));

// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式的组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 定义全局的过滤器
Vue.filter('dataFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
})

// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

const store = new Vuex.Store({
    state: {
        // this.$store.state.***
        // 将购物车中的商品数据用一个数组存储起来,在 car 数组中,存储一些商品的对象,我们可以暂时将这个商品对象,设计成这个样子 
        // { id: 商品的id, count: 要购买的数量, price: 商品的单价, selected: false }
        car: car
    },
    mutations: {
        // this.$store.commit('方法的名称','按需传递唯一的参数')
        addToCar(state, goodsInfo) {
            // 点击加入购物车,把商品信息保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
            // 2. 如果没有则直接把商品数据 push 到 car 中即可

            // 假设在购物车中没有找到对应的商品
            let flag = false;

            state.car.some(item => {
                if (item.id == goodsInfo.id) {
                    item.count += parseInt(goodsInfo.count);
                    flag = true;
                    return true;
                }
            });

            // 如果最终循环完毕，得到的 flag 还是 false ，则把商品数据直接 push 到购物车中
            if (!flag) {
                state.car.push(goodsInfo);
            };

            // 当更新 car 之后，把 car 数组存储到 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsInfo(state, goodsInfo) {
            // 修改购物车中商品的数量值
            // 分析：
            state.car.some(item => {
                if (item.id == goodsInfo.id) {
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            });

            // 当更新完商品的数量之后，把最新的购物车数据存储到 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFormCar(state, id) {
            // 根据 id 从 store 中的购物车里删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            });

            // 当删除完毕后的最新的购物车数据存储到 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                }
            });

            // 把最新的购物车商品状态存储到 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: {
        // this.$store.getters.***
        // 相当于计算属性也相当于 filters
        getAllCount(state) {
            let c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state) {
            let o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            });
            return o;
        },
        getGoodsSelected(state) {
            let o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            });
            return o;
        },
        getGoodsCountAndAmount(state) {
            let o = {
                // 勾选的数量
                count: 0,
                // 勾选的总价
                amount: 0
            };

            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                };
            });

            return o;
        }
    }
})

const vm = new Vue({
    el: '#app',
    data() {
        return {

        }
    },
    render: c => c(app),
    // 挂载路由对象到 VM 实例上
    router,
    // 挂载 store 状态管理对象
    store
})