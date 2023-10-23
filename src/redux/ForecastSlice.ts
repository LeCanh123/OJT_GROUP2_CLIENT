import { createSlice } from "@reduxjs/toolkit";
import { ForecastType } from "../interface/Forecast";

const initialState: { data: null | undefined | ForecastType[] } = {
    data: null,
};

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
        addForecast: function (state, action) {
            state.data?.push(action.payload);
        },
        setDataForecast: function (state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
        updateForecast: (state, action) => {
            const updatedForecast = action.payload;
            const updatedData = state.data?.map((category) => {
                if (category.id === updatedForecast.id) {
                    return updatedForecast;
                }
                return category;
            });
            state.data = updatedData;
        },
    },
});

export const forecastAction = {
    ...forecastSlice.actions,
};

export const forecastReducer = forecastSlice.reducer;
