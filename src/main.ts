import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Aura from '@primevue/themes/aura';
import i18n from './plugins/i18n'

// PrimeVue
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

// PrimeVue theme (Aura)
import 'primeicons/primeicons.css'

// PrimeFlex
import 'primeflex/primeflex.css'

// App styles
import './styles/app.css'
import './assets/css/themes.css'

import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'


const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura
  }
})
app.use(ToastService)

app.mount('#app')
