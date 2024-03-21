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
    },
    minusSecond: (state) => {
      if (+state.timer.second <= 10) {
        state.timer.second = '0'+(+state.timer.second - 1).toString()
      } else {
        state.timer.second = (+state.timer.second - 1).toString()
      }
    },
    minusMinute: (state) => {
      if (+state.timer.minute <= 10) {
        state.timer.minute = '0'+(+state.timer.minute - 1).toString()
      } else {
        state.timer.minute = (+state.timer.minute - 1).toString()
      }
    },
    resetTimer: (state) => {
      state.timer.minute = '00'
      state.timer.second = '00'
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setTimer, 
  setMinute,
  setSecond,
  minusSecond,
  minusMinute,
  resetTimer
} = timerSlice.actions;
export default timerSlice.reducer