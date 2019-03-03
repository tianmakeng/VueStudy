<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="( item, i ) in comments" :key="i">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'undefined' ? '此用户并没有评论' : item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast} from 'mint-ui';

export default {
    data() {
        return {
            // 默认展示第一页的数据
            pageIndex:1,
            // 所有的评论数据
            comments:[],
            // 评论输入的内容
            msg:''
        }
    },
    created(){
        this.getComment();
    },
    methods: {
        // 获取评论
        getComment(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    // this.comments = result.body.message;
                    // 每当获取新评论诗句的时候不要把老数据清空覆盖，而是应该以老数据拼接上新数据
                    this.comments = this.comments.concat(result.body.message);

                }else{
                    Toast('获取评论失败');
                }
            });
        },
        // 加载更多
        getMore(){
            this.pageIndex++;
            this.getComment();
        },
        // 发表评论
        postComment(){
            // 校验是否为空
            if(this.msg.trim().length === 0){
                return Toast('评论内容不能为空');
            };
            
            // 参数1：请求的 URL 地址
            // 参数2：提交给服务器的数据对象 { content:this.msg }
            // 参数3：定义提交时候表单中数据的格式 { emulateJSON:true } 
            this.$http.post('api/postcomment/'+this.id,{ 
                content: this.msg.trim()
                 })
                .then(result=>{
                    if(result.body.status === 0){
                        // 1.拼接出一个评论对象
                        const cmt = {
                            user_name:'匿名用户',
                            add_time:Date.now(),
                            content:this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg='';
                    };
                })
        }
    },
    props:['id']
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                line-height: 40px;
                text-indent: 2em;
            }
        }
    }
}
</style>
