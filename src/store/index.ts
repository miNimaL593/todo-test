import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {taskApi} from "./Api/taskApi.ts";
import taskSliceMocks from "./slice/taskSliceMocks.ts";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    taskMocks: taskSliceMocks
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(taskApi.middleware),
});

setupListeners(store.dispatch);