<template>
	<div id="app">
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss">
	@import '@/style/common.scss';
</style>
