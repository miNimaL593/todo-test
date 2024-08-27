import { createSlice } from "@reduxjs/toolkit";

const initialState: unknown[] = []
const taskSliceMocks = createSlice({
  name: 'taks',
  initialState,

  reducers: {
    taskSet: (_, action) => action.payload,
    taskClear: () =>  []
  }
})

export const { actions } = taskSliceMocks;

export default taskSliceMocks.reducer