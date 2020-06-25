import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import qs from 'qs'
import axios from 'axios'
import vuex from 'vuex'

Vue.prototype.$qs=qs
axios.defaults.baseURL='http://127.0.0.1:8081/'
Vue.prototype.$http=axios
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
