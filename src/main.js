import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'

createApp(App)
.use(Vuex)
.use(store)
.mount('#app')
