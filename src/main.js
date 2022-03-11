import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/router'
import store from './vuex/vuex'


Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, 
  store                     
}).$mount('#app')
