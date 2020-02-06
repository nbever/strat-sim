<template>
  <div>
    <div>Cardsets</div>
    <div v-for="cardset in cardsets">
      {{cardset.name}}
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        cardsets: []
      }
    },
    methods: {
      refresh: async function() {
        this.cardsets = await this.getCardSets();
      }
    },
    mounted: function() {
      this.refresh();
    }
  }
</script>
