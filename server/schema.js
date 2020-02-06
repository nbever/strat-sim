const {
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql');

const {
  listPlayers,
  findPlayer,
  savePlayer
} = require('./apis/player_api');

const {
  listLeagues,
  saveLeague,
  deleteLeague
} = require('./apis/league_api');

const {
  listCardSets,
  saveCardSet,
  deleteCardSet,
  findCardSet,
  addTeamToSet
} = require('./apis/card_set_api');

const {
  listTeams,
  saveTeam,
  deleteTeam
} = require('./apis/team_api');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      player: findPlayer,
      players: listPlayers,
      leagues: listLeagues,

      cardSets: listCardSets,
      cardSet: findCardSet,
      
      teams: listTeams
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      league: saveLeague,
      deleteLeague: deleteLeague,

      saveCardSet: saveCardSet,
      addTeamToCardSet: addTeamToSet,
      deleteCardSet: deleteCardSet,

      saveTeam: saveTeam,
      deleteTeam: deleteTeam
    }
  })
});

module.exports = {
  schema
};
