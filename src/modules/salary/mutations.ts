import { MutationTree } from 'vuex';
import { salary } from '.';

import {
  IReportSalary,
  ISalaryState,
  REPORT_SALARY_SET_ALL,
  REPORT_SALARY_SET_ONE
} from './types';

export const mutations: MutationTree<ISalaryState> = {
  [REPORT_SALARY_SET_ALL]: (state, payload: IReportSalary[]) => {
    state.reportsSalaries = payload;
  },

  [REPORT_SALARY_SET_ONE]: (state, payload: IReportSalary) => {
    let done: boolean = false;

    state.reportsSalaries.forEach((salary, i) => {
      if (salary.reportId === payload.reportId) {
        state.reportsSalaries[i] = payload;
        done = true;
      }
    });

    if (!done) {
      state.reportsSalaries.push(payload);
    }

    console.log(state.reportsSalaries)
  }
};
