<template>
	<div>
		<div v-for="(item, key) in items">
			<img :src="item.href" v-if="currentIndex == key" />
		</div>

		<div @click="next()">Next picture</div>
		<div @click="prev()">Previous picture</div>
	</div>
</template>
<script>
	export default {
		props: {
			items: {
				type: Array,
				default() {
					return [];
				},
			},

			index: {
				type: Number,
			},
		},

		data() {
			return {
				currentIndex: this.index,
			}
		},

		mounted() {

		},

		methods: {
			prev() {
				this.currentIndex--;
			},

			next() {
				this.currentIndex++;
			}
		}
	}
</script>