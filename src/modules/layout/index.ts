import { Module } from 'vuex';
import { RootState } from '@/store';

import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { ILayoutState } from './types';

export * from './types';

// @ts-ignore
import { notificationsPageRoute } from '@/views/notifications';

// @ts-ignore
import { equipmentPageRoute, equipmentEditPageRoute } from '@/views/equipment';

// @ts-ignore
import { projectsPageRoute, projectEditPageRoute } from '@/views/projects';

// @ts-ignore
import { profilePageRoute } from '@/views/profile';

// @ts-ignore
import { reportsPageRoute, reportDetailPageRoute } from '@/views/reports';

export const state: ILayoutState = {
  groups: [
    {
      name: 'general',
      title: 'Общее',
      sections: [
        {
          name: 'reports',
          title: 'Отчеты (тестирование)',
          homeURL: `/reports`,
          pages: [reportsPageRoute, reportDetailPageRoute],
          anotherFrontEnd: true
        }
      ]
    }
  ]
};

export const layout: Module<ILayoutState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
