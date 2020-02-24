import {sFetch, toQL} from './StratFetch';
import isNil from 'lodash/isNil';

export default {
  _deleteTeam: async function(cardSetId, teamId) {

    const set = await sFetch('/graphql', 'POST',
      {query: `mutation{deleteTeam(cardSetId:"${cardSetId}",teamId:"${teamId}")}`},
      this, this.$root);

    return set;
  }
};