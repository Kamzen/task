// // all in one for saving time
// // reducer

import axios from "axios";

const initialState = {
  error: null,
  isLoading: null,
  message: null,
  leagues: null,
};

const leagueId = "351901da-618e-442d-b5cf-6df3002fe7a1";

const leagueReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LEAGUE_TEAMS_REQUEST":
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case "GET_LEAGUE_TEAMS_SUCCESS":
      return {
        ...state,
        error: false,
        isLoading: false,
        leagues: action.payload,
      };
    case "GET_LEAGUE_TEAMS_FAIL":
      return {
        ...state,
        error: false,
        isLoading: false,
      };
    case "ADD_TEAM_TO_LEAGUE_REQUEST":
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case "ADD_TEAM_TO_LEAGUE_SUCCESS":
      return {
        ...state,
        error: false,
        isLoading: false,
        message: "Team added successfully",
        teamAdded: true,
      };
    case "ADD_TEAM_TO_LEAGUE_FAIL":
      return {
        ...state,
        teamsFullError: true,
        isLoading: false,
        message: action.payload
      };
    case "EDIT_TEAM_TO_LEAGUE_REQUEST":
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case "EDIT_TEAM_TO_LEAGUE_SUCCESS":
      return {
        ...state,
        error: false,
        isLoading: false,
        message: "Team edited successfully",
        teamEdited: true,
      };
    case "EDIT_TEAM_TO_LEAGUE_FAIL":
      return {
        ...state,
        error: true,
        isLoading: false,
        message: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const BASE_API_URL = `http://localhost:5000`;

export const getLeagueTeams = () => async (dispatch) => {
  dispatch({ type: "GET_LEAGUE_TEAMS_REQUEST" });

  try {
    const { data } = await axios.get(
      `${BASE_API_URL}/api/dev/tables/leagues/${leagueId}`
    );

    dispatch({ type: "GET_LEAGUE_TEAMS_SUCCESS", payload: data.league });
  } catch (err) {
    console.log(err);
  }
};

export const addTeamToLeague = (formData) => async (dispatch) => {
  dispatch({ type: "ADD_TEAM_TO_LEAGUE_REQUEST" });

  try {
    const { data } = await axios.post(
      `${BASE_API_URL}/api/dev/tables/leagues/${leagueId}`,
      { ...formData, league_id: leagueId }
    );

    console.log(data);

    dispatch({ type: "ADD_TEAM_TO_LEAGUE_SUCCESS" });
    dispatch(getLeagueTeams());
  } catch (err) {
    if (err.response.status === 422) {
      dispatch({
        type: "ADD_TEAM_TO_LEAGUE_FAIL",
        payload: err.response.data.message,
      });
    }
  }
};

export const editTeam = (formData) => async (dispatch) => {
  dispatch({ type: "EDIT_TEAM_TO_LEAGUE_REQUEST" });

  try {
    const { data } = await axios.put(
      `${BASE_API_URL}/api/dev/tables//update/team/${formData.id}`,
      { ...formData, league_id: leagueId }
    );

    console.log(data);

    dispatch({ type: "EDIT_TEAM_TO_LEAGUE_SUCCESS" });
    dispatch(getLeagueTeams());
  } catch (err) {
    if (err.response.status === 422) {
      dispatch({
        type: "EDIT_TEAM_TO_LEAGUE_FAIL",
        payload: err.response.data.message,
      });
    }
  }
};

export default leagueReducer;
