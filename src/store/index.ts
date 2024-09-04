import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articles';
import sourcesReducer from './slices/sources';

const rootReducer = combineReducers({
  articles: articlesReducer,
  sources: sourcesReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
