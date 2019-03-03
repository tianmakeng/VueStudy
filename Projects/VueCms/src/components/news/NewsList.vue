<template>
    <div>
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsInfo/'+ item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h5>{{item.title}}</h5>
						<p class='mui-ellipsis'>
                            <span>发表事件：{{item.add_time | dataFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
					</div>
				</router-link>
			</li>
		</ul>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';

export default {
    data() {
        return {
            // 新闻列表
            newsList:[]
        }
    },
    created(){
        this.getNewsList();
    },
    methods: {
        // 获取新闻列表
        getNewsList(){
            this.$http.get('api/getnewslist').then(result=>{
                if(result.body.status === 0){
                    // 如果没有失败，应该把数据保存到 data 上
                    this.newsList = result.body.message;
                }else{
                    Toast('获取新闻列表失败');
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    h5{
        font-size: 14px;
        color: #000;
    }
    .mui-ellipsis{
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
}
</style>
