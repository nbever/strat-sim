<template>
  <div class="page" v-if="ok">

    <md-dialog-confirm
      :md-active="deleteOnDeck"
      md-title="Are you sure?"
      md-content="This will remove the team and all players associated with it.  Are you sure you want to do this?"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="cancel"
      @md-confirm="doDelete">
    </md-dialog-confirm>

    <div class="flex-row">
        <div class="flex-row" v-if="!editMode">
          <info-label label="Name" :value="this.cardset.name"></info-label>
          <info-label label="Year" :value="this.cardset.year"></info-label>
        </div>
        <div class="flex-row" v-else>
          <md-field class="space">
            <label>Name</label>
            <md-input v-model="tmpName" size="24" maxlength="48"></md-input>
          </md-field>
          <md-field>
            <label>Year</label>
            <md-input v-model="tmpYear" type="number" size="6" maxlength="4"></md-input>
          </md-field>
        </div>
        <div class="text-left bottom-line">
          <md-button class="md-primary md-icon-button" @click="editOrSave()">
            <md-icon class="icon-createmode_editedit" v-if="!editMode"></md-icon>
            <md-icon class="icon-save" v-else></md-icon>
            <md-tooltip md-direction="bottom">Edit this card set metadata</md-tooltip>
          </md-button>
          <md-button class="md-primary md-icon-button" @click="cancelEdit()" v-if="editMode">
            <md-icon class="icon-clearclose"></md-icon>
            <md-tooltip md-direction="bottom">Cancel editing</md-tooltip>
          </md-button>
        </div>
    </div>

    <div class="table">
      <div class="header">Teams</div>
      <div>
        <md-button class="md-primary md-icon-button" @click="addTeam()">
          <md-icon class="icon-add_circle_outlinecontrol_point"/>
          <md-tooltip md-direction="bottom">Add a team to this cardset</md-tooltip>
        </md-button>
      </div>
      <md-table v-model="cardset.teams" md-sort="name" md-sort-order="desc" md-card md-fixed-header
        @md-selected="teamSelected"
      >
        <md-table-empty-state
          md-label="No teams have been added!"
          md-description="Click the button above to add a new team to this cards set."
        >
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{item}" md-selectable="single">
          <md-table-cell md-label="Logo">
            {{item.logo}}
          </md-table-cell>          
          <md-table-cell md-label="City" md-sort-by="city">
            {{ item.city }}
          </md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">
            {{item.name}}
          </md-table-cell>
          <md-table-cell md-label="# of Players">
            {{item.players.length}}
          </md-table-cell>
          <md-table-cell>
            <div class="button-row">
              <md-button class="md-icon-button md-dense" @click="deleteRequested(item)">
                <md-icon 
                  class="icon-clearclose"
                >
                </md-icon>
                <md-tooltip md-direction="bottom">Delete '{{item.name}}'</md-tooltip>
              </md-button>
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
  import isNil from 'lodash/isNil';
  import InfoLabel from '../common/InfoLabel';

  export default {
    name: 'ViewCardSet',
    components: {
      'info-label': InfoLabel
    },
    data: function() {
      return {
        cardset: null,
        toDelete: null,
        editMode: false,
        tmpName: '',
        tmpYear: ''
      }
    },
    computed: {
      ok: function() {
        return !isNil(this.cardset);
      },
      deleteOnDeck: function() {
        return !isNil(this.toDelete);
      }
    },
    methods: {
      refresh: async function() {
        this.cardset = await this.getCardSet(this.$route.params.cardSetId, true);
        this.tmpYear = this.cardset.year;
        this.tmpName = this.cardset.name;
      },
      doDelete: async function() {
        const rez = await this._deleteTeam(this.$route.params.cardSetId, this.toDelete._id);
        this.cancel();
      },
      deleteRequested: function(team) {
        this.toDelete = team;
      },
      cancel: function() {
        this.toDelete = null;
      },
      addTeam: function() {
        this.$router.push(`${this.$route.params.cardSetId}/addteam`);
      },
      editOrSave: async function() {
        if (this.editMode === true) {
          await this._saveCardSetInfo({id: this.$route.params.cardSetId,
            year: this.tmpYear, name: this.tmpName});
          await this.refresh();
        }
        else {
          this.tmpName = this.cardset.name;
          this.tmpYear = this.cardset.year;
        }

        this.editMode = !this.editMode;
      },
      cancelEdit: function() {
        this.editMode = false;
      },
      teamSelected: function() {
      }
    },
    mounted: function() {
      this.refresh();
    }
  }
</script>

<style lang="scss" scoped>

  .table {
    padding-top: 12px;
  }

  .bottom-line {
    padding-top: 17px;
  }

  .space {
    margin-right: 12px;
  }

</style>