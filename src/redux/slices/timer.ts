import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface TimerState {
  timer: {
    minute: string,
    second: string,
  };
}

// Define the initial state using that type
const initialState: TimerState = {
  timer: {
    minute: '00',
    second: '00'
  },
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    setMinute: (state, action) => {
      state.timer.minute = action.payload.minute
    },
    setSecond: (state, action) => {
      state.timer.second = action.payload.second
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTimer, setMinute, setSecond } = timerSlice.actions;
export default timerSlice.reducer