// actions
export const USERS_FETCH_ALL = 'USERS_FETCH_ALL';

// setters
export const USERS_SET_ALL = 'USERS_SET_ALL';

// getters
export const USERS_GET_ALL = 'USERS_GET_ALL';
export const USERS_GET_ALL_LIST = 'USERS_GET_ALL_LIST';
export const USERS_GET_ONE = 'USERS_GET_ONE';

// UserRoles //
//////////////

export type UserRoleName =
  | ''
  | 'CanEditEquipment'
  | 'CanEditEquipmentOwner'
  | 'CanEditEquipmentType'
  | 'CanEditRoles'
  | 'CanEditEvent'
  | 'CanEditEventType'
  | 'CanInviteToSystem'
  | 'CanDeleteEventRole';

export class UserRoleDefault {
  public id: string = '';
  public name: UserRoleName = '';
}

export interface IUserRole extends UserRoleDefault {}

// UserPropertyType //
/////////////////////

export class UserPropertyTypeDefault {
  public id: string = '';
  public title: string = '';
  public description: string = '';
  public instancesCount: number = 0;
  public isLocked: boolean = false;
}

export interface IUserPropertyType extends UserPropertyTypeDefault {}

// UserProperty //
/////////////////

export class UserPropertyDefault {
  public value: string = '';
  public status: string = '';
  public userPropertyType: IUserPropertyType = new UserPropertyTypeDefault();
}

export interface IUserProperty extends UserPropertyDefault {}

// User //
/////////

export class UserDefault {
  public id: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public middleName: string = '';
  public phoneNumber: string = '';
  public properties?: IUserProperty[];
  public vkData: string = '';
}

export interface IUser extends UserDefault {}

// UserList //
/////////////

export class UserList {
  public text: string = '';
  public value: string = '';
}

export interface IUserList extends UserList { }

// State //
//////////

export interface IUsersState {
  users: IUser[];
  userRoles: IUserRole[];
  userPropertyTypes: IUserPropertyType[];
}
