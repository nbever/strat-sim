const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');

const {
  PlayerModel,
  LeagueModel,
  SeasonModel
} = require('../model');

const {
  LeagueType,
  SeasonType
} = require('../graphql-types');

const listLeagues = {
  type: GraphQLList(LeagueType),
  resolve: (root, args, context, info) => {
    return LeagueModel.find().exec();
  }
};

const saveLeague = {
  type: LeagueType,
  args: {
    name: {
      type: GraphQLString
    },
    id: {
      type: GraphQLID
    }
  },
  resolve: async (root, args, context, info) => {

    if (isNil(args.id)) {
      const newLeague = await LeagueModel.create({name: args.name});
      return newLeague;
    }

    return;
  }
}

const deleteLeague ={
  type: GraphQLBoolean,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve: async (root, args) => {
    await LeagueModel.findByIdAndDelete(args.id);
    return true;
  }
}

module.exports = {
  listLeagues,
  saveLeague,
  deleteLeague
};
