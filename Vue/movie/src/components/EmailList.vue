<!-- 站内信发送组件 -->
<template lang="html">
	<div class="message">
		<div>标题：{{title}}</div>
		<div>来源用户：{{fromUser}}</div>
		<div>信件内容：{{context}}</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:['title','fromUser','context']
	}
</script>

<style type="text/css" scoped>

</style>