const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diceShotResultSchema = new Schema({
  d2: String,
  d3: String,
  d4: String,
  d5: String,
  d6: String,
  d7: String,
  d8: String,
  d9: String,
  d10: String,
  d11: String,
  d12: String
});

const shootingSchema = new Schema({
  threes: String,
  ft: String,
  o: diceShotResultSchema,
  p: diceShotResultSchema,
  i: diceShotResultSchema,
  f: diceShotResultSchema
});

const reboundSchema = new Schema({
  rating: Number,
  position: String
});

const rangeSchema = new Schema({
  low: Number,
  high: Number
});

const defenseSchema = new Schema({
  steal: rangeSchema,
  passOnePlus: rangeSchema,
  foul: rangeSchema,
  passOnePlusTwo: rangeSchema,
  positionShot: rangeSchema,
  turnover: rangeSchema
});

const passingSchema = new Schema({
  stolen: rangeSchema,
  turnover: rangeSchema,
  dazzler: rangeSchema,
  open: rangeSchema,
  shot: rangeSchema
});

const fastbreakSchema = Schema({
  turnoverLF: rangeSchema,
  turnoverC: rangeSchema,
  stolen: rangeSchema,
  turnover: rangeSchema,
  dazzler: rangeSchema,
  fbShot: rangeSchema
});

const xColumSchema = new Schema({
  oGood: String,
  oBlocked: String,
  pGood: String,
  pBlocked: String,
  iGood: String,
  iBlocked: String,
  fGood: String,
  fBlocked: String
});

const cardSchema = new Schema({
  shooting: Number,
  shootingTendency: String,
  assists: String,
  blocks: String,
  rest: Number,
  offensiveRebound: [reboundSchema],
  defensiveRebound: [reboundSchema],
  shotChart: shootingSchema,
  defense: defenseSchema,
  passing: passingSchema,
  fastbreak: fastbreakSchema,
  xColumns: xColumSchema
});

const teamDefenseSchema = new Schema({
  o: diceShotResultSchema,
  p: diceShotResultSchema,
  i: diceShotResultSchema,
  f: diceShotResultSchema,
  threes: diceShotResultSchema
});

const teamCardSchema = new Schema({
  normal: teamDefenseSchema,
  sag: teamDefenseSchema,
  close: teamDefenseSchema
});

///////////////////////////////////////

const playerSchema = new Schema({
  firstName: String,
  lastName: String,
  card: cardSchema,
  year: Number
});

const PlayerModel = mongoose.model('player', playerSchema, 'players');

const seasonSchema = new Schema({
  year: Number,
  salaryCap: Number,
  inGames: Number,
  outGames: Number,
  bestOf: Number,
  playoffTeams: Number,
  players: [playerSchema]
});
const SeasonModel = mongoose.model('season', seasonSchema, 'seasons');

const leagueSchema = new Schema({
  name: String,
  seasons: [seasonSchema]
});
const LeagueModel = mongoose.model('league', leagueSchema, 'leagues');

const teamSchema = new Schema({
  name: String,
  city: String,
  logo: String,
  year: Number,
  players: [playerSchema],
  salary: Number,
  card: teamCardSchema
});
const TeamModel = mongoose.model('team', teamSchema, 'teams');

const cardSetSchema = new Schema({
  name: String,
  year: Number,
  teams: [Schema.ObjectId]
});
const CardSetModel = mongoose.model('cardSet', cardSetSchema, 'cardSets');

module.exports = {
  PlayerModel,
  LeagueModel,
  SeasonModel,
  CardSetModel,
  TeamModel
};
