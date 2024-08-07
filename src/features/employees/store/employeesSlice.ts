import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { basicInfoDataWithImageType, FullEmployeeDataType } from '../../../types';

interface initialStateType {
  fullEmployeesData: FullEmployeeDataType[];
  basicEmployeesData: basicInfoDataWithImageType[];
  currentEmployee: FullEmployeeDataType;
}

const initialState: initialStateType = {
  fullEmployeesData: [],
  basicEmployeesData: [],
  currentEmployee: {
    basicInfoData: {
      id: '',
      avatarUrl: '',
      fullName: '',
      position: '',
      department: '',
      dateOfDeparture: undefined,
      dateOfJoining: undefined as any,
      employmentType: 'fullTime',
      email: '',
      phone: '',
      status: 'active'
    },
    personalInfoData: {
      nationlIdNum: '',
      nationalIdExpDate: undefined,
      dateOfBirth: undefined as any,
      maritalStatus: 'single',
      gender: 'male',
      educationStatus: 'notAStudent',
      education: ''
    },
    bankInformationData: {
      bankAccountNum: '',
      bankName: '',
      panNum: '',
      ifscCode: ''
    },
    emergencyContactData: {
      emergencyContactName: '',
      emergencyContactPhone: ''
    },
    attendanceAndDepartureInfoData: {
      annualLeavesBalance: 0,
      branch: '',
      fingerprintDevice: '',
      workPlan: ''
    },
    salaryCalculationSystemData: {
      currency: 'USD',
      period: 'monthly',
      salary: 0,
      insurances: 0,
      taxes: 0
    },
    otherCalculationSystemData: {
      'breakAfter-deductValue': 0,
      'breakAfter-deductValue-multiplierDuration': 'day(s)',
      'breakAfter-isEnabled': false,
      'breakAfter-occurrences': 0,
      'breakBefore-deductValue': 0,
      'breakBefore-deductValue-multiplierDuration': 'day(s)',
      'breakBefore-isEnabled': false,
      'breakBefore-occurrences': 0,
      'missingCheckInOrCheckOut-deductValue': 0,
      'missingCheckInOrCheckOut-isEnabled': false,
      'missingCheckInOrCheckOut-occurrences': 0
    },
    earlyArrivalDataSource: [],
    lateArrivalDataSource: [],
    earlyDepartureDataSource: [],
    lateDepartureDataSource: [],
    leavesTableDataSource: []
  }
};

const employeesReducer = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    createEmployee: (state, action: PayloadAction<FullEmployeeDataType>) => {
      state.fullEmployeesData.push(action.payload);
      state.basicEmployeesData.push(action.payload.basicInfoData);
      state.currentEmployee = { ...initialState.currentEmployee };
    },
    // updateCurrentEmployee: (state, action) => {
    //   state.currentEmployee = { ...state.currentEmployee, ...action.payload };
    // },
    // updateCurrentEmployeEearlyArrival: (state, action) => {
    //   state.currentEmployee = {
    //     ...state.currentEmployee,
    //     calculationSystems: {
    //       earlyArrival: state.currentEmployee.calculationSystems.earlyArrival.map((item) =>
    //         item.key === action.payload.key ? { ...item, ...action.payload } : item
    //       )
    //     }
    //   };
    // },
    deleteEmployee: (state, action: PayloadAction<basicInfoDataWithImageType>) => {
      state.fullEmployeesData = state.fullEmployeesData.filter(
        (employee) => employee.basicInfoData.id !== action.payload.id
      );
      state.basicEmployeesData = state.basicEmployeesData.filter((employee) => employee.id !== action.payload.id);
      state.currentEmployee = { ...initialState.currentEmployee };
    },
    clearCurrentEmployee: (state) => {
      state.currentEmployee = { ...initialState.currentEmployee };
    }
  }
});

export const { createEmployee, deleteEmployee, clearCurrentEmployee } = employeesReducer.actions;
export default employeesReducer.reducer;
