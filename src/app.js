import Carousel from './carousel.vue'

const plugin = {
	version: VERSION,
	install(Vue) {
		Vue.component(Carousel.name, Carousel)
	},
}

export { Carousel }
export default plugin