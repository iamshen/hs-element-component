import { createApp } from 'vue'
import App from './App.vue'
import router from '~/router'

import '~/styles/index.scss'
import 'uno.css'
import 'element-plus/dist/index.css'

createApp(App)
  .use(router)
  .mount('#app')
