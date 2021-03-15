<!-- TEMPALTE BEGIN -->
<template>
  <div class="c-autocomplete-input" v-bind:class="{ 'hide-results': resultsHidden }">
    <b-input-group>
      <b-form-input autocomplete="off" type="text" v-model="searchString" @input.native="onInput" @blur.native="onBlur" :state="state" ref="input"></b-form-input>
      <b-input-group-append v-if="canClear">
        <b-btn :disabled="!searchString" @click="onClear">
          <icon name="times" style="position: relative; top: -2px;"></icon>
        </b-btn>
      </b-input-group-append>
    </b-input-group>

    <ul class="results" v-show="!resultsHidden">
      <li v-for="(result, index) in results" :key="'result-' + index" class="result-item" @mousedown="preventBlur" @click.stop="onSelect(result)">
        <slot name="result-item" v-bind:search="searchString" v-bind:item="result" v-bind:results="results">{{ stringify && stringify(result) }}</slot>
      </li>
      <template v-if="withoutAdding !== true">
        <li class="add-item" v-show="searchString.length > 0" v-if="!checkExistence" @mousedown="preventBlur" @click="onAdd()">
          <slot name="add-item" v-bind:search="searchString" v-bind:results="results">
            Добавить
            <b>{{ searchString }}</b>
          </slot>
        </li>
      </template>
      <template v-else-if="results.length === 0">
        <li class="add-item" v-show="searchString.length > 0" v-if="!checkExistence">
          <slot name="add-item" v-bind:search="searchString" v-bind:results="results">
            Не найдено
          </slot>
        </li>
      </template>
    </ul>
  </div>
</template>
<!-- TEMPLATE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/times';

@Component({
  components: {
    Icon
  }
})
export default class CAutocompleteInput extends Vue {
  // Properties //
  ///////////////

  public resultsHidden: boolean = true;
  public searchString: string = '';
  public results: object[] = [];

  @Prop()
  public value?: object;

  @Prop()
  public state?: boolean;

  @Prop({
    default: false
  })
  public withoutAdding?: boolean;

  @Prop({
    default: false
  })
  public canClear?: boolean;

  @Prop({
    default: (v: object) => {
      return v ? v.toString() : '';
    },
    type: Function
  })
  public stringify?: (value: object) => string;

  @Prop({
    default: (s: string, cb: (arr: object[]) => void) => {
      if (cb) {
        cb([]);
      }
    },
    type: Function
  })
  public fetch?: (s: string, cb: (arr: object[]) => void) => void;

  @Prop({
    default: (e: object): boolean => true,
    type: Function
  })
  public filter?: (e: object) => boolean;

  @Prop({
    default: (title: string) => undefined,
    type: Function
  })
  public add?: (title: string) => void;

  private preventingBlur: boolean = false;

  // Component methods //
  //////////////////////

  public mounted() {
    this.$watch('value', (value?: object) => {
      this.searchString = value && this.stringify ? this.stringify(value) : '';
    });

    this.searchString =
      this.value && this.stringify ? this.stringify(this.value) : '';
  }

  // Methods //
  ////////////

  public preventBlur(event: MouseEvent) {
    this.preventingBlur = true;
  }

  public onBlur(event: FocusEvent) {
    if (this.preventingBlur) {
      this.preventingBlur = false;
      return;
    }

    this.resultsHidden = true;
    if (this.value != null && this.stringify) {
      this.searchString = this.stringify && this.stringify(this.value);
    } else {
      this.searchString = '';
    }
  }

  public onInput() {
    this.resultsHidden = false;
    if (this.fetch) {
      this.fetch(this.searchString, (results: object[]) => {
        this.results = this.filter
          ? results.filter((e) => this.filter && this.filter(e))
          : results;
      });
    }
  }

  public onSelect(selected: object) {
    this.searchString = this.stringify ? this.stringify(selected) : '';
    this.resultsHidden = true;
    this.$emit('input', selected);
  }

  public onAdd() {
    this.resultsHidden = true;
    if (this.add != null) {
      this.add(this.searchString);
      this.searchString =
        this.stringify && this.value ? this.stringify(this.value) : '';
    }
  }

  public onClear() {
    this.searchString = '';
    this.resultsHidden = true;
    this.$emit('input', null);
  }

  get checkExistence(): boolean {
    if (!this.stringify || this.searchString.length === 0) {
      return false;
    }

    const search = this.searchString.trim().toLocaleLowerCase();
    for (const result of this.results) {
      const title = (this.stringify(result) as string)
        .trim()
        .toLocaleLowerCase();

      if (title.localeCompare(search) === 0) {
        return true;
      }
    }

    return false;
  }
}
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
@import '@/styles/general.scss';

.c-autocomplete-input {
  position: relative;

  .results {
    position: absolute;
    width: 100%;
    z-index: 2;
    padding: 0;
    margin: 0;

    .result-item {
      list-style: none;
      text-align: left;
      padding: 4px 10px;
      cursor: pointer;
    }

    .result-item:hover {
      background-color: $primary;
      color: white;
    }

    .add-item {
      list-style: none;
      text-align: left;
      padding: 10px;
      cursor: pointer;
      border-top: 1px solid getcolor(white, base);

      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }

    .add-item:hover {
      @include theme-specific() {
        background-color: darken(getstyle(form-control-background-color), 10%);
      }
    }

    border: 1px solid;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;

    @include theme-specific() {
      border-color: darken(getstyle(form-control-background-color), 10%);
      background-color: getstyle(form-control-background-color);
      color: #495057;
    }
  }

  &.hide-results {
    .autocomplete-results {
      display: none;
    }
  }
}
</style>
<!-- STYLE END -->