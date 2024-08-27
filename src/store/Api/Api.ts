import baseQuery from './baseQuery.ts';
import {createApi} from "@reduxjs/toolkit/query/react";

// Определение типа задачи

// Создание API
const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    readTasks: builder.query({
      query: () => ({
        url: '/'
      }),
    }),
  }),
});

export const { useReadTasksQuery } = taskApi;
export {
  taskApi,
}