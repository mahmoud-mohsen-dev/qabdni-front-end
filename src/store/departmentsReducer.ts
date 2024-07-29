import { createSlice } from '@reduxjs/toolkit';
import { PositionsType } from './positionsReducer';

const initialState: PositionsType = {
  final: {
    all: [
      { name: 'Project Management', color: 'pink' },
      { name: 'Sales & Marketing', color: 'green' }
    ],
    totalEmployees: 2
  },
  temp: { all: [], totalEmployees: 0 }
};

const departmentsReducer = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    addDepartment: (state, action) => {
      state.final.all = [...state.final.all, action.payload];
      state.final.totalEmployees = state.final.all.filter((department) => department.name).length;
    },
    removeDepartment: (state, action) => {
      state.final.all = state.final.all.filter((department) => department.name !== action.payload.name);
      state.final.totalEmployees = state.final.all.filter((department) => department.name).length;
    },
    assignDepartmendTempFromFinal: (state) => {
      state.temp.all = [...state.final.all];
      state.temp.totalEmployees = state.final.totalEmployees;
    },
    assignDepartmendTempFromValue: (state, action) => {
      state.temp.all = [...action.payload];
      state.temp.totalEmployees = state.temp.all.length;
      console.log(state.temp.totalEmployees);
    },
    addDepartmentTemp: (state, action) => {
      state.temp.all = [...state.temp.all, action.payload];
      state.temp.totalEmployees = state.temp.all.filter((department) => department.name).length;
    },
    removeDepartmentTemp: (state, action) => {
      state.temp.all = state.temp.all.filter((department) => department.name !== action.payload.name);
      state.temp.totalEmployees = state.temp.all.filter((department) => department.name).length;
    },
    updateDepartmendColorTemp: (state, action) => {
      state.temp.all = state.temp.all.map((department) =>
        department.name === action.payload.name ? { name: department.name, color: action.payload.color } : department
      );
    },
    saveDepartment: (state) => {
      state.final.all = state.temp.all;
      state.final.totalEmployees = state.temp.totalEmployees;
    }
  }
});

export const {
  addDepartment,
  removeDepartment,
  assignDepartmendTempFromValue,
  assignDepartmendTempFromFinal,
  addDepartmentTemp,
  removeDepartmentTemp,
  updateDepartmendColorTemp,
  saveDepartment
} = departmentsReducer.actions;
export default departmentsReducer.reducer;
