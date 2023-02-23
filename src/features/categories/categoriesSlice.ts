import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Category, CategoryFetchStatus } from './categories.types';
import { RootState } from '../../app/store';

interface CategoriesState {
  fetchStatus: CategoryFetchStatus;
}

const categoriesAdaptor = createEntityAdapter<Category>();

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const res = await fetch('/categories', { method: 'GET' });
    return res.json();
  },
  {
    condition: (_, { getState }) => {
      const { categories } = getState() as RootState;
      if (
        categories.fetchStatus === CategoryFetchStatus.Loading ||
        categories.fetchStatus === CategoryFetchStatus.Succeeded
      ) {
        return false;
      }
    },
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdaptor.getInitialState<CategoriesState>({
    fetchStatus: CategoryFetchStatus.Idle,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchStatus = CategoryFetchStatus.Loading;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.fetchStatus = CategoryFetchStatus.Succeeded;
          categoriesAdaptor.upsertMany(state, action.payload);
        }
      )
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchStatus = CategoryFetchStatus.Failed;
      });
  },
});

export const { selectAll: selectCategories } = categoriesAdaptor.getSelectors(
  (state: RootState) => state.categories
);

export const { reducer: categoriesReducer } = categoriesSlice;
