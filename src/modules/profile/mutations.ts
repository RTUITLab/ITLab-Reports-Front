import { MutationTree } from 'vuex';

import { decodeJWT } from '@/stuff';

import {
  IProfileState,
  LOCAL_STORAGE_PROFILE_ID,
  LOCAL_STORAGE_SETTINGS_THEME,
  PROFILE_SET,
  PROFILE_SETTINGS_THEME_SET,
  PROFILE_ROLES_SET,
  LOCAL_STORAGE_ROLES
} from './types';

import { IUser, UserRoleName } from '@/modules/users';

export const mutations: MutationTree<IProfileState> = {
  [PROFILE_SET]: (state, data?: string | IUser) => {
    state.profileId = data == null || typeof data === 'string' ? data : data.id;

    if (state.profileId) {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_ID, state.profileId);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_ID);
    }
  },

  [PROFILE_SETTINGS_THEME_SET]: (state, theme: string = 'light') => {
    state.settings.theme = theme;
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_THEME, state.settings.theme);
  },

  [PROFILE_ROLES_SET]: (state, roles: UserRoleName[]) => {
    state.roles = roles;
    localStorage.setItem(LOCAL_STORAGE_ROLES, btoa(JSON.stringify(roles)));
  }
};
