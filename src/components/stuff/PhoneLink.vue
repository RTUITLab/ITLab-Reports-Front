<!-- TEMPLATE BEGIN -->
<template>
  <a :href="`tel:${phone}`">{{ phone }}</a>
</template>
<!-- TEMPALTE END -->


<!-- SCRIPT BEGIN -->
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CPhoneLink extends Vue {
  // Properties //
  ///////////////

  @Prop()
  public phone!: string;
}
</script>
<!-- SCRIPT END -->


<!-- STYLE BEGIN -->
<style lang="scss">
</style>
<!-- STYLE END -->