<template>
    <div class="photoInfo-container">
        <h3>{{photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoInfo.add_time | dataFormat}}</span>
            <span>点击：{{photoInfo.click}}次</span>
        </p>
        <hr>

        <!-- 缩略图区 -->
        <vue-preview :slides="list" @close="handleClose"></vue-preview>

        <!-- 图片内容区 -->
        <div class="content" v-html="photoInfo.content"></div>

        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
// 导入评论子组件
import comment from '../subcomponents/comment.vue';

export default {
    data() {
        return {
            // 从路由中获取的图片 id
            id:this.$route.params.id,
            // 图片详情
            photoInfo:{},
            // 缩略图数据
            list:[]
        }
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.photoInfo=result.body.message[0];
                }
            });
        },
        getThumbs(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    // 循环每个图片的数据补全图片的宽和高
                    result.body.message.forEach(item => {
                        item.w=600;
                        item.h=400;
                        item.msrc=item.src;
                        item.alt='picture';
                        item.title='Image Caption';
                    });
                    // 把完整的数据保存到 list 中
                    this.list=result.body.message;
                }
            });
        },
        handleClose () {
            console.log('close event');
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>

<style lang="scss" scoped>
.photoInfo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>
