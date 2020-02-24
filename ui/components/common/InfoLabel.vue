<template>
  <div class="info-label">
      <div class="il-label">
        {{label}}
      </div>
      <div class="il-value">
        {{value}}
      </div>
  </div>
</template>

<script>
  export default {
    name: 'InfoLabel',
    props: {
      label: {type: String},
      value: {type: [String, Number]}
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../variables';

  .info-label {
    padding-right: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .il-label {
    font-size: 12px;
    color: $gray;
  }

  .il-value {
    font-size: 22px;
  }
</style>