<!-- TEMPALTE BEGIN -->
<template>
  <div class="c-page-content">
    <b-container class="content">
      <b-row>
        <b-col>
          <h3 class="page-title">
            <b-row>
              <b-col cols="auto" class="pr-0">
                <slot name="header"></slot>
              </b-col>
              <b-col cols="auto" class="mr-auto">
                <slot name="header-button"></slot>
              </b-col>
            </b-row>
          </h3>
        </b-col>
      </b-row>
      <br>

      <template v-if="isLoading">
        <svgicon class="stub" name="loading" height="200"></svgicon>
      </template>
      <template v-else-if="isEmpty">
        <div class="stub">
          Empty
        </div>
      </template>
      <template v-else-if="isNotFound">
        <svgicon class="stub" name="404" height="200"></svgicon>
      </template>
      <template v-else>
        <slot></slot>
      </template>
      <br>
    </b-container>
  </div>
</template>
<!-- TEMPALTE END -->


<!-- SCRIPT BEGTIN -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import '@/icons/loading';
import '@/icons/404';

@Component
export default class CPageContent extends Vue {
  // Properties //
  ///////////////

  @Prop({
    default: false
  })
  public loading!: boolean;

  @Prop({
    default: false
  })
  public empty!: boolean;

  @Prop({
    default: false
  })
  public notFound!: boolean;

  // Computed data //
  //////////////////

  get isLoading(): boolean {
    return this.loading;
  }

  get isEmpty(): boolean {
    return !this.loading && this.empty;
  }

  get isNotFound(): boolean {
    return !this.loading && this.notFound;
  }
}
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
@import '@/styles/general.scss';

.c-page-content {
  .stub {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    fill: #e2e2e2;
  }
}
</style>
<!-- STYLE END -->