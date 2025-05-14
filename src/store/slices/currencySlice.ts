import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export interface CurrencyRates {
  [key: string]: number;
}

export interface CurrencyState {
  from: string;
  to: string;
  amount: string;
  rates: CurrencyRates;
  available: string[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: CurrencyState = {
  from: 'USD',
  to: 'PLN',
  amount: '1',
  rates: {},
  available: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchRates = createAsyncThunk('currency/fetchRates', async () => {
  // Using vatcomply.com for free rates
  const response = await axios.get('https://api.vatcomply.com/rates');
  return response.data;
});

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setFrom(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    setTo(state, action: PayloadAction<string>) {
      state.to = action.payload;
    },
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    swapCurrencies(state) {
      const temp = state.from;
      state.from = state.to;
      state.to = temp;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload.rates;
        state.available = Object.keys(action.payload.rates).sort();
        state.lastUpdated = action.payload.date;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rates';
      });
  },
});

export const {setFrom, setTo, setAmount, swapCurrencies} =
  currencySlice.actions;
export default currencySlice.reducer;
