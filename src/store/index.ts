import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import adminSettingsSlice from './adminSettingsSlice';
import positionsReducer from './positionsReducer';
// import employeeReducer from '../features/employees/store/employeeSlice';
// import payrollReducer from '../features/payroll/store/payrollSlice';

const store = configureStore({
  reducer: {
    adminSettings: adminSettingsSlice,
    auth: authReducer,
    positions: positionsReducer
    // employees: employeeReducer,
    // payroll: payrollReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
