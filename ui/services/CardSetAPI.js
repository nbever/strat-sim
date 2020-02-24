import {sFetch, toQL} from './StratFetch';
import isNil from 'lodash/isNil';

export default {
  getCardSets: async function() {

    const cardSets = await sFetch('/graphql', 'POST',
      {query: '{cardSets{_id, name, year}}'}, this, this.$root, 
      'Unknown Error');

    console.log(JSON.stringify(cardSets));

    return isNil(cardSets) || isNil(cardSets.cardSets) ?
      [] : cardSets.cardSets;
  },
  getCardSet: async function(id, full = true) {

    const fieldString = full === true ?
      '_id,name,year,teams{_id,name,city,logo,players{_id}}'
      :
      '_id,name,year,teams{_id}';

    const fullCardSet = await sFetch('/graphql', 'POST',
      {query: `{cardSet(id: "${id}"){${fieldString}}}`}, this, this.$root);

    return fullCardSet.cardSet;
  },
  createCardSet: async function(cardset) {

    const stringSet = toQL(cardset);
    const newCardSet = await sFetch('/graphql', 'POST',
        {query: `mutation{saveCardSet(cardSet:${stringSet}){_id, name, year}}`},
        this, this.$root, 'Unknown');
  },
  deleteCardSet: async function(id) {

    await sFetch('/graphql', 'POST', 
      {query: `mutation{deleteCardSet(id:"${id}")}`}, this, this.$root, 'Uknown');
  },
  addTeamToCardSet: async function(cardSetId, team) {
    const teamString = toQL(team);
    const result = await sFetch('/graphql', 'POST',
      {query: `mutation{addTeamToCardSet(cardSet: "${cardSetId}", team:${teamString}){_id}}`},
      this, this.$root);

    return result;
  },
  _saveCardSetInfo: async function(cardset) {

    const cardString = toQL(cardset);
    const result = await sFetch('/graphql', 'POST',
      {query: `mutation{saveCardSet(cardSet: ${cardString}){_id}}`},
      this, this.$root);

    return result;
  }
};