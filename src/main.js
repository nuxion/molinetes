import Vue from 'vue'
import App from './App.vue'
import router from './router'
const cfg = require('./config');

Vue.config.productionTip = false

var shared = new Vue ({
	data: {
		apiserver: cfg.apiserver,
		env: cfg.env,
	}
});

shared.install = function(){
	Object.defineProperty(Vue.prototype, 'globalCFG', { get() { return shared } })
}

Vue.use(shared)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
