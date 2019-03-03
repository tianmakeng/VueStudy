<template>
<!-- 问题：我们不知道什么时候能够拿到 max 值，但是总归有一颗会得到一个真正的 max 值 -->
<!-- 我们可以使用 watch 属性监听父组件传递过来的 max 值，不管 watch 会被触发几次，但最后一次肯定是一个合法的 max 数值 -->
    <div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
    <!-- 分析：子组件什么时候把数据传递给父组件 -->
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js';

export default {
    mounted(){
        // 初始化数字选择框组件
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged(){
            // 每当文本框的数据被修改的时候立即把最新的数据通过事件电泳传递给父组件
            // console.log(this.$refs.numbox.value)
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
    },
    props:['max'],
    watch:{
        // 属性监听
        max:function(newVal,oldVal){
            mui('.mui-numbox').numbox().setOption('max',newVal);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

