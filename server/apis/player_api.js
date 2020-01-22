const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const {
  PlayerModel
} = require('../model');

const {
  PlayerType
} = require('../graphql-types');

const PlayerInputType = new GraphQLInputObjectType({
  name: 'PlayerInputType',
    fields: () => ({
    id: {type: GraphQLID},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    card: {type: PlayerCardType},
    year: {type: GraphQLInt}
  })
});

const listPlayers =  {
  type: GraphQLList(PlayerType),
  resolve: (root, args,context, info) => {
    const players = PlayerModel.find().exec();
    return players;
  }
};

const findPlayer =  {
  type: PlayerType,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, context, info) => {
    const player = await PlayerModel.findById(args.id).exec();
    return player;
  }
};

const savePlayer = {
  type: PlayerType,
  args: {
    id: {type: GraphQLID},
    player: PlayerInputType
  },
  resolve: (root, args) => {

    const {_id, ...newPlayer} = args.player;
    await PlayerModel.findOneAndUpdate({_id: id}, newPlayer, {upsert: true});
    const player = PlayerModel.findOne({_id: id});
    return player;
  }
};

module.exports = {
  listPlayers,
  findPlayer,
  savePlayer

  PlayerInputType
};
