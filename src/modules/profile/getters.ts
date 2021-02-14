import { GetterTree } from 'vuex';
import { RootState } from '@/store';

import {
  IProfileState,
  PROFILE_SETTINGS_THEME_GET,
  PROFILE_HAS_ROLE,
  PROFILE_ROLES_GET
} from './types';
import { UserRoleName } from '../users';

export const getters: GetterTree<IProfileState, RootState> = {

  [PROFILE_SETTINGS_THEME_GET]: (state) => {
    return state.settings.theme;
  },

  [PROFILE_HAS_ROLE]: (state) => {
    return (userRole: UserRoleName) => state.roles.includes(userRole);
  },

  [PROFILE_ROLES_GET]: (state) => {
    return state.roles;
  }
};
