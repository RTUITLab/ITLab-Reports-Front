<!-- TEMPALTE BEGIN -->
<template>
  <div>
    <page-content :loading="loadingInProcess">
      <template slot="header">Отчёты</template>
      <b-tabs>
        <b-tab v-if="isSalaryAdmin()" title="Отчёты сотрудников">
          <br />

          <p>Выберите период:</p>
          <b-row>
            <b-col cols="12" md="6">
              <b-form-input type="date" v-model="date.start"></b-form-input>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-input type="date" v-model="date.end"></b-form-input>
            </b-col>
          </b-row>
          
          <br />
          <b-form-checkbox v-model="checked">Убрать оценённые</b-form-checkbox>
          <br />
          
          <b-row v-for="report in allReports" :key="report.id">
            <b-col>
              <report-item
                :report="report"
                :implementer="reportImplementer.All"
              ></report-item>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Написать">
          <br />
          <p>Опишите, что вы делали за последнее время, что вы считаете важным при оценке вашей работы</p>
          <p>Вы можете прикрепить изображения или документы. Формат описания поддерживает формат Markdown</p>

          <h4 class="mt-3">О ком отчёт</h4>
          <b-form-select
            v-model="subject"
            :options="authors"
          >
          </b-form-select>

          <h4 class="mt-4">Ваш отчёт</h4>
          <markdown-editor v-model="report">
            <template slot="title">
              <b-form-input
                v-model="name"
                placeholder="Название отчёта"
              >
              </b-form-input>
            </template>
            <template slot="actionButton">
              <b-button class="ml-md-auto" style="margin-top: 8px;" variant="primary" @click="sendReport">
                Отправить
              </b-button>
            </template>
          </markdown-editor>
        </b-tab>
        <b-tab title="Отчёты обо мне">
          <br />

          <b-row v-for="report in reportsAboutMe" :key="report.id">
            <b-col>
              <report-item
                :report="report"
                :implementer="reportImplementer.Me"
              ></report-item>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Мои отчёты о других">
          <br />

          <b-row v-for="report in reportsAboutOthers" :key="report.id">
            <b-col>
              <report-item
                :report="report"
                :implementer="reportImplementer.Others"
              ></report-item>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Прикрепленные файлы">
          <br />

          <b-row v-for="file in files" :key="file.id">
            <b-col>
              <file-item
                :file="file"
              ></file-item>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </page-content>
  </div>
</template>
<!-- TEMPLATE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

import configuration from '../../stuff/configuration';

import {
  USERS_FETCH_ALL,
  USERS_GET_ALL_LIST
} from '../../modules/users';

import {
  IReportTypeDefault,
  REPORTS_FETCH_ALL,
  REPORT_FILES_GET_ALL,
  REPORTS_GET_ALL,
  REPORT_COMMIT,
  REPORT_FILE_FETCH_ALL
} from '../../modules/reports';
import CReportItem, { ReportImplementer } from '../../components/ReportItem.vue';
import { IReportSalary, REPORT_SALARY_FETCH_ALL } from '../../modules/salary';
import CFileItem from '../../components/FileItem.vue';

import CMarkdownEditor from '../../components/MarkdownEditor.vue';

import CPageContent from '../../components/layout/PageContent.vue';
import { REPORT_SALARY_GET_ALL } from '../../../../ITLab-Reports-Front/src/modules/salary';

const LOCAL_STORAGE_API_URL = 'api-url';

@Component({
  components: {
    'page-content': CPageContent,
    'report-item': CReportItem,
    'file-item': CFileItem,
    'markdown-editor': CMarkdownEditor
  },
})
export default class ReportsPage extends Vue {
  // Properties //
  ///////////////

  public loadingInProcess: boolean = true;

  // Select field
  public subject: string = '';

  // Report field
  public name: string = '';
  public report: string = '';

  public salaries: IReportSalary[] = [];

  // Filters
  public date = {
    start: '',
    end: ''
  };
  public checked: boolean = false;

  public baseAddress: string = location.origin;
  public filesBaseAddress?: string = configuration.VUE_APP_FILES_BASE_ADDRESS;

  public reportImplementer = {
    Me: ReportImplementer.Me,
    Others: ReportImplementer.Others,
    All: ReportImplementer.All
  };

  // Component methods //
  //////////////////////

  public async mounted() {
    this.subject = (await this.$userManager.getUserId()) || '';

    Promise.all([
      this.$store.dispatch(USERS_FETCH_ALL),
      this.$store.dispatch(REPORTS_FETCH_ALL),
      this.$store.dispatch(REPORT_FILE_FETCH_ALL),
      this.$store.dispatch(REPORT_SALARY_FETCH_ALL, this.subject)
    ])
      .then(async () => {
        this.loadingInProcess = false;
      })
      .catch();

  }

  // Methods //
  ////////////

  public async sendReport() {
    if (this.name === '') {
      this.$notify({
        title: `Название отчёта не заполнено`,
        duration: 500,
        type: 'error'
      });
    } else if (this.report === '') {
      this.$notify({
        title: `Отчёт не написан`,
        duration: 500,
        type: 'error'
      });
    } else {
      console.log(this.report);
      const report: IReportTypeDefault = {
        id: '',
        name: this.name,
        text: this.report,
        assignees: {
          reporter: (await this.$userManager.getUserId()) || '',
          implementer: this.subject
        }
      };

      this.$store.dispatch(REPORT_COMMIT, report)
        .then(async () => {
          this.name = '';
          this.report = '';
          this.subject = (await this.$userManager.getUserId()) || '';

          this.$notify({
            title: `Отчёт успешно сохранён`,
            duration: 500,
          });
        });
    }
  }

  public isSalaryAdmin() {
    return this.$userManager.checkITLabClaim('salary.admin');
  }

  get reportsAboutMe() {
    return (this.$store.getters[REPORTS_GET_ALL] as IReportTypeDefault[]).filter((report) =>
      report.assignees.implementer.indexOf(this.subject) > -1
    );
  }

  get reportsAboutOthers() {
    return (this.$store.getters[REPORTS_GET_ALL] as IReportTypeDefault[]).filter((report) =>
      report.assignees.implementer.indexOf(this.subject) === -1
        && report.assignees.reporter.indexOf(this.subject) !== -1
    );
  }

  get allReports() {
    let reports = this.$store.getters[REPORTS_GET_ALL] as IReportTypeDefault[];

    if (this.date.start !== '') {
      reports = reports.filter((report) => (new Date(report.date!)).getTime() >= (new Date(this.date.start)).getTime());
    }
    if (this.date.end !== '') {
      reports = reports.filter((report) => (new Date(report.date!))
        .getTime() <= (new Date(this.date.end)).getTime() + 24 * 3600000);
    }
    if (this.checked === true) {
      const salaries = this.$store.getters[REPORT_SALARY_GET_ALL] as IReportSalary[];
      reports = reports.filter((report) => !salaries.find(((salary) => report.id === salary.reportId)));
    }

    return reports;
  }

  get authors() {
    return this.$store.getters[USERS_GET_ALL_LIST];
  }

  get files() {
    return this.$store.getters[REPORT_FILES_GET_ALL];
  }
}

export const reportsPageRoute: RouteConfig = {
  path: '/reports',
  name: 'reports',
  component: ReportsPage,
};
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
@import '@/styles/general.scss';

select {
  color: #007bff !important;

  > * {
    color: #1e1e1e !important;
  }
}

.theme-dark select {
  background-color: #1e1e1e;
  border-color: #555555;

  > * {
    color: #d6d6d6 !important;
    background: #333333;
  }
}
</style>
<!-- STYLE END -->