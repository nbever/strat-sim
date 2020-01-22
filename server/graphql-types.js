const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');

const RangeType = new GraphQLObjectType({
  name: 'Range',
  fields: {
    low: {type: GraphQLInt},
    high: {type: GraphQLInt}
  }
});

const DiceShotResult = new GraphQLObjectType({
  name: 'DiceShotResults',
  fields: {
    d2: {type: GraphQLString},
    d3: {type: GraphQLString},
    d4: {type: GraphQLString},
    d5: {type: GraphQLString},
    d6: {type: GraphQLString},
    d7: {type: GraphQLString},
    d8: {type: GraphQLString},
    d9: {type: GraphQLString},
    d10: {type: GraphQLString},
    d11: {type: GraphQLString},
    d12: {type: GraphQLString}
  }
});

const ReboundType = new GraphQLObjectType({
  name: 'Rebound',
  fields: {
    position: {type: GraphQLString},
    rating: {type: GraphQLInt}
  }
});

const ShootingType = new GraphQLObjectType({
  name: 'Shooting',
  fields: {
    threes: {type: GraphQLString},
    ft: {type: GraphQLString},
    o: {type: DiceShotResult},
    p: {type: DiceShotResult},
    i: {type: DiceShotResult},
    f: {type:DiceShotResult}
  }
});

const DefenseType = new GraphQLObjectType({
  name: 'Defense',
  fields: {
    steal: {type: RangeType},
    passOnePlus: {type: RangeType},
    foul: {type: RangeType},
    passOnePlusTwo: {type: RangeType},
    positionShot: {type: RangeType},
    turnover: {type: RangeType}
  }
});

const PassingType = new GraphQLObjectType({
  name: 'Passing',
  fields: {
    stolen: {type: RangeType},
    turnover: {type: RangeType},
    dazzler: {type: RangeType},
    open: {type: RangeType},
    shot: {type: RangeType}
  }
});

const FastbreakType = new GraphQLObjectType({
  name: 'Fastbreak',
  fields: {
    turnoverLF: {type: RangeType},
    turnoverC: {type: RangeType},
    stolen: {type: RangeType},
    turnover: {type: RangeType},
    dazzler: {type: RangeType},
    fbShot: {type: RangeType}
  }
});

const XColumnType = new GraphQLObjectType({
  name: 'XColumn',
  fields: {
    oGood: {type: GraphQLString},
    oBlocked: {type: GraphQLString},
    pGood: {type: GraphQLString},
    pBlocked: {type: GraphQLString},
    iGood: {type: GraphQLString},
    iBlocked: {type: GraphQLString},
    fGood: {type: GraphQLString},
    fBlocked: {type: GraphQLString},
  }
});

const PlayerCardType = new GraphQLObjectType({
  name: 'PlayerCard',
  fields: {
    shooting: {type: GraphQLInt},
    shootingTendency: {type: GraphQLString},
    assists: {type: GraphQLString},
    blocks: {type: GraphQLString},
    offensiveRebound: { type: new GraphQLList(ReboundType)},
    defensiveRebound: {type: new GraphQLList(ReboundType)},
    shotChart: {type: ShootingType},
    rest: {type: GraphQLInt},
    defense: {type: DefenseType},
    passing: {type: PassingType},
    fastbreak: {type: FastbreakType},
    xColumns: {type: XColumnType}
  }
});

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: {
    _id: {type: GraphQLID},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    card: {type: PlayerCardType},
    year: {type: GraphQLInt}
  }
});

const PlayerLiteType = new GraphQLObjectType({
  name: 'PlayerLite',
  fields: {
    _id: {type: GraphQLID},
    playerId: {type: GraphQLID},
    salary: {type: GraphQLInt},
    yearsRemaining: {type: GraphQLInt}
  }
});

const TeamDefenseType = new GraphQLObjectType({
  name: 'TeamDefense',
  fields: {
    o: {type: DiceShotResult},
    p: {type: DiceShotResult},
    i: {type: DiceShotResult},
    f: {type: DiceShotResult},
    threes: {type: DiceShotResult}
  }
})

const TeamCardType = new GraphQLObjectType({
  name: 'TeamCard',
  fields: {
    normal: {type: TeamDefenseType},
    sag: {type: TeamDefenseType},
    close: {type: TeamDefenseType}
  }
});

const InstructionType = new GraphQLObjectType({
  name: 'Instructions',
  fields: {
    type: {type: GraphQLString},
    assistPosition: {type: GraphQLString},
    assistRating: {type: GraphQLInt},
    value: {type: GraphQLInt}
  }
});

const ControlType = new GraphQLObjectType({
  name: 'Control',
  fields: {
    position: {type: GraphQLString},
    instruction: {type: InstructionType}
  }
});

const CardType = new GraphQLObjectType({
  name: 'Card',
  fields: {
    _id: {type: GraphQLID},
    home: {type: new GraphQLList(InstructionType)},
    visit: {type: new GraphQLList(InstructionType)},
    pressReading: {type: InstructionType},
    pressNumber: {type: GraphQLInt},
    pressControl: {type: ControlType},
    normalControl: {type: ControlType},
    fbControl: {type: ControlType},
    cardNumber: {type: GraphQLInt},
    rebound: {type: new GraphQLList(GraphQLString)},
    fbAssistPosition: {type: GraphQLString},
    fbAssistRating: {type: GraphQLInt},
    fbDefender: {type: GraphQLString}
  }
});

const CardStackType = new GraphQLObjectType({
  name: 'CardStack',
  fields: {
    _id: {type: GraphQLID},
    used: {type: new GraphQLList(CardType)},
    deck: {type: new GraphQLList(CardType)}
  }
});

const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    city: {type: GraphQLString},
    logo: {type: GraphQLString},
    year: {type: GraphQLInt},
    players: {type: new GraphQLList(PlayerLiteType)},
    card: {type: TeamCardType}
  }
});

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: {
    _id: {type: GraphQLID},
    homeTeam: {type: GraphQLID},
    awayTeam: {type: GraphQLID},
    homeScore: {type: GraphQLInt},
    awayScore: {type: GraphQLInt},
    cardStack: {type: CardStackType},
    quarter: {type: GraphQLInt},
    finished: {type: GraphQLBoolean}
  }
});

const StatType = new GraphQLObjectType({
  name: 'Stat',
  fields: {
    _id: {type: GraphQLID},
    games: {type: GraphQLInt},
    points: {type: GraphQLInt},
    rebounds: {type: GraphQLInt},
    steals: {type: GraphQLInt},
    assists: {type: GraphQLInt},
    turnovers: {type: GraphQLInt},
    fieldGoalsMade: {type: GraphQLInt},
    fieldGoalsMissed: {type: GraphQLInt},
    threesMade: {type: GraphQLInt},
    threesMissed: {type: GraphQLInt},
    fouls: {type: GraphQLInt},
    freeThrowsMade: {type: GraphQLInt},
    freeThrowsMissed: {type: GraphQLInt},
    blocks: {type: GraphQLInt},
    minutes: {type: GraphQLInt}
  }
})

const TeamStatType = new GraphQLObjectType({
  name: 'TeamStat',
  fields: {
    _id: {type: GraphQLID},
    teamId: {type: GraphQLID},
    gameId: {type: GraphQLID},
    statistic: {type: StatType}
  }
});

const CardSetType = new GraphQLObjectType({
  name: 'CardSet',
  fields: {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    year: {type: GraphQLInt},
    leagueName: {type: GraphQLString},
    teams: {type: new GraphQLList(GraphQLID)}
  }
});

const PlayerStatType = new GraphQLObjectType({
  name: 'PlayerStat',
  fields: {
    playerId: {type: GraphQLID},
    teamId: {type: GraphQLID},
    gameId: {type: GraphQLID},
    statistic: {type: StatType}
  }
});

const SeasonType = new GraphQLObjectType({
  name: 'Season',
  fields: {
    _id: {type: GraphQLID},
    teams: {type: new GraphQLList(TeamType)},
    year: {type: GraphQLInt},
    salaryCap: {type: GraphQLInt},
    inGames: {type: GraphQLInt},
    outGames: {type: GraphQLInt},
    bestOf: {type: GraphQLString},
    playoffTeams: {type: GraphQLInt},
    teamStats: {type: new GraphQLList(TeamStatType)},
    playerStats: {type: new GraphQLList(PlayerStatType)},
    schedule: {type: new GraphQLList(GameType)},
    players: {type: new GraphQLList(PlayerType)}
  }
});

const LeagueType = new GraphQLObjectType({
  name: 'League',
  fields: {
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    seasons: {type: new GraphQLList(SeasonType)}
  }
});

module.exports = {
  RangeType,
  DiceShotResult,
  ReboundType,
  DefenseType,
  ShootingType,
  PassingType,
  FastbreakType,
  XColumnType,
  PlayerType,
  CardType,
  SeasonType,
  PlayerStatType,
  PlayerLiteType,
  PlayerCardType,
  CardStackType,
  InstructionType,
  ControlType,
  GameType,
  SeasonType,
  TeamStatType,
  TeamType,
  StatType,
  LeagueType,
  CardSetType
};
