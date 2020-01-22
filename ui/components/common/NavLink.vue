<template>
  <div v-on:click="goto()" v-bind:class="[{highlight: isSelected}, 'link']">{{title}}</div>
</template>

<script>
  export default {
    name: 'NavLink',
    props: {
      title: {type: String},
      link: {type: String, default: '/'},
      isSelected: {type: Boolean}
    },
    methods: {
      goto: async function() {
        this.$router.push(this.link);
        const result = await this.speak('something');
        console.log(`${result}`);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../variables';

  .link {
    width: 100px;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: $gray;
    color: white;
    margin: 0px;
    padding: 8px;
    text-transform: uppercase;
    font-weight: bold;

    &.highlight {
    background-color: $strat-yellow;
    color: black;
  }

    &:hover {
      background-color: $lite-strat-yellow;
      color: black;
      cursor: pointer;
    }
  }
</style>
