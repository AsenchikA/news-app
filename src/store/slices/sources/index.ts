import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SUCCESS_CODE } from '@constants/index';
import { RootState } from 'store';
import { IGetErrorResponse, IGetSourcesResponse, ISource } from '@app-types/index';

const fetchSources = createAsyncThunk('sources/getList', async (_, { rejectWithValue }) => {
  if (!process.env.API_KEY) {
    return rejectWithValue('No API key provided');
  }

  const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}&language=en`;

  const response = await fetch(url, { method: 'GET' });

  const parsedResponse: IGetSourcesResponse | IGetErrorResponse = await response.json();

  if (response.status !== SUCCESS_CODE || parsedResponse.status !== 'ok') {
    return rejectWithValue('There is an error, try again later');
  }

  return parsedResponse;
});

interface ISourcesState {
  list: ISource[];
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
}

const initialState: ISourcesState = {
  list: [],
  status: 'idle',
};

const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.list = action.payload.sources;
        state.status = 'succeeded';
      })
      .addCase(fetchSources.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

const selectSources = (state: RootState) => state.sources.list;

const selectSourcesStatus = (state: RootState) => state.sources.status;

export { fetchSources, selectSources, selectSourcesStatus };

export default sourcesSlice.reducer;
