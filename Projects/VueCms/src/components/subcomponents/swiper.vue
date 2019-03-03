<template>
    <div>
        <mt-swipe :auto='4000'>
            <!-- 在组件中使用 v-for 循环的话一定要使用 key -->
            <!-- 将来，谁使用此轮播图组件，谁为我们传递 swipeList -->
            <!-- 此时，swipeList 应该是父组件想子组件传值来设置 -->
            <mt-swipe-item v-for="item in swipeList" :key="item.id">
                <img :src="item.img" alt="" :class="{ 'full':isfull }">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 分析：为什么商品评论中的轮播图那么丑： -->
    <!-- 1. 首页中的图片，它的宽和高都是使用了 100%  -->
    <!-- 2. 在商品详情页中，轮播图的图片如果也使用宽高为 100% 的话页面会不好看 -->
    <!-- 3.商品详情也中的轮播图，期望高度是 100% ，但是宽度为 自适应 -->
    <!-- 4. 经过分析，得到问题的原因：首页中的轮播图和详情页中的轮播图分歧点是宽度到底是 100% 还是自适应 -->
    <!-- 5. 既然这两个轮播图其它方面都是没有冲突的只是宽度有分歧，那么我们可以定义一个属性，让轮播图的调用者手动指定宽度是否为 100% -->
</template>

<script>
export default {
    props:['swipeList','isfull']
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        text-align: center;
        img{
            // width: 100%;
            height: 100%;
        }
    }
}

.full{
    width: 100%;
}
</style>
