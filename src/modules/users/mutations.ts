import { MutationTree } from 'vuex';

import { setOneElement } from '@/stuff';

import {
  IUsersState,
  IUser,
  IUserRole,
  USERS_SET_ALL,
} from './types';

export const mutations: MutationTree<IUsersState> = {
  [USERS_SET_ALL]: (
    state,
    payload: IUser[] | { users: IUser[]; merge?: boolean }
  ) => {
    const users = payload instanceof Array ? payload : payload.users;
    const merge = payload instanceof Array ? false : payload.merge === true;

    if (merge) {
      users.forEach((user) => {
        setOneElement(state.users, user);
      });
    } else {
      state.users = users;
    }
  }
};
