import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'   // styled Aura preset

import 'primeicons/primeicons.css'         // icons
import 'primeflex/primeflex.css'           // optional utility classes

const app = createApp(App)

// ✅ Apply Aura theme
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(router)
app.mount('#app')
