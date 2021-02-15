import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import axios from 'axios';

import { getResponseData } from '@/stuff';

import {
  IUsersState,
  IUser,
  USERS_FETCH_ALL,
  USERS_SET_ALL,
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
  }
};
