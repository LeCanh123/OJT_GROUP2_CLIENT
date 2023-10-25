import logger from "redux-logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import MapSlice from "./MapSlice";
import { categoryReducer } from "./CategorySlice";
import { forecastReducer } from "./ForecastSlice";
import { authUserReducer } from "./AuthSlice";

// Kết hợp reducer
const rootReducer = combineReducers({
  MapSlice,
  categoryStore: categoryReducer,
  forecastStore: forecastReducer,
  authUserStore: authUserReducer,
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
