import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import router from './shared/router';
import store from './shared/store';
import './override.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.use(store);
app.use(ConfirmationService);
app.mount('#app');