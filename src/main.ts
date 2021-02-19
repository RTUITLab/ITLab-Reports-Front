import './set-public-path';
import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';

import VueMoment from 'vue-moment';
import 'moment/locale/ru';
import moment from 'moment-timezone';

moment.tz.setDefault('Europe/Moscow');
Vue.use(VueMoment, { moment });

// SvgIcon
import * as svgicon from 'vue-svgicon';

Vue.use(svgicon, { tagName: 'svgicon' });

// VueHammer
import { VueHammer } from 'vue2-hammer';

Vue.use(VueHammer);

// Autosize
import VueAutosize from 'vue-autosize';

Vue.use(VueAutosize);

// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

// Notifications
import VueNotifications from 'vue-notification';

Vue.use(VueNotifications);

import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

// VueMarkdown //
////////////////

import VueMarkdown from 'vue-markdown';

VueMarkdown.props.html.default = false;
VueMarkdown.props.anchorAttributes.default = () => ({ target: '_blank' });
Vue.component('vue-markdown', VueMarkdown);

// Initialize Vue //
///////////////////

import globals from '@/globals';
import store from '@/store';
import router from '@/router';
import App from './App.vue';
import configuration from './stuff/configuration';
import { UserManager } from './UserManager';
import Oidc from 'oidc-client';

Vue.prototype.$g = globals;

function initConfiguration(data: any): void {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      configuration[key] = element;
    }
  }
}

let userManager!: any;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:9001/config.json', false); // TODO fix path to config, or load from root proxy
xhr.send();

if (xhr.status != 200) {
  console.log(xhr.status + ': ' + xhr.statusText);
} else {
  let jsonResponse = JSON.parse(xhr.response)

  initConfiguration(jsonResponse);
  userManager = new UserManager(new Oidc.UserManager({
    authority: configuration.VUE_APP_AUTHORITY,
    client_id: configuration.VUE_APP_CLIENT_ID,
    redirect_uri: configuration.VUE_APP_REDIRECT_URI,
    response_type: configuration.VUE_APP_RESPONSE_TYPE,
    scope: configuration.VUE_APP_SCOPE,
    post_logout_redirect_uri: configuration.VUE_APP_POST_LOGOUT_REDIRECT_URI,
    automaticSilentRenew: true,
    silent_redirect_uri: configuration.VUE_APP_SILENT_REDIRECT_URI
  }));
}

Vue.prototype.$userManager = userManager;

Vue.config.productionTip = false;

let vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h: any) => h(App),
    router: router(userManager),
    store,
    el: document.getElementById('reports-page')!
  },
});

export const bootstrap = async (props: any) => {
  let interval = setInterval(async () => {
    if (document.getElementById('reports-page')) {
      vueLifecycles = singleSpaVue({
        Vue,
        appOptions: {
          render: (h: any) => h(App),
          router: router(userManager),
          store,
          el: document.getElementById('reports-page') as HTMLElement
        },
      });

      await vueLifecycles.bootstrap(props);
      clearInterval(interval);
    }
  }, 100);
}

export const mount = async (props: any) => setTimeout(async () => {
  let interval = setInterval(async () => {
    if (document.getElementById('reports-page')) {
      vueLifecycles = singleSpaVue({
        Vue,
        appOptions: {
          render: (h: any) => h(App),
          router: router(userManager),
          store,
          el: document.getElementById('reports-page') as HTMLElement
        },
      });

      await vueLifecycles.mount(props);
      clearInterval(interval);
    }
  }, 100);
}, 500);

export const unmount = async (props: any) => setTimeout(async () => {
  vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
      render: (h: any) => h(App),
      router: router(userManager),
      store,
      el: document.getElementById('reports-page') as HTMLElement
    },
  });

  await vueLifecycles.unmount(props);
}, 0);

/*export const mount = async (props: any) => setTimeout(
  () => {
    console.log(document.getElementById('reports-page'));
    vueLifecycles.mount(props);
  }, 100);*/
/*export const bootstrap = async (props: any) => setTimeout(
  () => {
    console.log(document.getElementById('reports-page'));
    vueLifecycles.bootstrap(props);
  }, 100);*/
// export const unmount = vueLifecycles.unmount;
