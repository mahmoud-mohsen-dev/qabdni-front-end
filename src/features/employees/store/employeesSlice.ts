import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  // basicInfoDataType,
  basicInfoDataWithImageType,
  CurrentEmployeeType,
  CurrentEmployeeValuesType,
  EmployeeCurrentKeysNameType,
  // EmployeeSectionsType,
  OptionalEmployeeSectionsType,
  TableRowType
} from '../../../types';

export interface initialStateType {
  fullEmployeesData: CurrentEmployeeType[];
  basicEmployeesData: basicInfoDataWithImageType[];
  currentEmployee: CurrentEmployeeType;
}
import type { WritableDraft } from 'immer';
// import { valueInArray } from '../../../utils/helpers';

const initialState: initialStateType = {
  fullEmployeesData: [
    {
      basicInfoData: {
        avatarInfo: {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://lh3.googleusercontent.com/pw/AP1GczPHPgTKlGVhES9_uzGRTv7lweR1QRSWkl1b2KyQrEkH5WJBlTj_oCpQkLB0Qa1UI910tsSbk94TK9xDCNXtPe7hpk90jiTBs3mSa5X2fSYKz39nfSH3lqeRueNUOQiPcd0vjb6o3jRj4BCZwTy-Wo2FGw=w984-h984-s-no-gm?authuser=0'
        },
        id: '01',
        basic: {
          fullName: 'mahmoud mohsen',
          position: 'Full Stack Developer',
          department: 'developers',
          status: 'terminated',
          dateOfJoining: '2024-05-31T21:00:00.000Z',
          dateOfDeparture: null,
          phone: '01006879945',
          email: 'mahmoud.mohsen@gmail.com',
          employmentType: 'remote'
        }
      },
      personalInfoData: {
        nationlIdNum: null,
        nationalIdExpDate: null,
        dateOfBirth: '1999-12-08T22:00:00.000Z',
        maritalStatus: 'single',
        gender: 'male',
        educationStatus: 'notAStudent',
        education: "Bachelor's degree in computer science from Thebes Academy."
      },
      bankInformationData: {
        bankAccountNum: null,
        bankName: null,
        panNum: null,
        ifscCode: null
      },
      emergencyContactData: {
        emergencyContactName: null,
        emergencyContactPhone: null
      },
      attendanceAndDepartureInfoData: {
        fingerprintDevice: 'C++ Game developer',
        branch: 'Project Management',
        workPlan: 'Project Management',
        annualLeavesBalance: 0
      },
      salaryCalculationSystemData: {
        currency: 'EGP',
        period: 'monthly',
        salary: 8000,
        insurances: 0,
        taxes: 0
      },
      otherCalculationSystemData: {
        'missingCheckInOrCheckOut-isEnabled': true,
        'missingCheckInOrCheckOut-occurrences': 0,
        'missingCheckInOrCheckOut-deductValue': 0,
        'breakBefore-isEnabled': false,
        'breakBefore-occurrences': 0,
        'breakBefore-deductValue-multiplierDuration': 'day(s)',
        'breakBefore-deductValue': 0,
        'breakAfter-isEnabled': false,
        'breakAfter-occurrences': 0,
        'breakAfter-deductValue-multiplierDuration': 'times',
        'breakAfter-deductValue': 0
      },
      earlyArrivalData: [
        {
          key: '0',
          isEnabled: true,
          durationStart: '2024-08-07T21:00:00.000Z',
          durationEnd: '2024-08-08T07:30:00.000Z',
          multiplier: 1.25,
          'multiplier-duration': 'times',
          minimumOccurrences: 5
        }
      ],
      lateArrivalData: [],
      earlyDepartureData: [],
      lateDepartureData: [],
      leavesTableData: [
        {
          key: '0',
          emergencyLeave: 0,
          otherLeave: 1,
          personalLeave: 1,
          publicHolidays: 0,
          sickLeave: 0,
          studyLeave: 1,
          unauthorizedLeave: 3,
          unpaidLeave: 1,
          vacationLeave: 1,
          workFromHome: 0
        }
      ]
    },
    {
      basicInfoData: {
        avatarInfo: {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://media.licdn.com/dms/image/v2/D4D03AQGZgZuPoEHszQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685722044616?e=1729123200&v=beta&t=l6YV_6ZFVbK_q7Lm6SuquMs-OQ869t55PXLpvdc6IVs'
        },
        id: '02',
        basic: {
          fullName: 'Ahmed Mohsen',
          position: 'Full Stack Developer',
          department: 'developers',
          status: 'terminated',
          dateOfJoining: '2024-05-31T21:00:00.000Z',
          dateOfDeparture: null,
          phone: '01006879945',
          email: 'mahmoud.mohsen@gmail.com',
          employmentType: 'fullTime'
        }
      },
      personalInfoData: {
        nationlIdNum: null,
        nationalIdExpDate: null,
        dateOfBirth: '1999-12-08T22:00:00.000Z',
        maritalStatus: 'single',
        gender: 'male',
        educationStatus: 'notAStudent',
        education: "Bachelor's degree in computer science from Thebes Academy."
      },
      bankInformationData: {
        bankAccountNum: null,
        bankName: null,
        panNum: null,
        ifscCode: null
      },
      emergencyContactData: {
        emergencyContactName: null,
        emergencyContactPhone: null
      },
      attendanceAndDepartureInfoData: {
        fingerprintDevice: 'C++ Game developer',
        branch: 'Project Management',
        workPlan: 'Project Management',
        annualLeavesBalance: 0
      },
      salaryCalculationSystemData: {
        currency: 'EGP',
        period: 'monthly',
        salary: 8000,
        insurances: 0,
        taxes: 0
      },
      otherCalculationSystemData: {
        'missingCheckInOrCheckOut-isEnabled': true,
        'missingCheckInOrCheckOut-occurrences': 0,
        'missingCheckInOrCheckOut-deductValue': 0,
        'breakBefore-isEnabled': false,
        'breakBefore-occurrences': 0,
        'breakBefore-deductValue-multiplierDuration': 'day(s)',
        'breakBefore-deductValue': 0,
        'breakAfter-isEnabled': false,
        'breakAfter-occurrences': 0,
        'breakAfter-deductValue-multiplierDuration': 'times',
        'breakAfter-deductValue': 0
      },
      earlyArrivalData: [
        {
          key: '0',
          isEnabled: true,
          durationStart: '2024-08-07T21:00:00.000Z',
          durationEnd: '2024-08-08T07:30:00.000Z',
          multiplier: 1.25,
          'multiplier-duration': 'times',
          minimumOccurrences: 5
        }
      ],
      lateArrivalData: [],
      earlyDepartureData: [],
      lateDepartureData: [],
      leavesTableData: [
        {
          key: '0',
          emergencyLeave: 0,
          otherLeave: 1,
          personalLeave: 1,
          publicHolidays: 0,
          sickLeave: 0,
          studyLeave: 1,
          unauthorizedLeave: 3,
          unpaidLeave: 1,
          vacationLeave: 1,
          workFromHome: 0
        }
      ]
    },
    {
      basicInfoData: {
        avatarInfo: {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://lh3.googleusercontent.com/pw/AP1GczPHPgTKlGVhES9_uzGRTv7lweR1QRSWkl1b2KyQrEkH5WJBlTj_oCpQkLB0Qa1UI910tsSbk94TK9xDCNXtPe7hpk90jiTBs3mSa5X2fSYKz39nfSH3lqeRueNUOQiPcd0vjb6o3jRj4BCZwTy-Wo2FGw=w984-h984-s-no-gm?authuser=0'
        },
        id: '03',
        basic: {
          fullName: 'Moahmed Mohsen',
          position: 'Full Stack Developer',
          department: 'developers',
          status: 'onHoliday',
          dateOfJoining: '2024-05-31T21:00:00.000Z',
          dateOfDeparture: null,
          phone: '01006879945',
          email: 'mahmoud.mohsen@gmail.com',
          employmentType: 'contract'
        }
      },
      personalInfoData: {
        nationlIdNum: null,
        nationalIdExpDate: null,
        dateOfBirth: '1999-12-08T22:00:00.000Z',
        maritalStatus: 'single',
        gender: 'male',
        educationStatus: 'notAStudent',
        education: "Bachelor's degree in computer science from Thebes Academy."
      },
      bankInformationData: {
        bankAccountNum: null,
        bankName: null,
        panNum: null,
        ifscCode: null
      },
      emergencyContactData: {
        emergencyContactName: null,
        emergencyContactPhone: null
      },
      attendanceAndDepartureInfoData: {
        fingerprintDevice: 'C++ Game developer',
        branch: 'Project Management',
        workPlan: 'Project Management',
        annualLeavesBalance: 0
      },
      salaryCalculationSystemData: {
        currency: 'EGP',
        period: 'monthly',
        salary: 8000,
        insurances: 0,
        taxes: 0
      },
      otherCalculationSystemData: {
        'missingCheckInOrCheckOut-isEnabled': true,
        'missingCheckInOrCheckOut-occurrences': 0,
        'missingCheckInOrCheckOut-deductValue': 0,
        'breakBefore-isEnabled': false,
        'breakBefore-occurrences': 0,
        'breakBefore-deductValue-multiplierDuration': 'day(s)',
        'breakBefore-deductValue': 0,
        'breakAfter-isEnabled': false,
        'breakAfter-occurrences': 0,
        'breakAfter-deductValue-multiplierDuration': 'times',
        'breakAfter-deductValue': 0
      },
      earlyArrivalData: [
        {
          key: '0',
          isEnabled: true,
          durationStart: '2024-08-07T21:00:00.000Z',
          durationEnd: '2024-08-08T07:30:00.000Z',
          multiplier: 1.25,
          'multiplier-duration': 'times',
          minimumOccurrences: 5
        }
      ],
      lateArrivalData: [],
      earlyDepartureData: [],
      lateDepartureData: [],
      leavesTableData: [
        {
          key: '0',
          emergencyLeave: 0,
          otherLeave: 1,
          personalLeave: 1,
          publicHolidays: 0,
          sickLeave: 0,
          studyLeave: 1,
          unauthorizedLeave: 3,
          unpaidLeave: 1,
          vacationLeave: 1,
          workFromHome: 0
        }
      ]
    }
  ],
  basicEmployeesData: [
    {
      avatarInfo: {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://lh3.googleusercontent.com/pw/AP1GczPHPgTKlGVhES9_uzGRTv7lweR1QRSWkl1b2KyQrEkH5WJBlTj_oCpQkLB0Qa1UI910tsSbk94TK9xDCNXtPe7hpk90jiTBs3mSa5X2fSYKz39nfSH3lqeRueNUOQiPcd0vjb6o3jRj4BCZwTy-Wo2FGw=w984-h984-s-no-gm?authuser=0'
      },
      id: '01',
      basic: {
        fullName: 'mahmoud mohsen',
        position: 'Full Stack Developer',
        department: 'developers',
        status: 'terminated',
        dateOfJoining: '2024-05-31T21:00:00.000Z',
        dateOfDeparture: null,
        phone: '01006879945',
        email: 'mahmoud.mohsen@gmail.com',
        employmentType: 'remote'
      }
    },
    {
      avatarInfo: {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://media.licdn.com/dms/image/v2/D4D03AQGZgZuPoEHszQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685722044616?e=1729123200&v=beta&t=l6YV_6ZFVbK_q7Lm6SuquMs-OQ869t55PXLpvdc6IVs'
      },
      id: '02',
      basic: {
        fullName: 'Ahmed Mohsen',
        position: 'Full Stack Developer',
        department: 'developers',
        status: 'terminated',
        dateOfJoining: '2024-05-31T21:00:00.000Z',
        dateOfDeparture: null,
        phone: '01006879945',
        email: 'mahmoud.mohsen@gmail.com',
        employmentType: 'fullTime'
      }
    },
    {
      avatarInfo: {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://lh3.googleusercontent.com/pw/AP1GczPHPgTKlGVhES9_uzGRTv7lweR1QRSWkl1b2KyQrEkH5WJBlTj_oCpQkLB0Qa1UI910tsSbk94TK9xDCNXtPe7hpk90jiTBs3mSa5X2fSYKz39nfSH3lqeRueNUOQiPcd0vjb6o3jRj4BCZwTy-Wo2FGw=w984-h984-s-no-gm?authuser=0'
      },
      id: '03',
      basic: {
        fullName: 'Moahmed Mohsen',
        position: 'Full Stack Developer',
        department: 'developers',
        status: 'onHoliday',
        dateOfJoining: '2024-05-31T21:00:00.000Z',
        dateOfDeparture: null,
        phone: '01006879945',
        email: 'mahmoud.mohsen@gmail.com',
        employmentType: 'contract'
      }
    }
  ],
  currentEmployee: {
    basicInfoData: {
      avatarInfo: {
        uid: '',
        name: '',
        status: 'done',
        url: ''

        // uid: '-1',
        // name: 'image.png',
        // status: 'done',
        // // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        // url: 'https://lh3.googleusercontent.com/pw/AP1GczPHPgTKlGVhES9_uzGRTv7lweR1QRSWkl1b2KyQrEkH5WJBlTj_oCpQkLB0Qa1UI910tsSbk94TK9xDCNXtPe7hpk90jiTBs3mSa5X2fSYKz39nfSH3lqeRueNUOQiPcd0vjb6o3jRj4BCZwTy-Wo2FGw=w984-h984-s-no-gm?authuser=0'
      },
      id: null,
      basic: {
        fullName: null,
        position: null,
        department: null,
        status: null,
        dateOfJoining: null,
        dateOfDeparture: null,
        phone: null,
        email: null,
        employmentType: 'fullTime'
      }
    },
    personalInfoData: {
      nationlIdNum: null,
      nationalIdExpDate: null,
      dateOfBirth: null,
      maritalStatus: 'married',
      gender: null,
      educationStatus: 'notAStudent',
      education: null
    },
    bankInformationData: {
      bankAccountNum: null,
      bankName: null,
      panNum: null,
      ifscCode: null
    },
    emergencyContactData: {
      emergencyContactName: null,
      emergencyContactPhone: null
    },
    attendanceAndDepartureInfoData: {
      fingerprintDevice: null,
      branch: null,
      workPlan: null,
      annualLeavesBalance: 0
    },
    salaryCalculationSystemData: {
      currency: 'EGP',
      period: 'monthly',
      salary: 0,
      insurances: 0,
      taxes: 0
    },
    otherCalculationSystemData: {
      'missingCheckInOrCheckOut-isEnabled': true,
      'missingCheckInOrCheckOut-occurrences': 0,
      'missingCheckInOrCheckOut-deductValue': 0,
      'breakBefore-isEnabled': true,
      'breakBefore-occurrences': 1,
      'breakBefore-deductValue-multiplierDuration': 'day(s)',
      'breakBefore-deductValue': 5,
      'breakAfter-isEnabled': false,
      'breakAfter-occurrences': 20,
      'breakAfter-deductValue-multiplierDuration': 'day(s)',
      'breakAfter-deductValue': 0
    },
    earlyArrivalData: [],
    earlyDepartureData: [],
    lateArrivalData: [],
    lateDepartureData: [],
    leavesTableData: [
      {
        key: 'leavesTableData-0',
        emergencyLeave: 0,
        otherLeave: 0,
        personalLeave: 0,
        publicHolidays: 0,
        sickLeave: 0,
        studyLeave: 0,
        unauthorizedLeave: 0,
        unpaidLeave: 0,
        vacationLeave: 0,
        workFromHome: 0
      }
    ]
  }
};

const getBasicEmployeeData = (state: WritableDraft<initialStateType>) => {
  const result = state.fullEmployeesData.map((employee) => {
    return employee.basicInfoData;
  });
  state.basicEmployeesData = result;
};

const employeesReducer = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    createEmployee: (state, action: PayloadAction<CurrentEmployeeType>) => {
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
    viewEmployee: (state, action: PayloadAction<{ id: string }>) => {
      state.currentEmployee =
        state.fullEmployeesData.find((item) => item.basicInfoData.id === action.payload.id) ?? state.currentEmployee;
    },
    onCancelEmployeeSection: (
      state,
      action: PayloadAction<{ id: string | null; sectionName: keyof CurrentEmployeeType }>
    ) => {
      // let foundEmployee;
      const foundEmployee = state.fullEmployeesData.find(
        (item) =>
          // item.basicInfoData.id === action.payload.id ? (foundEmployee = item[action.payload.sectionName]) : null
          item.basicInfoData.id === action.payload.id
      );
      if (typeof foundEmployee === 'object') {
        if (action.payload.sectionName === 'basicInfoData') {
          state.currentEmployee.basicInfoData = {
            ...state.currentEmployee.basicInfoData,
            basic: foundEmployee.basicInfoData.basic
          };
        } else {
          state.currentEmployee = {
            ...state.currentEmployee,
            [action.payload.sectionName]: foundEmployee[action.payload.sectionName]
          };
        }
      }
    },
    editEmployee: (
      state,
      action: PayloadAction<{
        id: string;
        target: keyof CurrentEmployeeType;
        // subTarget?: keyof basicInfoDataWithImageType;
        data: CurrentEmployeeValuesType;
      }>
    ) => {
      state.fullEmployeesData = state.fullEmployeesData.map((employee) => {
        // const applySubData = () => {
        //   return action.payload.subTarget
        //     ? {
        //         [action.payload.subTarget]: {
        //           ...employee[action.payload.target][action.payload.subTarget],
        //           ...action.payload.data
        //         }
        //       }
        //     : { ...action.payload.data };
        // };
        // const subData = applySubData();
        // console.log(subData);

        return employee.basicInfoData.id === action.payload.id
          ? { ...employee, [action.payload.target]: { ...employee[action.payload.target], ...action.payload.data } }
          : employee;
      });
      // console.log(state.fullEmployeesData);
      // if (Object.keys(action.payload.data).includes('id')) {
      //   state.basicEmployeesData = state.basicEmployeesData.map((employee) =>
      //     employee.id === action.payload.id ? { ...employee, ...action.payload.data } : employee
      //   );
      // }
      getBasicEmployeeData(state);
      // state.currentEmployee = { ...initialState.currentEmployee };
    },
    updateCurrentEmployee: (
      state,
      action: PayloadAction<{ target: EmployeeCurrentKeysNameType; data: OptionalEmployeeSectionsType }>
    ) => {
      switch (action.payload.target) {
        case 'basicInfoData':
          state.currentEmployee.basicInfoData = { ...state.currentEmployee.basicInfoData, ...action.payload.data };
          break;
        /*
            {
              type: 'employees/updateCurrentEmployee', 
              payload: {target: 'basicInfoData/basic', data: {fullName: 'mahmoud'}}
            }
        */
        case 'basicInfoData/basic':
          state.currentEmployee.basicInfoData.basic = {
            ...state.currentEmployee.basicInfoData.basic,
            ...action.payload.data
          };
          break;
        case 'personalInfoData':
          state.currentEmployee.personalInfoData = {
            ...state.currentEmployee.personalInfoData,
            ...action.payload.data
          };
          break;
        case 'bankInformationData':
          state.currentEmployee.bankInformationData = {
            ...state.currentEmployee.bankInformationData,
            ...action.payload.data
          };
          break;
        case 'emergencyContactData':
          state.currentEmployee.emergencyContactData = {
            ...state.currentEmployee.emergencyContactData,
            ...action.payload.data
          };
          break;
        case 'attendanceAndDepartureInfoData':
          state.currentEmployee.attendanceAndDepartureInfoData = {
            ...state.currentEmployee.attendanceAndDepartureInfoData,
            ...action.payload.data
          };
          break;
        case 'salaryCalculationSystemData':
          state.currentEmployee.salaryCalculationSystemData = {
            ...state.currentEmployee.salaryCalculationSystemData,
            ...action.payload.data
          };
          break;
        case 'otherCalculationSystemData':
          state.currentEmployee.otherCalculationSystemData = {
            ...state.currentEmployee.otherCalculationSystemData,
            ...action.payload.data
          };
          break;
        case 'earlyArrivalData':
          state.currentEmployee.earlyArrivalData = action.payload.data as TableRowType[];
          break;
        case 'earlyDepartureData':
          state.currentEmployee.earlyDepartureData = action.payload.data as TableRowType[];
          break;
        case 'lateArrivalData':
          state.currentEmployee.lateArrivalData = action.payload.data as TableRowType[];
          break;
        case 'lateDepartureData':
          state.currentEmployee.lateDepartureData = action.payload.data as TableRowType[];
          break;
        case 'leavesTableData':
          state.currentEmployee.leavesTableData = [
            {
              ...state.currentEmployee.leavesTableData[0],
              ...action.payload.data
            }
          ];
          break;
        default:
          console.error("Target name didn't match any value");
          break;
      }
    },
    clearCurrentEmployee: (state) => {
      state.currentEmployee = { ...initialState.currentEmployee };
    }
  }
});

export const {
  createEmployee,
  viewEmployee,
  onCancelEmployeeSection,
  editEmployee,
  deleteEmployee,
  updateCurrentEmployee,
  clearCurrentEmployee
} = employeesReducer.actions;
export default employeesReducer.reducer;
