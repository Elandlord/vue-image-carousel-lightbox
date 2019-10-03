<template>
	<div :id="id">
		<div class="men-carousel-inner">
			<div v-for="(item, key) in items">
				<transition name="fade" mode="out-in">
					<img v-hammer:swipe.horizontal="onSwipe" v-hammer:tap="toggleLightbox" :src="item.href" v-if="currentIndex == key" />
				</transition>
			</div>

			<div class="men-prev-indicator">
				<div @click="prev()"> < </div>
			</div>

			<div class="men-carousel-indicators" v-if="options.showIndicators">
				<div v-for="(item, key) in items" class="men-indicator" @click="setCurrentIndex(key)" :class="currentIndex == key ? 'active' : ''"></div>
			</div>

			<div class="men-next-indicator">
				<div @click="next()"> > </div>
			</div>
		</div>

		<div class="lightbox-wrapper" v-if="lightboxActive">
			<div class="lightbox-content">
				<div v-for="(item, key) in items">
					<transition name="fade" mode="out-in">
						<img v-hammer:swipe.horizontal="onSwipe" v-hammer:tap="toggleLightbox" :src="item.href" v-if="currentIndex == key" />
					</transition>
				</div>

				<div class="men-prev-indicator">
					<div @click="prev()"> < </div>
				</div>

				<div class="men-carousel-indicators" v-if="options.showIndicators">
					<div v-for="(item, key) in items" class="men-indicator" @click="setCurrentIndex(key)" :class="currentIndex == key ? 'active' : ''"></div>
				</div>

				<div class="men-next-indicator">
					<div @click="next()"> > </div>
				</div>
			</div>

			<div @click="toggleLightbox()" class="men-close-indicator" v-if="options.showLightbox && lightboxActive">
				&times;
			</div>
		</div>
	</div>
</template>
<style type="scss" scoped>
	.fade-leave-active {
		opacity: 0;
	}

	.fade-enter-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.men-next-indicator {
		position: absolute;
		top: 50%;
		right: 15px;
		color: white;
		font-size: 40px;
		cursor: pointer;
	}

	.men-prev-indicator {
		position: absolute;
		top: 50%;
		left: 15px;
		color: white;
		font-size: 40px;
		cursor: pointer;
	}

	.men-carousel-indicators {
		position: absolute;
		bottom: 15px;
		left: 50%; /* position the left edge of the element at the middle of the parent */
		transform: translate(-50%, -50%);
	}

	.men-close-indicator {
		cursor: pointer;
		position: absolute;
		right: 50px;
		top: 15px;
		font-size: 50px;
		color: white;
	}

	.men-indicator {
		display: inline-block;
		background: darkgrey;
		width: 15px;
		height: 15px;
		margin: 0 2px 0 2px;
		border-radius: 100%;
		cursor: pointer;
	}

	.active {
		background: lime;
	}

	.men-carousel-inner {
		position: relative;
		min-height: 400px;
		min-width: 400px;
		max-height: 400px;
		max-width: 400px;
		overflow: hidden;
	}

	.lightbox-content {
		position: relative;
		top: 10%;
		margin : 0 auto;
		text-align: center;
	}

	.lightbox-wrapper {
		height: 100%;
		width: 100%;
		position: fixed; /* Stay in place */
		z-index: 10000; /* Sit on top */
		left: 0;
		top: 0;
		background-color: rgb(0,0,0); /* Black fallback color */
		background-color: rgba(0,0,0, 0.7); /* Black w/opacity */
		overflow-x: hidden; /* Disable horizontal scroll */
		transition: 0.5s;
	}
</style>
<script>
	export default {
		props: {
			items: {
				type: Array,
				default() {
					return [];
				},
			},

			options: {
				type: Object,
				default() {
					return {
						showIndicators: true,
						showLightbox: true
					};
				},
			},

			index: {
				type: Number,
			},

			id: {
				type: String,
				default: 'vue-image-carousel-lightbox',
			},
		},

		data() {
			return {
				currentIndex: this.index,
				maxLength: this.items.length - 1,
				lightboxActive: false,
			}
		},

		mounted() {

		},

		methods: {
			onSwipe(event) {
				if(event.direction == 2) {
					this.next();
				}

				if(event.direction == 4) {
					this.prev();
				}
			},

			prev() {
				if(this.currentIndex > 0) {
					this.currentIndex--;
				}
			},

			next() {
				if(this.currentIndex < this.maxLength) {
					this.currentIndex++;
				}
			},

			setCurrentIndex(index) {
				this.currentIndex = index;
			},

			toggleLightbox() {
				this.lightboxActive = !this.lightboxActive;
			}
		}
	}
</script>