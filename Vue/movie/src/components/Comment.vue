<template lang="html">
<div>
<label>评论:{{item.comtext}}</label>
<div>
	<li v-for="item in items">{{item.username}}</li>
</div>
<div>
	<textarea v-model="context" placeholder="内容"></textarea>
</div>
<div>
	<button v-on:click="send_comment">评论</button>
</div>
</div>

</template>

<script type="text/javascript">
import VueResource from 'vue-resource'
export default {
		props:['movie_id'],
		data(){
			return{
				item:[],
				context:''
			}
		},
		created(){
			this.$http.post('http://localhost:3000/movie/comment',{
				id:this.movie_id
			})
			.then((data)=>{
				if(data.body.status==0){
					this.items=data.body.data
				}else{
					alert('获取失败')
				}
			})
		},
		methods:{
			send_comment(event){
				let send_data;
				if(typeof(localStorage.username)!="undefined"){
					send_data={
						movie_id:this.movie_id,
						context:this.context,
						username:localStorage.username}
					}else{
						send_data={
							movie_id:this.movie_id,
							context:this.context,
						}
					}
					this.$http.post('http://localhost:3000/users/postComment',send_data)
					.then((data)=>{
						alert(data.body.message)
					})
				}
			},
}
	
</script>

<style type="text/css" scoped>

</style>