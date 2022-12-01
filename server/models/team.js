'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({League}) {
      // define association here

      this.belongsTo(League, {
        foreignKey: 'league_id'
      })
    }
  }
  Team.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    league_id: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true
    },
    team_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    match_played: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goal_diff: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Team',
    tableName: 'teams',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
  });
  return Team;
};