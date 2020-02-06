<template>
  <div class="my-container">
    <md-dialog-alert :md-active.sync="$root.showError" :md-content="$root.error">
    </md-dialog-alert>
    <title-bar></title-bar>
    <div class="my-workpane">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TitleBar from './components/TitleBar';

export default {
  name: 'App',
  data: () => {
    return {
      message: 'Using Parcel In A Vue.js App'
    };
  },
  components: {
    TitleBar
  }
};
</script>

<style scoped>
  .my-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .my-workpane {
    flex-shrink: 1;
    flex-grow: 1;
    position: relative;
  }
</style>
