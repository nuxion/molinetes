import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
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

Vue.use(shared);
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
