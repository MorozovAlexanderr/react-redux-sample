import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
  Selector,
} from '@reduxjs/toolkit';
import {
  Todo,
  TodoFilters,
  TodosFetchStatus,
  TodoStatusFilter,
} from './todos.types';
import { RootState } from 'src/app/store';

interface TodosState {
  fetchStatus: TodosFetchStatus;
  filters: TodoFilters;
}

const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const res = await fetch('/todos', { method: 'GET' });
    return res.json();
  },
  {
    condition: (_, { getState }) => {
      const { todos } = getState() as RootState;
      if (
        todos.fetchStatus === TodosFetchStatus.Loading ||
        todos.fetchStatus === TodosFetchStatus.Succeeded
      ) {
        return false;
      }
    },
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (data: { title: string; categoryId: string }) => {
    const res = await fetch('/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        categoryId: data.categoryId,
      }),
    });
    return res.json();
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState<TodosState>({
    fetchStatus: TodosFetchStatus.Idle,
    filters: {
      status: TodoStatusFilter.All,
      categoryId: null,
    },
  }),
  reducers: {
    updateTodoStatus: (
      state,
      action: PayloadAction<{ id: string; status: boolean }>
    ) => {
      const { id, status } = action.payload;
      const existingTodo = state.entities[id];
      if (existingTodo) {
        existingTodo.isCompleted = status;
      }
    },
    removeTodo: todosAdapter.removeOne,
    changeStatusFilter: (state, action: PayloadAction<TodoStatusFilter>) => {
      state.filters.status = action.payload;
    },
    changeCategoryFilter: (state, action: PayloadAction<string>) => {
      const { payload: categoryId } = action;
      state.filters.categoryId =
        state.filters.categoryId !== categoryId ? categoryId : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetchStatus = TodosFetchStatus.Loading;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.fetchStatus = TodosFetchStatus.Succeeded;
        todosAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.fetchStatus = TodosFetchStatus.Failed;
      })
      .addCase(createTodo.fulfilled, todosAdapter.addOne);
  },
});

const { selectAll } = todosAdapter.getSelectors(
  (state: RootState) => state.todos
);

export const selectTodos = createSelector<
  [Selector<RootState, Todo[]>, Selector<RootState, TodoFilters>],
  Todo[]
>([selectAll, (state) => state.todos.filters], (todos, filters) => {
  const { status, categoryId } = filters;

  return todos.filter((todo) => {
    if (categoryId && todo.category.id !== categoryId) return false;

    if (status === TodoStatusFilter.Completed) return todo.isCompleted;
    if (status === TodoStatusFilter.Uncompleted) return !todo.isCompleted;

    return todo;
  });
});

export const {
  updateTodoStatus,
  removeTodo,
  changeStatusFilter,
  changeCategoryFilter,
} = todosSlice.actions;

export const { reducer: todoReducer } = todosSlice;
