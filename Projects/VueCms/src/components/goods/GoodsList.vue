<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsInfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>{{item.stock_quantity}}</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中，有两种跳转方式 -->
        <!-- 1. 使用 a 标签的形式叫做 标签跳转 -->
        <!-- 2. 使用 window,location.href 的形式叫做 编程式导航 -->
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetai(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>{{item.stock_quantity}}</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 分页的页数
            pageIndex:1,
            // 存放商品列表的数组
            goodsList:[]
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status===0){
                    // this.goodsList=result.body.message;
                    this.goodsList=this.goodsList.concat(result.body.message);
                };
            });
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsList();
        },
        // 使用 js 的形式进行路由导航
        goDetai(id){
            // 注意：一定要区分 this.$route 和 this.$router 这两个对象的区别
            // this.$route 是路由参数对象，所有路由中的参数、params、query 都属于它
            // this.$router 是路由导航对象，用它可以方便的使用 JS 代码实现路由的前进、后退、跳转到新的 URL 地址 

            // 1.最简单的
            // this.$router.push('/home/goodsInfo/'+id);
            // 2.传递对象
            // this.$router.push({path:'/home/goodsInfo/'+id});
            // 3.命名的路由
            this.$router.push({name:"goodsInfo",params:{id}});

        }
    },
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 300px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }
                .price{
                    .now{
                        color: #ff0000;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
