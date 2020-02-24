<template>
  <div class="page">
    <div class="form">
      <md-field class="col-width">
        <label>City</label>
        <md-input type="text" maxlength="48" v-model="city"></md-input>
      </md-field>
      <md-field class="col-width">
        <label>Name</label>
        <md-input type="text" maxlength="48" v-model="name"></md-input>
      </md-field>
    </div>
    <div class="button-row col-width">
      <md-button class="md-primary" v-on:click="cancel()">Cancel</md-button>
      <md-button 
        class="md-raised md-accent" 
        v-on:click="save()"
        :disabled="name.trim().length === 0 || city.trim().length === 0">
        Save
      </md-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CreateTeam',
    data: function() {
      return {
        city: '',
        name: ''
      };
    },
    methods: {
      save: async function() {
        console.log(`Team: {${this.city}, ${this.name}} cardset: ${this.$route.params.cardSetId}`);
        const result = await this.addTeamToCardSet(
          this.$route.params.cardSetId,
          {
            city: this.city,
            name: this.name,
            logo: ''
          });

        this.cancel();
      },
      cancel: function() {
        this.$router.push(`/admin/cardsets/view/${this.$route.params.cardSetId}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .col-width {
    max-width: 300px;
  }
</style>