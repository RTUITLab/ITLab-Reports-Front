import { MutationTree } from 'vuex';
import Vue from 'vue';

import { ILayoutState, LAYOUT_BADGE_TEXT_SET } from './types';

export const mutations: MutationTree<ILayoutState> = {
  [LAYOUT_BADGE_TEXT_SET]: (
    state,
    { sectionName, badgeText }: { sectionName: string; badgeText?: string }
  ) => {
    let sectionIndex: number = -1;
    const groupIndex = state.groups.findIndex((group) => {
      sectionIndex = group.sections.findIndex(
        (section) => section.name === sectionName
      );
      return sectionIndex !== -1;
    });

    if (groupIndex === -1 || sectionIndex === -1) {
      return;
    }

    const group = state.groups[groupIndex];
    group.sections[sectionIndex].badgeText = badgeText;
    Vue.set(state.groups, groupIndex, group);
  }
};
