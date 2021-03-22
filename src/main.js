import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
import Qs from 'qs';
//QS是axios库中带的，不需要我们再npm安装一个

Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
Vue.prototype.HOST = '/api';

Vue.config.productionTip = false;
router.beforeEach(function(to, from, next) {
    //页面是否登录
    var user = JSON.parse(localStorage.getItem('user'));
    // 如果有账号密码,放行
    if (user && user.userName) {
        next();
    } else {
        if (to.path === '/') {
            next();
        } else {
            next('/');
        }
    }
});
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
