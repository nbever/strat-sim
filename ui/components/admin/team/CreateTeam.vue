<template>
  <div class="page">
    <div class="form" enctype="multipart/form-data">
      <md-field class="col-width">
        <label>City</label>
        <md-input type="text" maxlength="48" v-model="city"></md-input>
      </md-field>
      <md-field class="col-width">
        <label>Name</label>
        <md-input type="text" maxlength="48" v-model="name"></md-input>
      </md-field>

      <md-radio v-model="logoType" value="preset">Use pre-existing logo</md-radio>
      <md-radio v-model="logoType" value="upload">Upload new logo</md-radio>

      <md-field v-if="isPreset" class="col-width">
        <label for="logoSelect">Logo</label>
        <md-select v-model="logo" id="logoSelect" :disabled="!isPreset"
        >
        </md-select>
      </md-field>

      <md-field v-if="!isPreset" class="col-width">
        <label for="logoUpload">Upload Logo</label>
        <md-file v-model="logoFile.name" id="logoUpload" :disabled="isPreset"
          name="logoUpload"
          placeholder="Upload a new logo"
          @md-change="fileChosen($event)"
        >
        </md-file>
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
        name: '',
        logoType: 'preset',
        logo: null,
        logoFile: {name: ''}
      };
    },
    computed: {
      isPreset: function() {
        return this.logoType === 'preset';
      }
    },
    methods: {
      fileChosen: function($e) {
        this.logoFile = $e[0];
      },
      save: async function() {

        const isPreset = this.logoType === 'preset';

        const result = await this.addTeamToCardSet(
          this.$route.params.cardSetId,
          {
            city: this.city,
            name: this.name,
            logo: isPreset === true ? this.logo : this.logoFile,
            upload: !isPreset
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