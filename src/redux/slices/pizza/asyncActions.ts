import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzaParams } from './slice';
import { TPizza } from './types';

export const fetchPizzas = createAsyncThunk<TPizza[], FetchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params, thunkApi) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<TPizza[]>(
      `https://630fb35336e6a2a04ee0239b.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    if (!data.length) {
      return thunkApi.rejectWithValue('error');
    }

    return data;
  },
);
