import { Module } from 'vuex';
import { RootState } from '@/store';

import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { IUsersState } from './types';

export * from './types';

export const state: IUsersState = {
  users: [],
  userRoles: [],
  userPropertyTypes: []
};

export const users: Module<IUsersState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
