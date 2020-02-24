<template>
  <div class="container">
    <div class="nav">
      <nav-link
        title="Leagues"
        link="/admin/leagues"
        v-bind:is-selected="(route === 'leagues')"
      >
      </nav-link>
      <nav-link 
        title="Cardsets" 
        link="/admin/cardsets" 
        v-bind:is-selected="(route === 'cardsets')"
      >  
      </nav-link>
    </div>
    <div class="nav-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import NavLink from './common/NavLink';

  export default ({
    name: 'admin',
    components: {
      'nav-link': NavLink
    },
    data: function() {
      return {
        route: this.$route.path.split('/')[2]
      };
    },
    beforeRouteUpdate: function(to, from, next) {
      this.route = to.path.split('/')[2];
      next();
    }
  });
</script>

<style lang="scss" scoped>
  @import '../variables';

  .container {
    display: flex;
    height: 100%
  }

  .nav {
    background-color: $gray;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .nav-view {
    flex-grow: 1;
    flex-shrink: 1;
  }
</style>
