const {
  GraphQLID,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

const {
  TeamModel, PlayerModel
} = require('../model');

const {
  TeamType
} = require('../graphql-types');

const {
  PlayerInputType
} = require('./player_api');

const TeamInputType = new GraphQLInputObjectType({
  name: 'TeamInputType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    city: {type: GraphQLString},
    logo: {type: GraphQLString},
    year: {type: GraphQLInt}
  })
});

const listTeams = {
  type: GraphQLList(TeamType),
  resolve: (root, args, context, info) => {
    return TeamModel.find().exec();
  }
};

const saveTeam = {
  type: TeamType,
  args: {
    team: {
      type: new GraphQLInputObjectType({
        name: 'TeamI',
        fields: () => ({
          id: {type: GraphQLID},
          name: {type: GraphQLString},
          city: {type: GraphQLString},
          logo: {type: GraphQLString},
          year: {type: GraphQLInt},
          salary: {type: GraphQLInt}
        })
      })
    }
  },
  resolve: async (root, args, context, info) => {

    if (isNil(args.team.id)) {
      const newTeam = await TeamModel.create(team);
      return newTeam;
    }

    const changedTeam = await TeamModel.findByIdAndUpdate(
      args.team.id, args.team);
    return changedTeam;
  }
}

const deleteTeam = {
  type: GraphQLBoolean,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, args) => {
    await TeamModel.findByIdAndDelete(args.id);
    return true;
  }
}

const addPlayerToTeam = {
  type: TeamType,
  args: {
    team: {type GraphQLNonNull(GraphQLID)},
    player: {type: PlayerInputType}
  },
  resolve: async (root, args) => {
    const {team, player} = args;

    const existingPlayer = PlayerModel.findOne({
      firstName: player.firstName,
      lastName: player.lastName,
      year: player.year
    });

    if (!isNil(existingPlayer)) {
      throw new Error(`Player already exists: ${existingPlayer._id}`);
      return;
    }

    const newPlayer = await PlayerModel.create(player);
    const fullTeam = await TeamModel.findOne({_id: team});

    if (isNil(team)) {
      throw new Error(`Team not found: ${team}`);
      return;
    }

    fullTeam.players.push(newPlayer._id);
    await TeamModel.findByIdAndUpdate(team, fullTeam);
    const newTeam = await TeamModel.findOne({_id: team});

    return newTeam;
  }
};

module.exports = {
  listTeams,
  saveTeam,
  deleteTeam,

  TeamInputType
};
