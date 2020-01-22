<template>
  <div>
    <div>Bar</div>
    <div>
      <md-button class="md-raised md-primary">Button</md-button>
      <div>
        <md-field>
          <label for="leagueSelect">League</label>
          <md-select v-model="selectedLeague" name="leagueSelect" placeholder="League">
            <md-option v-for="league in leagues" v-bind:value="league.id" v-bind:key="league.id">{{ league.name }}</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      leagues: [
        {id: 'a', name: 'NBA'}, 
        {id: 'g', name: 'NHL'}, 
        {id: 5, name: 'NFjL'}
      ],
      selectedLeague: 'g'
    })
  };
</script>
