<template>
  <div class="my-container">
    <md-dialog-alert :md-active.sync="$root.showError" :md-content="$root.error">
    </md-dialog-alert>
    <md-dialog :md-active.sync="$root.loading">
      <div class="loading">
        <div class="italic">Loading...</div>
        <md-progress-bar md-mode="query"></md-progress-bar>
      </div>
    </md-dialog>
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

  .loading {
    padding: 24px;
  }
</style>
