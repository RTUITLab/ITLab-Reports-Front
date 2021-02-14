import { Module } from 'vuex';
import { RootState } from '@/store';

import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import {
  IProfileState,
  LOCAL_STORAGE_PROFILE_ID,
  LOCAL_STORAGE_SETTINGS_THEME,
  LOCAL_STORAGE_ROLES
} from './types';

import { UserRoleName } from '../users';

export * from './types';

export const state: IProfileState = {
  roles: [],
  settings: {
    theme: localStorage.getItem(LOCAL_STORAGE_SETTINGS_THEME) || 'light'
  }
};

export const profile: Module<IProfileState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
