import { createSlice } from '@reduxjs/toolkit';

export interface positionType {
  name: string;
  color: 'indigo' | 'orange' | 'blue' | 'green' | 'pink';
}

export interface PositionsType {
  final: { all: [] | positionType[]; totalEmployees: number };
  temp: { all: [] | positionType[]; totalEmployees: number };
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
    assignTempFromFinal: (state) => {
      state.temp.all = [...state.final.all];
      state.temp.totalEmployees = state.final.totalEmployees;
    },
    assignTempFromValue: (state, action) => {
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
    save: (state) => {
      state.final.all = state.temp.all;
      state.final.totalEmployees = state.temp.totalEmployees;
    }
  }
});

export const {
  addPosition,
  removePosition,
  assignTempFromValue,
  assignTempFromFinal,
  addPositionTemp,
  removePositionTemp,
  save
} = positionsReducer.actions;
export default positionsReducer.reducer;
