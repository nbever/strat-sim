<template>
  <div class="parent flex-row space-between v-center strat-fg">
    <div>
      <md-menu md-direction="bottom-start">
        <md-button class="md-icon-button md-accent" md-menu-trigger>
            <span class="icon-menu"/>
        </md-button>

        <md-menu-content>
          <md-menu-item to="/home">Home</md-menu-item>
          <md-menu-item to="leagueAdmin">Admin</md-menu-item>
        </md-menu-content>
      </md-menu>

    </div>
    <div class="md-title">
      Strat-O-Matic Basketball
    </div>
    <div />
  </div>
</template>

<script>
  export default ({
    name: 'title-bar',
    methods: {
      showHideMenu: () => {
        console.log('clicked');
      }
    }
  });
</script>

<style scoped>
  .parent {
    width: 100%;
    background-color: black;
    font-size: 24px;
    font-weight: bolder;
    padding-left: 12px;
  }

  .md-icon-button {
    font-size: 24px;
  }
</style>
