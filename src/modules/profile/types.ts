import { UserRoleName } from '@/modules/users';

// getters
export const PROFILE_HAS_ROLE = 'PROFILE_HAS_ROLE';

// UserSession //
////////////////

export interface IUserSession {
  id: string;
  userAgent: string;
  createTime: Date;
}

// Settings //
/////////////

export interface ISettings {
  theme: string;
}

// State //
//////////

export interface IProfileState {
  profileId?: string;
  roles: UserRoleName[];

  settings: ISettings;
}
