<!-- TEMPLATE BEGIN -->
<template>
  <a :href="`mailto:${email}`">{{ email }}</a>
</template>
<!-- TEMPALTE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CMailLink extends Vue {
  // Properties //
  ///////////////

  @Prop()
  public email!: string;
}
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
</style>
<!-- STYLE END -->