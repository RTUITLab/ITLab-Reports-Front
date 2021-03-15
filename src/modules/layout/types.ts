import { RawLocation, RouteConfig } from 'vue-router';
import { UserRoleName } from '../users';

// getters
export const LAYOUT_PAGES_GET = 'LAYOUT_PAGES_GET';

// Section //
////////////

export interface ISection {
  name: string;
  title: string;
  homeURL: RawLocation;
  pages: RouteConfig[];
  badgeText?: string;
  anotherFrontEnd?: boolean;
}

// Group //
//////////

export interface IGroup {
  name: string;
  title: string;
  sections: ISection[];
}

// PageMeta //
/////////////

export interface IPageMeta {
  secure?: boolean;
  development?: boolean;
  allow?: UserRoleName | UserRoleName[];
}

// State //
//////////

export interface ILayoutState {
  groups: IGroup[];
}
