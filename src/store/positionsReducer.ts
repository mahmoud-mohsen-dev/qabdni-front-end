import { createSlice } from '@reduxjs/toolkit';
import { ValueItemType } from '../types';

export interface PositionsType {
  final: { all: [] | ValueItemType[]; totalEmployees: number };
  temp: { all: [] | ValueItemType[]; totalEmployees: number };
}

const initialState: PositionsType = {
  final: {
    all: [
      { name: 'C++ Game developer', color: 'indigo' },
      { name: 'Full Stack Developer', color: 'blue' }
    ],
    totalEmployees: 2
  },
  temp: { all: [], totalEmployees: 0 }
};

const positionsReducer = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    addPosition: (state, action) => {
      state.final.all = [...state.final.all, action.payload];
      state.final.totalEmployees = state.final.all.filter((position) => position.name).length;
    },
    removePosition: (state, action) => {
      state.final.all = state.final.all.filter((position) => position.name !== action.payload.name);
      state.final.totalEmployees = state.final.all.filter((position) => position.name).length;
    },
    assignTempPositionFromFinal: (state) => {
      state.temp.all = [...state.final.all];
      state.temp.totalEmployees = state.final.totalEmployees;
    },
    assignTempPositionFromValue: (state, action) => {
      state.temp.all = [...action.payload];
      state.temp.totalEmployees = state.temp.all.length;
      console.log(state.temp.totalEmployees);
    },
    addPositionTemp: (state, action) => {
      state.temp.all = [...state.temp.all, action.payload];
      state.temp.totalEmployees = state.temp.all.filter((position) => position.name).length;
    },
    removePositionTemp: (state, action) => {
      state.temp.all = state.temp.all.filter((position) => position.name !== action.payload.name);
      state.temp.totalEmployees = state.temp.all.filter((position) => position.name).length;
    },
    updatePositionColorTemp: (state, action) => {
      state.temp.all = state.temp.all.map((position) =>
        position.name === action.payload.name ? { name: position.name, color: action.payload.color } : position
      );
    },
    savePosition: (state) => {
      state.final.all = state.temp.all;
      state.final.totalEmployees = state.temp.totalEmployees;
    }
  }
});

export const {
  addPosition,
  removePosition,
  assignTempPositionFromValue,
  assignTempPositionFromFinal,
  addPositionTemp,
  removePositionTemp,
  updatePositionColorTemp,
  savePosition
} = positionsReducer.actions;
export default positionsReducer.reducer;
