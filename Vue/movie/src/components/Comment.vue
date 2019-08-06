<template lang="html">
<div>
<label>评论</label>
<hr>
<div>
	<li v-for="item in items"></li>
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

	export default {
		data(){
			return{

			}
		}
	}
</script>

<style type="text/css" scoped>

</style>