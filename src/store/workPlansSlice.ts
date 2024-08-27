import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { Dayjs } from 'dayjs';
import { v4 } from 'uuid';
import { normalize } from '../utils/helpers';

export type TimePickerValueType = null | Dayjs | string;

export type DaysType = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export interface DayObjType {
  key: string | number;
  day: DaysType;
  shiftStart: TimePickerValueType;
  shiftEnd: TimePickerValueType;
  breakStart: TimePickerValueType;
  breakEnd: TimePickerValueType;
  isDayOff: boolean;
  workTime: number;
}

// type DayKesType = Partial<keyof DayObjType>;

export interface WorkPlanStateItemType {
  id: string;
  workPlanName: string;
  week: DayObjType[];
  connectedEmployees: string[];
}

export interface WorkPlanType {
  final: WorkPlanStateItemType[];
  temp: WorkPlanStateItemType;
}

const initialState: WorkPlanType = {
  final: [
    {
      id: '1234',
      workPlanName: 'Mahmoud Shift',
      week: [
        {
          key: 0,
          day: 'saturday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 1,
          day: 'sunday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: true,
          workTime: 0
        },
        {
          key: 2,
          day: 'monday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 3,
          day: 'tuesday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 4,
          day: 'wednesday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 5,
          day: 'thursday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 6,
          day: 'friday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        }
      ],
      connectedEmployees: ['01', '02']
    },
    {
      id: v4(),
      workPlanName: 'Ahmed Shift',
      week: [
        {
          key: 0,
          day: 'saturday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 1,
          day: 'sunday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 2,
          day: 'monday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 3,
          day: 'tuesday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 4,
          day: 'wednesday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 5,
          day: 'thursday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        },
        {
          key: 6,
          day: 'friday',
          shiftStart: null,
          shiftEnd: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: false,
          workTime: 0
        }
      ],
      connectedEmployees: ['01', '02']
    }
  ],
  temp: {
    id: v4(),
    workPlanName: '',
    week: [
      {
        key: 0,
        day: 'saturday',
        shiftStart: '2024-08-17T08:00:00.000Z',
        shiftEnd: '2024-08-17T17:00:00.000Z',
        breakStart: '2024-08-17T12:00:00.000Z',
        breakEnd: '2024-08-17T13:00:00.000Z',
        isDayOff: true,
        workTime: 9
      },
      {
        key: 1,
        day: 'sunday',
        shiftStart: null,
        shiftEnd: null,
        breakStart: null,
        breakEnd: null,
        isDayOff: false,
        workTime: 0
      },
      {
        key: 2,
        day: 'monday',
        shiftStart: null,
        shiftEnd: null,
        breakStart: null,
        breakEnd: null,
        isDayOff: false,
        workTime: 0
      },
      {
        key: 3,
        day: 'tuesday',
        shiftStart: null,
        shiftEnd: null,
        breakStart: null,
        breakEnd: null,
        isDayOff: false,
        workTime: 0
      },
      {
        key: 4,
        day: 'wednesday',
        shiftStart: null,
        shiftEnd: null,
        breakStart: null,
        breakEnd: null,
        isDayOff: false,
        workTime: 0
      },
      {
        key: 5,
        day: 'thursday',
        shiftStart: null,
        shiftEnd: null,
        breakStart: null,
        breakEnd: null,
        isDayOff: false,
        workTime: 0
      },
      {
        key: 6,
        day: 'friday',
        shiftStart: null,
        shiftEnd: null,
        breakStart: null,
        breakEnd: null,
        isDayOff: false,
        workTime: 0
      }
    ],
    connectedEmployees: []
  }
};

const workPlansReducer = createSlice({
  name: 'workPlans',
  initialState,
  reducers: {
    addFinalWorkPlan: (state) => {
      const foundIndex = state.final.find(
        (workPlan) => state.temp.workPlanName && normalize(workPlan.workPlanName) === normalize(state.temp.workPlanName)
      );
      if (!foundIndex) {
        state.final.push(state.temp);
        state.temp = { ...initialState.temp };
      } else {
        message.error('Work plan name exist!');
        throw new Error('Work plan name exist!');
      }
    },
    updateFinalWorkPlan: (
      state,
      action: PayloadAction<{
        id: string;
        targetName: keyof WorkPlanStateItemType;
        data: Partial<WorkPlanStateItemType[keyof WorkPlanStateItemType]>;
      }>
    ) => {
      if (
        action.payload.data &&
        action.payload.targetName === 'connectedEmployees' &&
        typeof action.payload.data === 'string'
      ) {
        state.final = state.final.map((workPlan) =>
          workPlan.id === action.payload.id
            ? {
                ...workPlan,
                connectedEmployees: [...(workPlan.connectedEmployees || []), action.payload.data as string]
              }
            : workPlan
        );
      } else {
        state.final = state.final.map((workPlan) =>
          workPlan.id === action.payload.id
            ? { ...workPlan, ...{ [action.payload.targetName]: action.payload.data } }
            : workPlan
        );
      }
    },
    updateFinalWorkPlanDayObj: (
      state,
      action: PayloadAction<{
        id: string;
        dayName: DaysType;
        keyName: Partial<keyof DayObjType>;
        data: Partial<DayObjType>;
      }>
    ) => {
      const workPlanFoundIndex = state.final.findIndex((workPlan) => workPlan.id === action.payload.id);
      if (workPlanFoundIndex !== -1) {
        const weekFoundIndex = state.final[workPlanFoundIndex].week.findIndex(
          (workPlan) => workPlan.day === action.payload.dayName
        );
        if (weekFoundIndex !== -1) {
          state.final[workPlanFoundIndex].week[weekFoundIndex] = {
            ...state.final[workPlanFoundIndex].week[weekFoundIndex],
            [action.payload.keyName]: action.payload.data
          };
        }
      }
    },
    removeFinalWorkPlan: (
      state,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      state.final = state.final.filter((WorkPlan) => WorkPlan.id !== action.payload.id);
    },
    updateTempWorkPlanDayObj: (
      state,
      action: PayloadAction<{
        dayName: DaysType;
        keyName: Partial<keyof DayObjType>;
        data: Partial<DayObjType[keyof DayObjType]>;
      }>
    ) => {
      const dayFoundIndex = state.temp.week.findIndex((item) => item.day === action.payload.dayName);
      if (dayFoundIndex !== -1) {
        state.temp.week[dayFoundIndex] = {
          ...state.temp.week[dayFoundIndex],
          [action.payload.keyName]: action.payload.data
        };
      }
    },
    toggleTempIsDayOff: (state, action: PayloadAction<{ dayName: DaysType }>) => {
      const dayFoundIndex = state.temp.week.findIndex((item) => item.day === action.payload.dayName);
      if (dayFoundIndex !== -1) {
        state.temp.week[dayFoundIndex] = {
          ...initialState.temp.week[dayFoundIndex],
          isDayOff: !state.temp.week[dayFoundIndex].isDayOff
        };
      }
    },
    clearTempWorkPlanDayObj: (
      state,
      action: PayloadAction<{
        dayName: DaysType;
      }>
    ) => {
      const dayFoundIndex = state.temp.week.findIndex((item) => item.day === action.payload.dayName);
      if (dayFoundIndex !== -1) {
        state.temp.week[dayFoundIndex] = { ...initialState.temp.week[dayFoundIndex] };
      }
    },
    updateTempWorkPlan: (
      state,
      action: PayloadAction<{
        targetName: keyof WorkPlanStateItemType;
        data: DayObjType[] | string;
      }>
    ) => {
      if (
        action.payload.data &&
        action.payload.targetName === 'connectedEmployees' &&
        typeof action.payload.data === 'string'
      ) {
        state.temp = {
          ...state.temp,
          connectedEmployees: [...state.temp.connectedEmployees, action.payload.data]
        };
      } else {
        state.temp = {
          ...state.temp,
          [action.payload.targetName]: action.payload.data
        };
      }
    },
    clearTempWorkPlan: (state) => {
      state.temp = { ...initialState.temp };
    }
  }
});

export const {
  addFinalWorkPlan,
  updateFinalWorkPlan,
  updateFinalWorkPlanDayObj,
  removeFinalWorkPlan,
  updateTempWorkPlanDayObj,
  updateTempWorkPlan,
  clearTempWorkPlanDayObj,
  toggleTempIsDayOff,
  clearTempWorkPlan
} = workPlansReducer.actions;
export default workPlansReducer.reducer;
