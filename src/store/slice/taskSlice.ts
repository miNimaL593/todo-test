import { createSlice } from "@reduxjs/toolkit";

const initialState: unknown[] = []
const taskSlice = createSlice({
  name: 'taks',
  initialState,

  reducers: {
    taskSet: (_, action) => action.payload,
    taskClear: () =>  []
  }
})

export const { actions } = taskSlice;

export default taskSlice.reducer