import {createApi} from "@reduxjs/toolkit/query/react";
import type {Task} from "../../mocks/type.ts";
import baseQuery from "./baseQuery.ts";


export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], { limit: number; offset: number }>({
      query: ({ limit, offset }) => ({
        url: '/tasks',
        params: {
          _limit: limit,
          _offset: offset,
        }
      }),
      providesTags: result => result ? [
        ...result.map((task) => ({ type: 'TASK' as const, id: task.id })),
        { type: 'TASK', id: '__LIST__'}
      ] : [
        { type: 'TASK', id: '__LIST__'}
      ]
    }),

    addTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'TASK', id: '__LIST__'}]
    }),

    removeTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'TASK', id }]
    }),

    updateTask: builder.mutation<Task, { id: number; updates: Partial<Task> }>({
      query: ({ id, updates }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (_, __, args) => [{ type: 'TASK', id: args.id }]
    }),
  }),
  tagTypes: ['TASK'],
});

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = taskApi;


