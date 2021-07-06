import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import './assets/css/style.css'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
  
 

const app = createApp(App);
app.config.productionTip = false;
app.use(Antd);
app.use(router);
app.use(store);
app.mount('#app');