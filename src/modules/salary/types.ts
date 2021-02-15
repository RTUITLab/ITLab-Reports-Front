// actions
export const REPORT_SALARY_FETCH_ALL = 'REPORT_SALARY_FETCH_ALL';
export const REPORT_SALARY_COMMIT = 'REPORT_SALARY_COMMIT';

// mutations
export const REPORT_SALARY_SET_ALL = 'REPORT_SALARY_SET_ALL';

// getters
export const REPORT_SALARY_GET_ALL = 'REPORT_SALARY_GET_ALL';
export const REPORT_SALARY_GET_ONE = 'REPORT_SALARY_GET_ONE';

// Report Salary //
//////////////////

export class ReportSalary {
    public reportId: string = '';
    public approved: string = '';
    public approverId: string = '';
    public count: string = '';
    public description: string = '';
}

export interface IReportSalary extends ReportSalary {}

// State //
//////////

export class SalaryState {
    public reportsSalaries: IReportSalary[] = [];
}

export interface ISalaryState extends SalaryState {}
