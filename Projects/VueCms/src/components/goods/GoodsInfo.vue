<template>
    <div class="goodsInfo-container">

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<!-- 轮播图区域 -->
                    <swiper :swipeList="swipeList" :isfull="false"></swiper>
				</div>
			</div>
		</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
			<div class="mui-card-header">{{ goodsInfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
                        市场价：<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 分析：如何实现加入购物车的时候拿到选择的数量 -->
                        <!-- 1. 经过分析发现：按钮属于 goodsinfo 页面，数组属于 numberbox 组件 -->
                        <!-- 2. 由于涉及到了父子组件的嵌套，所以无法直接在 goodsinfo 页面中获取到选中的商品数量值 -->
                        <!-- 3. 怎么解决这个问题：涉及到了子组件向父组件传值(事件调用机制) -->
                        <!-- 4. 事件调用的本质：父组件向子组件传递方法，子组件调用这个方法，同时把数据当作参数传递给这个方法 -->
                    </p>
				</div>
			</div>
		</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfo.add_time | dataFormat}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
            </div>
		</div>

    </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue';
// 导入数字选择框组件 
import numbox from '../subcomponents/GoodsInfo_numbox.vue';

export default {
    data() {
        return {
            // 将路由参数对象中的 id 挂载到 data 上方便后期调用
            id:this.$route.params.id,
            // 轮播图的数据
            swipeList:[],
            // 获取到的商品的信息
            goodsInfo:{},
            //控制小球隐藏和显示的标识符
            ballFlag:false,
            // 保存用户选中的商品数量，默认为1
            selectedCount:1
        }
    },
    created() {
        this.getSwipe();
        this.getGoodsInfo();
    },
    methods: {
        getSwipe(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为轮播图组件中只认识 item.img 不认识 item.src
                    result.body.message.forEach(item=>{
                        item.img=item.src;
                    });
                    this.swipeList = result.body.message;
                }
            })
        },
        getGoodsInfo(){
            // 获取商品的信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsInfo = result.body.message[0];
                }
            })
        },
        // 点击使用编程式导航跳转到图文介绍页面
        goDesc(id){
            this.$router.push({
                name:'goodsDesc',
                params:{
                    id
                }
            })
        },
        // 点击跳转到评论页面
        getComment(id){
            this.$router.push({
                name:'goodsComment',
                params:{
                    id
                }
            })
        },
        // 添加到购物车
        addToShopCar(){
            this.ballFlag=!this.ballFlag;

            // { id: 商品的id, count: 要购买的数量, price: 商品的单价, selected: false }
            // 拼接出一个要保存到 store 中 car 数组理的商品信息对象
            const goodsInfo = {
                id:this.id,
                count:this.selectedCount,
                price:this.goodsInfo.sell_price,
                selected:true
            };
            // 调用 store 中的 mutations 来将商品加入购物车 
            this.$store.commit('addToCar',goodsInfo);
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;

            // 小球动画优化思路
            // 1. 先分析导致动画不准确的本质原因：我们把小球最终位移到的位置局限在了某一分辨率下的滚动条未滚动的情况下
            // 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后问题就出现了
            // 3. 因此我们经过分析的到结论：不能把位置的横纵坐标直接写死了，而是应该根据不同情况，动态计算这个坐标值
            // 4. 经过分析得出解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让 Y 值求差，X 值页求差，得到的结果就是横纵坐标要位移的距离
            // 5. 如何获取徽标和小球的位置：domObject.getBoundingClientRect()
            
            // 获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取徽标在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition="all .5s cubic-bezier(.4,-0.3,1,.67)";
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag;
        },
        getSelectedCount(count){
            // 当子组件把选中的数量传递给父组件的时候把选中的值保存到 data 上
            this.selectedCount=count;
            console.log('父组件拿到的数量值为：'+this.selectedCount);
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsInfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: #f00;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #f00;
        position: absolute;
        z-index: 99;
        top: 410px;
        left: 150px;
    }
}
</style>
