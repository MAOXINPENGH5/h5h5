import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//引入重置样式
import './assets/css/property.css'
import './assets/css/reset.css'

//引入淘宝适配库
import 'lib-flexible/flexible'

//引入组件
import {
  Button, Tab, Tabs, NoticeBar,
  Sidebar, SidebarItem, Card, GoodsAction, Stepper, Popup, GoodsActionIcon, GoodsActionButton
} from 'vant'
Vue.use(Button).use(Tab).use(Tabs)
  .use(NoticeBar)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Card)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Popup)
  .use(Stepper)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
