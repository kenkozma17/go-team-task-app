import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

const options: { broadcaster: string; key: string; cluster: string } = {
  broadcaster: "pusher",
  key: "518f4b28376a42913126",
  cluster: "ap1", // Replace "your-cluster" with your actual Pusher cluster
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
