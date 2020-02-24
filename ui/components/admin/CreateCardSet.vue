<template>
    <div class="page">
      <div class="header">Add Card Set</div>
        <div class="max-size">
          <div class="form">
            <md-field>
              <label>Name</label>
              <md-input v-model="name" size="24" maxlength="48"></md-input>
            </md-field>
            <md-field>
              <label>Year</label>
              <md-input v-model="year" type="number" size="6" maxlength="4"></md-input>
            </md-field>
          </div>
          <div class="button-row">
            <md-button class="md-primary" v-on:click="cancel()">Cancel</md-button>
            <md-button 
              class="md-raised md-accent" 
              v-on:click="save()"
              :disabled="name.trim().length === 0">
              Save
            </md-button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data: function() {
      return {
        name: '',
        year: 2020
      };
    },
    methods: {
      save: async function() {
        const rzt = await this.createCardSet({name: this.name, year: this.year});
        console.log(JSON.stringify(rzt));
      },
      cancel: function() {
        this.$router.push({name: 'card-list'});
      }
    }
  };
</script>

<style lang="scss" scoped>
  
  .max-size {
    max-width: 300px;
  }

</style>