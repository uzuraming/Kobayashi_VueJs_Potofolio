Vue.config.devtools = true;

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'


// vueEditor
import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);




Vue.config.productionTip = false



router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})








// Initialize Firebase
var config = {
  apiKey: "AIzaSyBqFOHqtDZroloqI4zXSx_WVLWeuejXQZM",
  authDomain: "meneki-web.firebaseapp.com",
  databaseURL: "https://meneki-web.firebaseio.com",
  projectId: "meneki-web",
  storageBucket: "meneki-web.appspot.com",
  messagingSenderId: "1056647965043",
  appId: "1:1056647965043:web:81ac2287630574f52c7d06"
}
firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

