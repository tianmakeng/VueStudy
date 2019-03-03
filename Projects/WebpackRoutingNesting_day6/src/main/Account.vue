<template>
    <div>
        <h1>这是 Account 组件</h1>

        <router-link to="/account/login">login</router-link>
        <router-link to="/account/register">register</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
/* 普通的 style 标签只支持普通的样式，如果想要启用 scss 或 less ，需要为 style 元素设置 lang 属性 */
// 只要 style 标签是在 .vue 组件中定义的，那么都推荐为 style 开启 scoped 属性
body{
    div{
        color:blue;
    }
}
</style>

