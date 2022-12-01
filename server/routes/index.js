
const { Router } = require('express');
const LeagueTablesRouter = require('./leageTables');

const AppRouter = Router();


AppRouter.use('/tables', LeagueTablesRouter)

module.exports = AppRouter