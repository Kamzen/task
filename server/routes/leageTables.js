const { Router } = require("express");
const leagueController = require("../controllers/leagueController");

const LeagueTablesRouter = Router();

LeagueTablesRouter.post("/leagues", leagueController.addLeague);
LeagueTablesRouter.post('/leagues/:league_id', leagueController.addTeamToLeague)
LeagueTablesRouter.get('/leagues/:league_id', leagueController.getLeagueById)
LeagueTablesRouter.put('/update/team/:team_id', leagueController.updateTeam)

module.exports = LeagueTablesRouter;
