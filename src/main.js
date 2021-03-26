import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import Notifications from 'vue-notification'
import router from './router';
import {auth} from './firebase';
import Vue2Editor from "vue2-editor";
import store from './store';

Vue.use(Vue2Editor);

Vue.use(Vuelidate)

Vue.use(ElementUI, { locale })

Vue.use(Notifications)

Vue.config.productionTip = false

//  This ensures Firebase initializes before loading the app when a user refreshes a page.
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
