import { GetterTree } from 'vuex';
import { RootState } from '@/store';

import {
  IProfileState,
  PROFILE_HAS_ROLE,
} from './types';
import { UserRoleName } from '../users';

export const getters: GetterTree<IProfileState, RootState> = {
  [PROFILE_HAS_ROLE]: (state) => {
    return (userRole: UserRoleName) => state.roles.includes(userRole);
  }
};
