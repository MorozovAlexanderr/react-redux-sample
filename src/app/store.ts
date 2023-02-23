import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { todoReducer } from '../features/todos/todosSlice';
import { categoriesReducer } from '../features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    categories: categoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
