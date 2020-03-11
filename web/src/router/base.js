import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default class BaseRouter extends VueRouter {

	constructor(routes) {
		super({
			mode: 'history',
			routes,
			scrollBehavior(to, from, savedPosition) {
				if (savedPosition) {
					return savedPosition;
				} else {
					return { x: 0, y: 0 }
				}
			}
		});
	}

}