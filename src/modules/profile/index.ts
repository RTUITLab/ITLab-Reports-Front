import { Module } from 'vuex';
import { RootState } from '@/store';

import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import {
  IProfileState,
} from './types';

export * from './types';

export const state: IProfileState = {
  roles: [],
  settings: {
    theme: 'light'
  }
};

export const profile: Module<IProfileState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
