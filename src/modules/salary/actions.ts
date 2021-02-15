import { ActionTree } from 'vuex';
import { RootState } from '@/store';
import axios from 'axios';
import moment from 'moment-timezone';

import { getResponseData } from '@/stuff';

import {
  ISalaryState,
  REPORT_SALARY_FETCH_ALL,
  REPORT_SALARY_SET_ALL,
  IReportSalary,
} from './types';

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
  }
};
