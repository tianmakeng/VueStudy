<template>
    <div>
        <h1>login---{{msg}}</h1>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:'123'
        };
    },
    methods:{
        show(){
            console.log('调用了 login.vue 中的 show 方法');
        }
    }
}
</script>

<style>

</style>
