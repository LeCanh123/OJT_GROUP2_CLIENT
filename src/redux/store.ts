import { configureStore, combineReducers } from "@reduxjs/toolkit";
import MapSlice from "./MapSlice";
import { categoryReducer } from "./CategorySlice";

// Kết hợp reducer
const rootReducer = combineReducers({
    MapSlice,
    categoryStore: categoryReducer,
});

// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});
