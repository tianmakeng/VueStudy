<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsInfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsInfo.add_time | dataFormat}}</span>
            <span>点击：{{newsInfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容 -->
        <div class="content" v-html="newsInfo.content"></div>
        <!-- 评论 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue';

export default {
    data() {
        return {
            // 将 URL 地址中传递过来的 ID 值挂载到 data 上方便以后调用
            id:this.$route.params.id,
            // 新闻对象
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status === 0){
                    // 如果没有失败，应该把数据保存到 data 上
                    this.newsInfo = result.body.message[0];
                }else{
                    Toast('获取新闻失败');
                }
            })
        }
    },
    // 注册子组件
    components:{
        'comment-box':comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #226aff;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>


