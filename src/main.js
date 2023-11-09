import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import GoogleMap from "vue-google-maps-ui";

import { createApp } from "vue";
import { store } from "./store/store.js";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(store);
app.component("GoogleMap", GoogleMap);
app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";
