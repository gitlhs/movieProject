<!-- [HMR] Waiting for update signal from WDS... -->

<template lang="html">
<div class="container">
	<div>
		<header></header>
	</div>
	<div class="userMessage">
		<user-message></user-message>
	</div>
	<label>收件箱</label>
	<div>
		<email-list></email-list>
	</div>
	<label>发件箱</label>
	<div>
		<email-list></email-list>
	</div>
	<send-talk-box></send-talk-box>
		<common-footer></common-footer>
</div>
</template>

<script>
//header组件
import MovieIndexHeader from '../components/MovieIndexHeader'
//footer组件
import CommonFooter from '../components/CommonFooter'
import UserMessage from '../components/UserMessage'
import EmailList from '../components/EmailList'
import SendTalkBox from '../components/SendTalkBox'
//推荐电影列表组件
import MoviesList from '../components/MoviesList'

export default {
	data(){

	},
	components:{
		MovieIndexHeader,
		CommonFooter,
		UserMessage,
		EmailList,
		SendTalkBox
	},
}
</script>

<style lang="css" scoped>
.box {

}
.container {

}
.userMessage{

}
</style>











