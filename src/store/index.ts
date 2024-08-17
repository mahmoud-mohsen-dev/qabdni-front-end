import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import adminSettingsSlice from './adminSettingsSlice';
import positionsReducer from './positionsSlice';
import departmentsReducer from './departmentsSlice';
import employeesReducer from '../features/employees/store/employeesSlice';
import workPlansReducer from './workPlansSlice';
// import payrollReducer from '../features/payroll/store/payrollSlice';

const store = configureStore({
  reducer: {
    adminSettings: adminSettingsSlice,
    auth: authReducer,
    positions: positionsReducer,
    departments: departmentsReducer,
    employees: employeesReducer,
    workPlans: workPlansReducer

    // payroll: payrollReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
