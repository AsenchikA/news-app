import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SUCCESS_CODE } from '@constants/index';
import { RootState } from 'store';
import { IArticle, IGetArticlesResponse, IGetErrorResponse } from '@app-types/index';

const fetchArticles = createAsyncThunk<
  IGetArticlesResponse,
  { searchInput?: string; from?: string; to?: string; source?: string },
  { rejectValue: string }
>('articles/getList', async ({ searchInput, from, to, source }, { rejectWithValue }) => {
  if (!process.env.API_KEY) {
    return rejectWithValue('No API key provided');
  }

  let url = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.API_KEY}`;

  if (searchInput) {
    url = `${url}&q=${searchInput}`;
  }

  if (from) {
    url = `${url}&from=${from}`;
  }

  if (to) {
    url = `${url}&to=${to}`;
  }

  if (source) {
    url = `${url}&sources=${source}`;
  } else {
    url = `${url}&country=us`;
  }

  const response = await fetch(url, { method: 'GET' });

  const parsedResponse: IGetArticlesResponse | IGetErrorResponse = await response.json();

  if (response.status !== SUCCESS_CODE || parsedResponse.status !== 'ok') {
    return rejectWithValue('There is an error, try again later');
  }

  return parsedResponse;
});

interface IArticlesState {
  list: IArticle[];
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
}

const initialState: IArticlesState = {
  list: [],
  status: 'idle',
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.list = action.payload.articles;
        state.status = 'succeeded';
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

const selectArticles = (state: RootState) => state.articles.list;

const selectArticlesStatus = (state: RootState) => state.articles.status;

export { fetchArticles, selectArticles, selectArticlesStatus };

export default articlesSlice.reducer;
