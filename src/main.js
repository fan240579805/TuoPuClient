import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/global.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';


Vue.use(ElementUI);
// Vue.use(axios,VueAxios);

// vue实例充当事件总线$bus
Vue.prototype.$bus=new Vue({})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
