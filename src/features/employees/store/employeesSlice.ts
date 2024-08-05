import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  employees: [],
  currentEmployee: {
    basicInfo: {
      id: null,
      fullName: null,
      avatarUrl: null,
      position: null,
      department: null,
      statusType: null,
      dateOfJoining: null,
      dateOfdeparture: null,
      phone: null,
      email: null,
      employmentType: 'fullTime'
    },
    personalInfo: {
      nationalId: null,
      nationalIdExpDate: null,
      dateOfBirth: null,
      maritalStatus: 'single',
      gender: null,
      educationStatus: 'notAStudent',
      education: null
    },
    bankInfo: {
      accountNum: null,
      bankName: null,
      panNum: null,
      ifscCode: null
    },
    attendanceAndDeparture: {
      fingerprintDevice: null,
      branch: null,
      workPlan: null,
      annualLeavesBalance: null
    },
    salaryCalculationSystem: {
      salary: {
        currency: 'USD',
        amount: null,
        period: 'monthly'
      },
      insurances: {
        employeePaysAmount: null,
        rate: null,
        employerPaysAmount: null
      },
      taxes: {
        rate: null,
        amount: null
      }
    },
    calculationSystems: {
      earlyArrival: [
        // { isEnabled: false, durationStart: null, durationEnd: null, multiplier: null, minimumAllowedOccurrences: null },
        {
          key: '0' as React.Key,
          isEnabled: true,
          durationStart: moment('07:00', 'HH:mm'),
          durationEnd: moment('08:00', 'HH:mm'),
          multiplier: 0,
          'multiplier-duration': 'days',
          minimumOccurrences: 5
        },
        {
          key: '1' as React.Key,
          isEnabled: false,
          durationStart: moment('05:00', 'HH:mm'),
          durationEnd: moment('10:00', 'HH:mm'),
          multiplier: 0,
          'multiplier-duration': 'times',
          minimumOccurrences: 0
        }
      ]
    }
  }
};

const employeesReducer = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    createEmployee: (state) => {
      // state.employees.push(state.currentEmployee);
      state.currentEmployee = { ...initialState.currentEmployee };
    },
    updateCurrentEmployee: (state, action) => {
      state.currentEmployee = { ...state.currentEmployee, ...action.payload };
    },
    updateCurrentEmployeEearlyArrival: (state, action) => {
      state.currentEmployee = {
        ...state.currentEmployee,
        calculationSystems: {
          earlyArrival: state.currentEmployee.calculationSystems.earlyArrival.map((item) =>
            item.key === action.payload.key ? { ...item, ...action.payload } : item
          )
        }
      };
    },
    clearCurrentEmployee: (state) => {
      state.currentEmployee = { ...initialState.currentEmployee };
    }
  }
});

export const { createEmployee, updateCurrentEmployee, updateCurrentEmployeEearlyArrival, clearCurrentEmployee } =
  employeesReducer.actions;
export default employeesReducer.reducer;
