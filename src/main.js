import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import 'mosha-vue-toastify/dist/style.css'

createApp(App)
.use(Vuex)
.use(store)
.mount('#app')