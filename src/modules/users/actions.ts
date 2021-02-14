import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import axios from 'axios';

import { getResponseData } from '@/stuff';

import {
  IUsersState,
  IUser,
  IUserRole,
  USERS_FETCH_ALL,
  USERS_FETCH_ONE,
  USER_ROLES_FETCH,
  USERS_SET_ALL,
  USERS_SET_ONE,
  USER_ROLES_SET_ALL
} from './types';

export const actions: ActionTree<IUsersState, RootState> = {
  [USERS_FETCH_ALL]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios
        .get('user?count=-1')
        .then((response) => getResponseData<IUser[]>(response))
        .then((users) => {
          commit(USERS_SET_ALL, users);
          resolve(users);
        })
        .catch((error) => {
          console.log(USERS_FETCH_ALL, error);
          reject(error);
        });
    });
  },

  [USERS_FETCH_ONE]: ({ commit }, id: string) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`user/${id}`)
        .then((response) => getResponseData<IUser>(response))
        .then((user) => {
          commit(USERS_SET_ONE, user);
          resolve(user);
        })
        .catch((error) => {
          console.log(USERS_FETCH_ONE, error);
          reject(error);
        });
    });
  },

  [USER_ROLES_FETCH]: ({ commit }, user?: IUser | string) => {
    return new Promise((resolve, reject) => {
      const userId = user
        ? typeof user === 'string'
          ? user
          : user.id
        : undefined;

      axios
        .get(`roles/${userId || ''}`)
        .then((response) => getResponseData<IUserRole[]>(response))
        .then((userRoles) => {
          if (user) {
            commit(USER_ROLES_SET_ALL, userRoles);
          }
          resolve(userRoles);
        })
        .catch((error) => {
          console.log(USER_ROLES_FETCH, error);
          reject(error);
        });
    });
  },
};
