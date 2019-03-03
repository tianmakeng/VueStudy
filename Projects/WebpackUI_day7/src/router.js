// 导入 vue-router 包
import VueRouter from 'vue-router';
// 导入 account 组件
import account from './main/Account.vue';
// 导入 goodslist 组件
import goodslist from './main/GoodsList.vue';
// 导入 login 子组件
import login from './subcom/Login.vue';
// 导入 register 子组件
import register from './subcom/Register.vue';


// 创建路由对象
var router = new VueRouter({
    routes: [
        // account goodslist
        {
            path: '/account',
            component: account,
            children: [{
                    path: 'login',
                    component: login
                },
                {
                    path: 'register',
                    component: register
                }
            ]
        },
        {
            path: '/goodslist',
            component: goodslist
        }
    ]
});

export default router;