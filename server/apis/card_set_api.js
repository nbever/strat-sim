const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const {TeamInputType} = require('./team_api');
const {CardSetModel, TeamModel} = require('../model');
const {CardSetType, TeamType} = require('../graphql-types');
const isNil = require('lodash/isNil');

const listCardSets = {
  type: GraphQLList(CardSetType),
  resolve: async () => {
    const sets = await CardSetModel.find().exec();
    return sets;
  }
};

const findCardSet = {
  type: CardSetType,
  args: {
    id: {type: GraphQLNonNull(GraphQLID)}
  },
  resolve: async (root, args) => {
    const set = await CardSetModel.findById(args.id);
    return set;
  }
};

const saveCardSet = {
  type: CardSetType,
  args: {
    cardSet: {
      type: new GraphQLInputObjectType({
        name: 'CardSetI',
        fields: () => ({
          id: {type: GraphQLID},
          name: {type: GraphQLString},
          year: {type: GraphQLInt}
        })
      })
    }
  },
  resolve: async (root, args) => {
    if (!isNil(args.cardSet.id)) {
      await CardSetModel.findByIdAndUpdate(
        args.cardSet.id,
        args.cardSet);

      const changedSet = CardSetModel.findOne({_id: args.cardSet.id});

      return changedSet;
    }

    const existingSet = await CardSetModel.findOne({name: args.cardSet.name,
      year: args.cardSet.year});


    if (!isNil(existingSet)) {
      throw new Error(`Card Set already exists: ${existingSet._id}`);
      return;
    }

    const newSet = await CardSetModel.create(args.cardSet)
    return newSet;
  }
};

const addTeamToSet = {
  type: CardSetType,
  args: {
    cardSet: {type: GraphQLNonNull(GraphQLID)},
    team: {type: TeamInputType}
  },
  resolve: async (root, args) => {
    const set = await CardSetModel.findById(args.cardSet);
    args.team.year = set.year;
    const existingTeam = set.teams.find((t) => {
      return t.name === team.name &&
        t.city === team.city;
    });

    if (!isNil(existingTeam)) {
      throw new Error('Team already exists');
      return;
    }

    const newTeam = await TeamModel.create(args.team);
    set.teams.push(newTeam);

    const newSet = await CardSetModel.updateOne({_id: args.cardSet}, set);
    return newSet;
  }
};

const deleteCardSet = {
  type: GraphQLBoolean,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    }
  },
  resolve: async (root, args) => {
    await CardSetModel.findByIdAndDelete(args.id);
    return true;
  }
};

module.exports = {
  listCardSets,
  findCardSet,
  saveCardSet,
  deleteCardSet,
  addTeamToSet
};
