// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(axios);
Vue.use(iView);
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //引入路由，重要！！
  components: { App },
  template: '<App/>'
})
