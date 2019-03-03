<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
						{{item.title}}
					</a>
				</div>
			</div>
		</div>
		<!-- 图片列表区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div class="info-body">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
    </div>
</template>

<script>
// 导入 mui 的 js 文件
import mui from '../../lib/mui/js/mui.min.js';

export default {
    data() {
        return {
			// 所有分类的列表数组
			cates:[],
			// 图片列表的数组
			list:[]
        }
	},
	created() {
		this.getAllCategory();
		// 默认进入页面就主动请求所有图片列表的数据
		this.getPhotoListByCateId(0);
	},
    // 当组件中的 DOM 结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素，最好在 mounted 里面，因为这个时候的 DOM 元素是最新的
    mounted() {
        // 初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值 0.0006
            deceleration: 0.0005
        });

    },
    methods: {
        getAllCategory(){
			this.$http.get('api/getimgcategory').then(result=>{
				if(result.body.status===0){
					// 手动拼接出一个最完整的分类列表
					result.body.message.unshift({title:'全部',id:0});
					this.cates=result.body.message;
				}else{

				}
			})
		},
		// 根据分类 id 获取图片列表
		getPhotoListByCateId(cateId){
			this.$http.get('api/getimages/'+cateId).then(result=>{
				if(result.body.status===0){
					this.list = result.body.message;
				}
			})
		}
    },
}
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}
.photo-list{
	list-style: none;
	margin: 0;
	padding: 0 10px 0 10px;
	li{
		background-color: #ccc;
		text-align: center;
		margin: 10px 0;
		box-shadow: 0 0 9px #999;
		position: relative;
		img{
			width: 100%;
			vertical-align: middle;
		}
		img[lazy="loading"]{
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			color: #fff;
			text-align: left;
			position: absolute;
			bottom: 0;
			background-color: rgba(0,0,0,0.4);
			max-height: 84px;
			.info-title{
				font-size: 14px;
			}
			.info-body{
				font-size: 13px;
			}
		}
	}
}
</style>

