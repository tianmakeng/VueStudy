<template>
    <div>
        <h1>这是 APP 组件</h1>

        <!-- 为什么这里叫做 mt-button 的 button 直接就能用 -->
        <mt-button type="default" icon="back" @click="show">default</mt-button>
        <mt-button type="default">default</mt-button>
        <mt-button type="danger" plain>default</mt-button>
        <mt-button type="default" size="large">default</mt-button>
        <mt-button type="danger" size="small" disabled>default</mt-button>

        <btn type="primary">12345</btn>

        <button type="button" class="mui-btn mui-btn-royal">紫色</button>

        <router-link to="/account">Account</router-link>
        <router-link to="/goodslist">GoodsList</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            instance:null
        };
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            // 模拟获取列表的一个 Ajax 方法
            // 在获取数据之前立即弹出 Toast 提示用户正在加载数据
            this.show();
            setTimeout(() => {
                // 当3秒过后数据获取回来了，要把 Toast 移除
                this.instance.close();
            }, 3000);
        },
        show(){
           this.instance = Toast({
                message:'提示信息',
                duration:-1,
                iconClass:'glyphicon glyphicon-map-marker',
                className:'eee'
            });
        }
    }
}
</script>

<style>
    .ccc{
        color: #ccc;
    }
</style>

