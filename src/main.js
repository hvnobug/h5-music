import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { Notify } from 'vant';
Vue.use(Notify);

import { Toast } from 'vant';
Vue.use(Toast);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/assets/image/error.jpg',
    loading: '//i.loli.net/2020/04/27/WzUKqsngvb1HRdt.jpg',
    attempt: 1
})

import animated from 'animate.css'

Vue.use(animated)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
