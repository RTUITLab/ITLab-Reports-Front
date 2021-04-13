<!-- TEMPLATE BEGIN -->
<template>
  <div id="reports-app">
    <notifications position="top right"></notifications>
    <router-view />
  </div> 
</template>
<!-- TEMPLATE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class App extends Vue {
}
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
@import '@/styles/general.scss';

html,
body {
  min-height: 100%;
}

#app {
  height: inherit;
  min-height: inherit;
  width: 100%;

  .layout {

    .content-wrapper-another-front {
      position: fixed;
      top: 0;
      padding-top: 50px;
      width: 100%;
    }

    .content-wrapper {
      min-height: 100vh;
      width: 100%;
      height: 100%;
    }

    &.with-sidebar {
      @include media-breakpoint-up(lg) {
        padding-left: $sidebar-width;
      }

      .content-wrapper {
        padding-top: 50px;
      }
    }
  }

  @each $theme, $map in $themes {
    &.#{$theme} {
      background-color: map-get($map, page-background-color);
      color: map-get($map, page-font-color);
    }
  }
}

.notifications {
  padding: 10px;
}

.page-title {
  @include media-breakpoint-down(md) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    font-size: 20pt;
    height: calc(2rem + 32px);
    line-height: calc(2rem + 32px);
    padding-left: 1rem;
    border-bottom: 2px solid;

    .btn {
      position: relative;
      top: -4px;
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      line-height: 1.5;
      border-radius: 0.2rem;
    }

    @include theme-specific() {
      background-color: getstyle(title-background-color);
      border-color: getstyle(title-border-color);
    }
  }
}
</style>
<!-- STYLE END -->
