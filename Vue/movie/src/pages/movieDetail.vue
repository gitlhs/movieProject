<!-- 一个坑，:movie_id="detail[0]._id" -->
<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header>
	</div>

	<div class="contentMain">
        <div class="movie-info">

                <div class="movie-info-right">
                    <h1>{{detail[0].movieName}}</h1>
                    风格：剧情/悬疑/奇幻<br>
                    地区：美国/英国<br>
                    上映时间：2011-08-04<br>
                    出演：丹尼尔·雷德克里夫 艾玛·沃森 鲁伯特·格林特 海伦娜·伯翰·卡特 拉尔夫·费因斯 艾伦·瑞克曼 玛吉·史密斯 汤姆·费尔顿 邦妮·怀特 朱丽·沃特斯 迈克尔·刚本 伊文娜·林奇 多姆纳尔·格里森 克蕾曼丝·波西 詹森·艾萨克 海伦·麦克洛瑞 马修·刘易斯 梁佩诗 约翰·赫特 大卫·休里斯 加里·奥德曼 吉姆·布劳德本特 艾玛·汤普森 娜塔丽·特纳 蒂莫西·斯波 大卫·布拉德利 罗彼·考特拉尼 凯莉·麦克唐纳 塞伦·希德<br>
                    简介：当又一次和伏地魔（拉尔夫·费因斯 Ralph Fiennes 饰）的意识连通，哈利·波特（丹尼尔·雷德克里夫 Daniel Radcliffe 饰）断定最后一件魂器藏在霍格沃茨，于是和罗恩（鲁伯特·格林特 Rupert Grint 饰）、赫敏（艾玛·沃森 Emma Watson 饰）一同返回阴云密布的学校。在好友们的帮助下，他们成...    
                </div>
                <div class="movie-info-left">
                        <img class="headerImg" :src="detail[0].movieImg">
                </div>
        </div>
        <div class="movie-tools">
            <div class="btnPosition">
                <button v-on:click="movieDownload()" class="btn"><a>点击下载</a></button>
            </div>
            <div v-on:click="support()" class="btnPosition2">
                <h2 style="margin:16px 20px">
                    👍<a>点赞</a>
                </h2>
            </div>
            <h2 class="viewNum">
                下载次数：<span class="middle-font-size">{{detail[0].movieNumDownload}}</span>&nbsp&nbsp
                点赞数为：<span class="middle-font-size">{{detail[0].movieNumSuppose}}</span>
            </h2>
             <el-divider></el-divider>
            <div class="commentMain">
                <div class="comment">
                    网友评论：
                    <br>
                    <br>
                    <comment :movie_id="detail[0]._id"></comment>
                </div>
            </div>
            
               

        </div>

                
    </div>



<!-- 		<div>
			<common-footer></common-footer>
		</div> -->
</div>

</template>

<script type="text/javascript">
	import axios from 'axios'
	import MovieIndexHeader from '../components/MovieIndexHeader'
	import CommonFooter from '../components/CommonFooter'
	import Comment from '../components/Comment'

	export default {
		name:'MovieDetail',
		data(){
			return{
				detail:[],

			}
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			Comment
		},
		created(){
			//初始化后,将路由传过来的电影id封装起来，用来获取此电影内容
			this.movie_id=this.$route.query.id
			let movie_id=this.$route.query.id
			axios.post('/movie/detail',{movie_id:this.movie_id}).then((data)=>{
            //左边的movie_id是request参数，右边的为本组件的数据源
				this.detail=data.data.data;
                console.log(this.detail)
			})

		},
		methods:{
			//点赞
			support:function(event){
				this.axios.post('/users/support',{movie_id:this.movie_id})
				.then((data1)=>{
					let data_temp=data1.data
					let that=this

					if(data_temp.status===0){ //即点赞请求成功了
                        //在单击点赞按钮且请求成功后将原本的点赞数据+1
						this.axios.post('/movie/showNumber',{movie_id:this.movie_id})
						.then((data2)=>{
							that.detail[0].movieNumSuppose=data2.data.data

						}) 
					}else{
						alert(data_temp.message)
					}
				})
			},
			//电影下载
			movieDownload:function(event){
			axios.post('/users/download', {
			    movie_id: this.movie_id  
			  })
			  .then((res)=>{

			    if(res.status==1){
			    	alert(res.message)
			    }else{
                    alert('下载地址：'+res.data.data)
                    // axios.post('http://localhost:3000/movie/showDownloadNumber',{movie_id:this.movie_id})
                    //     .then((data3)=>{
                    //         console.log(data3.body.data)
                    //         that.detail[0].movieNumDownload=data3.body.data
                    //     })

			    	//跳转至下载链接
			    	// window.location = response.data;
			    }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
			}
		},
	}
</script>

<style type="text/css" scoped>
.commentMain{
    min-height: 500px;
}
.movie-info{
    width: 1160px;
    height: 200px;
    margin:0 auto;

}

.movie-info-left{
    float: left;
}
.movie-info-right{
    float: right;
    margin-left: -135px;
    width: 1160px;

    padding-left: 150px;
}
.movie-tools{
    width: 1160px;
    height: 200px;
    margin:15px auto;

}
.headerImg{
    float: left;
    width: 135px;
    height: 200px;
    border-radius: 6px;
}
h1{
    font-size: 35px;
}
h2{
    font-size: 18px;
}
.middle-font-size{
    font-size: 35px;
}
.btnPosition{
    float: right;
    margin-top: 12px;
}
.btnPosition2{
    float: right;
}
.contentMain{
	min-height: 600px;
    margin-top: 20px;
    margin-left: 20px;
}
.btn{
    margin:16   px 20px;
    color: rgb(127, 187, 255);

    display: inline-block;

    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid grow;
    border-radius: 4px;
    outline: none;
}
  .btn:hover{
    background-color: #e6e6e6;
    /*重要，鼠标移上去变灰色*/
    border-color: #adadad;
  }
  .btn:active{
   -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125); 
    /*重要，点击后产生凹陷阴影  */
  }
  .el-divider--horizontal{
    margin:5px 0 20px 0;
  }
</style>