import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "vue3-toastify/dist/index.css";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

const options: { broadcaster: string; key: string; cluster: string } = {
  broadcaster: "pusher",
  key: process.env.VUE_APP_PUSHER_KEY,
  cluster: process.env.VUE_APP_PUSHER_CLUSTER,
};

declare global {
  interface Window {
    Echo: Echo;
  }
}

window.Echo = new Echo({
  ...options,
  client: new Pusher(options.key, {
    ...options,
  }),
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).mount("#app");
