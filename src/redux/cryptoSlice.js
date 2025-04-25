import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async () => {
  const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: 'bitcoin,ethereum,tether,xrp,binancecoin,solana',
      order: 'market_cap_desc',
      per_page: 6,
      page: 1,
      sparkline: true,
      price_change_percentage: '1h,24h,7d',
    },
  });
  return res.data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    assets: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.assets = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCrypto.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default cryptoSlice.reducer;
