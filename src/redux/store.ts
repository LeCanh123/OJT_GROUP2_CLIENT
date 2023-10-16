import { configureStore,combineReducers } from '@reduxjs/toolkit'; 
import MapSlice from './MapSlice';

// Kết hợp reducer
const rootReducer = combineReducers({
    MapSlice
});


// Xuất ra store type
export type StoreType = ReturnType<typeof rootReducer>;


export const store = configureStore({
  reducer: rootReducer,
  })
