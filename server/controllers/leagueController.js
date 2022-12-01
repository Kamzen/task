const { League, Team } = require("../models");

const leagueController = {
  addLeague: async (req, res, next) => {
    try {
      const league = await League.create(req.body);

      res.status(201).json({
        success: true,
        message: "Leage saved successfully",
        league: league,
      });
    } catch (err) {
      console.log(err);
    }
  },

  addTeamToLeague: async (req, res, next) => {
    try {
      const countTeams = await Team.count({
        where: { league_id: req.body.league_id },
      });

      // console.log(countTeams);

      if (countTeams === 16) {
        return res.status(422).json({
          success: false,
          message: "Cannot add any more teams to league",
          full: countTeams,
        });
      }

      const team = await Team.create({
        ...req.body,
      });

      return res.status(201).json({
        success: false,
        message: "Team saved successfully",
        team: team,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getLeagueById: async (req, res) => {
    try {
      const { league_id } = req.params;

      const league = await League.findOne({
        where: { id: league_id },
        include: { model: Team },
        order: [
          [{ model: Team }, "points", "DESC"],
          [{ model: Team }, "goal_diff", "DESC"],
        ],
      });

      if (!league) {
        return res.status(422).json({
          success: false,
          message: "League not found",
        });
      }

      return res.status(200).json({
        success: true,
        league: league,
      });
    } catch (err) {
      console.log();
    }
  },

  updateTeam: async (req, res) => {
    try {
      const { team_id } = req.params;

      if (req.body?.match_played > 30) {
        return res.status(422).json({
          success: false,
          message: "A team cannot play more than 30 games",
        });
      }

      const team = await Team.findOne({
        where: { id: team_id },
      });

      if (!team) {
        return res.status(404).json({
          success: false,
          message: "Team not found",
        });
      }

      const update = await Team.update(
        { ...req.body },
        { where: { id: team_id }, returning: true }
      );

      return res.status(200).json({
        success: true,
        message: "Team updated",
        updatedTeam: update[1][0],
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = leagueController;
