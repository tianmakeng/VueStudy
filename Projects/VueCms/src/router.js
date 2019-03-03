// 导入 vue-router 包
import VueRouter from 'vue-router';
// 导入对应的路由组件
import Home from './components/tabber/Home.vue';
import Member from './components/tabber/Member.vue';
import Shopcar from './components/tabber/Shopcar.vue';
import Search from './components/tabber/Search.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// 创建路由对象
const router = new VueRouter({
    // 匹配路由规则的
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/home/newsList', component: NewsList },
        { path: '/home/newsInfo/:id', component: NewsInfo },
        { path: '/home/photoList', component: PhotoList },
        { path: '/home/photoInfo/:id', component: PhotoInfo },
        { path: '/home/goodsList', component: GoodsList },
        { path: '/home/goodsInfo/:id', component: GoodsInfo, name: 'goodsInfo' },
        { path: '/home/goodsDesc/:id', component: GoodsDesc, name: 'goodsDesc' },
        { path: '/home/goodsComment/:id', component: GoodsComment, name: 'goodsComment' },
        { path: '/member', component: Member },
        { path: '/shopcar', component: Shopcar },
        { path: '/search', component: Search },
    ],
    // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
    linkActiveClass: 'mui-active',
});

// 把路由对象暴露出去
export default router;