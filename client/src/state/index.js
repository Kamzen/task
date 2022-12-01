import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "./League";


export const store = configureStore({
    reducer: {
        leagueTable: leagueReducer
    }
})