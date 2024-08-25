import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articles';
import sourcesReducer from './slices/sources';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    sources: sourcesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
