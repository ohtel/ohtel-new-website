import Vue from "vue";
import * as VueGoogleMaps from "@fawmi/vue-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBsG-EGz_k6QKG0eAHN03mtKQQKVMKmCq0",
    libraries: "places",
  },
});