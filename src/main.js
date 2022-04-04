import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { Toast } from 'toaster-js'; // const { Toast } = require("toaster-js/umd.js");
import 'toaster-js/default.scss'; // Assuming CSS/SCSS loader is present
// Import styles from SCSS: @import "../node_modules/toaster-js/default.scss";
// Or just copy default styles to your project from node_modules/toaster-js/default.*css.
// Or draw your own styles! For instance, you can make toasts appear on the left by overwriting .toast { left: 0; right: auto; }

// Simple toast
Vue.config.productionTip = false;

new Toast('עדכון בוצע', Toast.TYPE_SUCCESS, Toast.TIME_SHORT);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
