<!-- 定义公用的头部组件 -->
<template lang="html">
	<div>
<el-menu
  :default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#515a6e"
  text-color="#fff"
  active-text-color="#ffd04b" router>
	<el-menu-item index="/">网站主页</el-menu-item><!-- 注意el-menu标签打开router属性，将default-active绑定为$route.path -->
  <el-menu-item index="/movieList">全部电影</el-menu-item>
  <el-menu-item index="/sendEmail">站内信</el-menu-item>
  <user-message></user-message>
		
</el-menu>
</div>


<!-- 	<Menu mode="horizontal" theme='dark' active-name="1">
		<router-link to="/">
			<MenuItem name='1'>
				<Icon type="ios-papaer"></Icon>
					主页
			</MenuItem>
		</router-link>
		<router-link to="/movieList">
			<MenuItem name="2">
				<Icon type="md-videocam" size="18"/>
					电影
			</MenuItem>
		</router-link>
		<div class="userMessage">
		<user-message></user-message>
		</div>
	</Menu> -->
</template>

<script type="text/javascript">
//用户模块组件
import UserMessage from '../components/UserMessage'
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
	components:{
		UserMessage
	},
	mounted(){

	}
}

</script>

</style>






