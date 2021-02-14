import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { layout } from '@/modules/layout';
import { profile } from '@/modules/profile';
import { users } from '@/modules/users';
import { salary } from '@/modules/salary';
import { reports } from '@/modules/reports';

Vue.use(Vuex);

export class RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    layout,
    profile,
    users,
    salary,
    reports
  }
};

export default new Vuex.Store<RootState>(store);
