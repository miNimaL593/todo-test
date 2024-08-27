import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import taskSlice from './slice/taskSlice';
import {taskApi} from "./Api/Api.ts";
import {taskApiMocks} from "./Api/MocksApi/taskApiMocks.ts";
import taskSliceMocks from "./slice/taskSliceMocks.ts";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    [taskApiMocks.reducerPath]: taskApiMocks.reducer,
    task: taskSlice,
    taskMocks: taskSliceMocks
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(taskApi.middleware)
      .concat(taskApiMocks.middleware),
});

setupListeners(store.dispatch);