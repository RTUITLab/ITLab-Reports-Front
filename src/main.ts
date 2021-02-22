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

Vue.prototype.$g = globals;

Vue.config.productionTip = false;

let vueLifecycles;

export const bootstrap = async (props: any) => {
  const interval = setInterval(async () => {
    if (document.getElementById('reports-page')) {
      Vue.prototype.$userManager = props.userManager;
      vueLifecycles = singleSpaVue({
        Vue,
        appOptions: {
          render: (h: any) => h(App),
          router: router(props.userManager),
          store,
          el: document.getElementById('reports-page') as HTMLElement
        },
      });

      await vueLifecycles.bootstrap(props);
      clearInterval(interval);
    }
  }, 100);
};

export const mount = async (props: any) => setTimeout(async () => {
  const interval = setInterval(async () => {
    if (document.getElementById('reports-page')) {
      Vue.prototype.$userManager = props.userManager;
      vueLifecycles = singleSpaVue({
        Vue,
        appOptions: {
          render: (h: any) => h(App),
          router: router(props.userManager),
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
      router: router(props.userManager),
      store,
      el: document.getElementById('reports-page') as HTMLElement
    },
  });

  await vueLifecycles.unmount(props);
}, 0);
