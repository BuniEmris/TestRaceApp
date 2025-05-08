import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Race, ApiResponse} from '../types/api';
import {api} from '../services/api';

interface RacesState {
  races: Race[];
  loading: boolean;
  error: string | null;
  total: number;
  offset: number;
  limit: number;
  selectedDriverId: string | null;
}

const initialState: RacesState = {
  races: [],
  loading: false,
  error: null,
  total: 0,
  offset: 0,
  limit: 30,
  selectedDriverId: null,
};

export const fetchDriverRaces = createAsyncThunk(
  'races/fetchDriverRaces',
  async ({
    driverId,
    offset,
    limit,
  }: {
    driverId: string;
    offset: number;
    limit: number;
  }) => {
    const response = await api.getDriverRaces(driverId, offset, limit);
    return response;
  },
);

const racesSlice = createSlice({
  name: 'races',
  initialState,
  reducers: {
    setSelectedDriver: (state, action) => {
      state.selectedDriverId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDriverRaces.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverRaces.fulfilled, (state, action) => {
        state.loading = false;
        state.races = action.payload.MRData.RaceTable?.Races || [];
        state.total = parseInt(action.payload.MRData.total);
        state.offset = parseInt(action.payload.MRData.offset);
        state.limit = parseInt(action.payload.MRData.limit);
      })
      .addCase(fetchDriverRaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch races';
      });
  },
});

export const {setSelectedDriver} = racesSlice.actions;
export default racesSlice.reducer;
