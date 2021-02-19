import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import axios from 'axios';

import { getResponseData } from '@/stuff';

import {
  ISalaryState,
  REPORT_SALARY_FETCH_ALL,
  REPORT_SALARY_SET_ALL,
  IReportSalary,
  REPORT_SALARY_COMMIT,
  ReportSalary,
  REPORT_SALARY_SET_ONE,
} from './types';
import { salary } from '.';

export const actions: ActionTree<ISalaryState, RootState> = {
  [REPORT_SALARY_FETCH_ALL]: ({ commit }, userId: string) => {
    return new Promise((resolve, reject) => {
      axios.get(`salary/v1/report/user/${userId}`)
        .then((response) => getResponseData<IReportSalary[]>(response))
        .then((salaries) => {
          commit(REPORT_SALARY_SET_ALL, salaries);
          resolve(salaries);
        })
        .catch((error) => {
          console.log(REPORT_SALARY_FETCH_ALL, error);
          reject();
        });
    });
  },

  [REPORT_SALARY_COMMIT]: ({ commit }, payload: { reportId: string, salary: any}) => {
    return new Promise((resolve, reject) => {
      payload.salary.count = parseInt(payload.salary.count);
      axios.put(`salary/v1/report/${payload.reportId}`, payload.salary)
        .then((response) => getResponseData<IReportSalary>(response))
        .then((salary: IReportSalary) => {
          commit(REPORT_SALARY_SET_ONE, salary);
          resolve(salary);
        })
        .catch((error) => {
          console.log(REPORT_SALARY_COMMIT, error);
          reject();
        });
    });
  }
};
