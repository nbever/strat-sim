<template>
  <div class="page">

    <md-dialog-confirm
      :md-active="deleteOnDeck"
      md-title="Are you sure?"
      md-content="This will remove the cardset and all teams and players associated with it.  Are you sure you want to do this?"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="cancel"
      @md-confirm="doDelete">
    </md-dialog-confirm>

    <div class="header">Cardsets</div>
    <div>
      <md-button class="md-primary md-icon-button" @click="createCardSet()">
        <md-icon class="icon-add_circle_outlinecontrol_point"/>
        <md-tooltip md-direction="bottom">Create a new Card Set</md-tooltip>
      </md-button>
    </div>
    <md-table v-model="cardsets" md-sort="name" md-sort-order="desc" md-card md-fixed-header
      @md-selected="cardSetSelected"
    >
      <md-table-row slot="md-table-row" slot-scope="{item}" md-selectable="single">
        <md-table-cell md-label="Year" md-sort-by="year">
          {{ item.year }}
        </md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">
          {{item.name}}
        </md-table-cell>
        <md-table-cell>
          <div class="button-row">
            <md-button class="md-icon-button md-dense" @click="deleteCardset(item)">
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
</template>

<script>
  import isNil from 'lodash/isNil';

  export default {
    data: function() {
      return {
        cardsets: [],
        toDelete: null
      }
    },
    computed: {
      deleteOnDeck: function() {
        return !isNil(this.toDelete);
      }
    },
    methods: {
      refresh: async function() {
        this.cardsets = await this.getCardSets();
      },
      createCardSet: function() {
        this.$router.push({name: 'create-card-set'});
      },
      deleteCardset: function(item) {
        this.toDelete = item;
      },
      doDelete: async function() {
        await this.deleteCardSet(this.toDelete._id);
        this.cancel();
        this.refresh();
      },
      cancel: function() {
        this.toDelete = null;
      },
      cardSetSelected: function(cardset) {
        this.$router.push({name: 'view-cardset', params: {cardSetId: cardset._id}});
      }
    },
    mounted: function() {
      this.refresh();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../variables';

</style>
