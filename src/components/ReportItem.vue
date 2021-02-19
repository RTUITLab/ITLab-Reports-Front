<!-- TEMPLATE BEGIN -->
<template>
  <div :class="`c-report-item ${status}`"> <!-- Maybe should add various states (EventItem) -->
		<div class="title-row">
      <b-row>
        <b-col cols="auto mr-auto" @mouseup="checkDateHover">
          <strong style="line-height: 31px">
            <span>
              <icon name="clock" style="cursor: pointer; position: relative; top: -2px"></icon>
            </span>
            &nbsp;
            <span class="date desktop">
              <span v-if="dateHovered">{{ date }}</span>
              <span v-else>{{ dateCalendar }}</span>
            </span>
            <span class="date mobile">
              <span>{{ date }}</span>
            </span>
          </strong>
        </b-col>
        <b-col v-if="isSalaryAdmin() && implementer === 2" md="4">
          <b-form-input type="number" v-model="salaryForm.count" style="display: inline-block; width: calc(100% - 20px);" placeholder="Стоимость"></b-form-input>
          <div style="display: inline-block; margin-left: 10px">₽</div>
        </b-col>
        <b v-else style="padding: 0 15px;">
				  <div v-if="salary.approved === '' && checkImplementer()">Оплата не указана</div>
          <div v-else-if="checkImplementer()">{{ `${salary.count} ₽` }}</div>
        </b>
			</b-row>
			<hr />
			<b-row>
				<b-col md="8">
          <h3 style="margin-bottom: 0">{{ report.name || `Отчёт (${date})` }}</h3>

          <div v-if="isSalaryAdmin() && implementer === 2">
            <p><b>От: {{ assignees.reporter }}</b> <br />
            <b>О:  {{ assignees.implementer }}</b></p>

            <br />
            <div class="preview">
              <markdown-it-vue class="md-body" :content="report.text" />
            </div>
          </div>
          <div v-else>
					  <br />
            <p><b>{{ author }}</b></p>
          </div>
        </b-col>
				<b-col md="4">
          <b-form-textarea
            rows="3"
            max-rows="100"
            v-if="isSalaryAdmin() && implementer === 2"
            v-model="salaryForm.description"
            placeholder="Комментарий"
          ></b-form-textarea>
          <div v-else-if="salary.approved && checkImplementer()">
            <b>Комментарий</b>
            <p>{{ salary.description }}</p>
          </div>
        </b-col>
			</b-row>
			<b-row class="mt-2">
        <b-col v-if="implementer !== 2" cols="12 mr-auto" md="auto">
          <b-button :to="'/reports/' + report.id" variant="primary" class="w-100">Подробнее</b-button>
        </b-col>
        <b-col v-else cols="12" md="4" class="ml-auto">
          <b-row>
            <b-col cols="12" md="auto" class="mr-auto">
              <p v-if="status === 'success'">{{`${salaryDate} ${approver}`}}</p>
            </b-col>
            <b-col cols="12" md="auto">
              <b-button variant="outline-warning" class="auto" @click="saveSalary">Сохранить</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col v-if="implementer !== 2" md="4" style="display: flex;">
          <div v-if="salary.approved && checkImplementer()" style="margin: auto 0;">{{ salaryDate + ' ' + approver }}</div>
        </b-col>
      </b-row>
		</div>
	</div>
</template>
<!-- TEMPLATE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import moment from 'moment-timezone';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/clock';

import { IReportTypeDefault } from '../modules/reports';
import { IUser, USERS_GET_ONE } from '../modules/users';
import { IReportSalary, REPORT_SALARY_GET_ONE } from '../modules/salary';

import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css';
import { REPORT_SALARY_COMMIT } from '../../../ITLab-Front/src/modules/salary';

Vue.component(MarkdownItVue.name, MarkdownItVue);

export enum ReportImplementer {
  Me,
  Others,
  All
}

@Component({
  components: {
    icon: Icon
  }
})
export default class CReportItem extends Vue {
  // Properties //
  ///////////////

  @Prop()
  public report!: IReportTypeDefault;

  @Prop({
    default: ReportImplementer.Me
  })
  public implementer!: ReportImplementer;

  public dateHovered: boolean = false;

  public salaryForm = {
    count: 0,
    description: ''
  }

  // Methods //
  ////////////

  public mounted() {
    this.salaryForm.count = parseInt(this.salary.count);
    this.salaryForm.description = this.salary.description;
  }

  public checkDateHover() {
    if (
      window.getSelection() == null ||
      window.getSelection()!.toString().length === 0
    ) {
      this.dateHovered = !this.dateHovered;
    }
  }

  public checkImplementer() {
    return this.implementer === ReportImplementer.Me ? true : false;
  }

  public isSalaryAdmin() {
    return this.$userManager.checkITLabClaim('salary.admin');
  }

  public saveSalary() {
    // @ts-ignore
    if (this.salaryForm.count === '') {
      this.$notify({
        title: `Не заполнено поле Стоимость`,
        duration: 500,
        type: 'error'
      });
    } else {
      this.$store.dispatch(REPORT_SALARY_COMMIT, { reportId: this.report.id, salary: this.salaryForm })
        .then(() => {
          this.$notify({
            title: `Запись успешно сохранена`,
            duration: 500
          });
        })
        .catch(() => {
          this.$notify({
            title: `Не удалось сохранить запись`,
            duration: 500,
            type: 'error'
          });
        })
    }
  }

  get date(): string {
    if (!this.report.date) {
      return '';
    }

    return moment(this.report.date).format(this.$g.DATETIME_FORMAT);
  }

  get salaryDate(): string {
    return moment(this.report.date).format('DD.MM.YYYY');
  }

  get dateCalendar(): string {
    if (!this.report.date) {
      return '';
    }

    return moment(this.report.date).calendar();
  }

  get assignees() {
    const reporter = this.$store.getters[USERS_GET_ONE](this.report.assignees.reporter) as IUser;
    const implementer = this.$store.getters[USERS_GET_ONE](this.report.assignees.implementer) as IUser;

    return {
      reporter: `${reporter.lastName} ${reporter.firstName[0]}.`,
      implementer: `${implementer.lastName} ${implementer.firstName[0]}.`
    }
  }

  get author(): string {
    const user = this.implementer === ReportImplementer.Me
      ? this.$store.getters[USERS_GET_ONE](this.report.assignees.reporter) as IUser
      : this.$store.getters[USERS_GET_ONE](this.report.assignees.implementer) as IUser;

    return `${user.lastName} ${user.firstName}`;
  }

  get approver():string {
    console.log(this.$store.getters[USERS_GET_ONE](this.salary.approverId) as IUser)
    return (this.$store.getters[USERS_GET_ONE](this.salary.approverId) as IUser).lastName;
  }

  get salary(): IReportSalary {
    return this.$store.getters[REPORT_SALARY_GET_ONE](this.report.id);
  }

  get status(): string {
    return this.salary.approved === '' ? 'default' : 'success';
  }
}
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss" scope>
@import '@/styles/general.scss';

.c-report-item {
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 10px;

  .date {
    &.desktop {
      @include media-breakpoint-down(md) {
        display: none;
      }
    }

    &.mobile {
      @include media-breakpoint-up(lg) {
        display: none;
      }
    }
  }

	@include theme-specific() {
    background-color: getstyle(card-list-item-background-color);

    &.default {
      box-shadow: -4px 0 0 $primary;
    }

    &.waiting {
      box-shadow: -4px 0 0 $warning;
    }

    &.success {
      box-shadow: -4px 0 0 $success;
    }
  }
}
.theme-dark {
  .preview {
    background-color: #333333;
    border-color: #333333;
    color: #d6d6d6;

    .markdown-body {
      color: #d6d6d6;

      code {
        background-color: rgba(162, 148, 255 , 0.1);
      }
    }
  }

  hr {
    border-color: #333333;
  }
}

.preview {
  padding: 6px 12px;
  border-radius: 0.25rem;
  background-color: #fff;
  border: none;
}
</style>
<!-- STYLE END -->
