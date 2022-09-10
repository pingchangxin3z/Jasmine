import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import '@/styles/reset.css';
import router from '@/router';

import { Button, NavBar, Field, Cell, CellGroup, NumberKeyboard, Icon, Tabbar, TabbarItem, Popup, Image as VanImage } from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(NumberKeyboard);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Popup);
Vue.use(VanImage);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')