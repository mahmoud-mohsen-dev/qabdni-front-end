import React from 'react';
import type { Moment } from 'moment';

export type DivOrString = React.ReactElement<HTMLDivElement> | string;

export type FiveColorsType = 'indigo' | 'orange' | 'blue' | 'green' | 'pink';

export interface ValueItemType {
  name: string;
  color: 'indigo' | 'orange' | 'blue' | 'green' | 'pink';
}

export type statusType = 'active' | 'terminated' | 'onHoliday' | 'remote';
export type employmentType = 'fullTime' | 'partTime' | 'contract' | 'freelance' | 'remote';
export type educationStatusType = 'student' | 'notAStudent';
export type genderType = 'male' | 'female';
export type maritalStatusType = 'single' | 'married' | 'divorced';
export type currencyType = 'EGP' | 'USD' | 'EUR' | 'GBP' | 'CNY';
export type periodType = 'monthly' | 'hourly';
export type durationType = 'times' | 'day(s)';

export interface basicInfoDataType {
  fullName: string;
  position: string;
  department: string;
  dateOfDeparture: Moment | undefined;
  dateOfJoining: Moment;
  employmentType: employmentType;
  email: string | undefined;
  phone: string | undefined;
  status: statusType;
}
export interface personalInfoDataType {
  nationlIdNum: string | undefined;
  nationalIdExpDate: Moment | undefined;
  dateOfBirth: Moment;
  maritalStatus: maritalStatusType;
  gender: genderType;
  educationStatus: educationStatusType;
  education: string | undefined;
}
export interface bankInformationDataType {
  bankAccountNum: string | undefined;
  bankName: string | undefined;
  panNum: string | undefined;
  ifscCode: string | undefined;
}
export interface emergencyContactDataType {
  emergencyContactName: string | undefined;
  emergencyContactPhone: string | undefined;
}

export interface attendanceAndDepartureInfoDataType {
  annualLeavesBalance: number;
  branch: string;
  fingerprintDevice: string;
  workPlan: string;
}
export interface salaryCalculationSystemDataType {
  currency: currencyType;
  period: periodType;
  salary: number;
  insurances: number;
  taxes: number;
}

export interface OtherCalculationSystemDataType {
  'breakAfter-deductValue': number;
  'breakAfter-deductValue-multiplierDuration': durationType;
  'breakAfter-isEnabled': boolean;
  'breakAfter-occurrences': number;
  'breakBefore-deductValue': number;
  'breakBefore-deductValue-multiplierDuration': durationType;
  'breakBefore-isEnabled': boolean;
  'breakBefore-occurrences': number;
  'missingCheckInOrCheckOut-deductValue': number;
  'missingCheckInOrCheckOut-isEnabled': boolean;
  'missingCheckInOrCheckOut-occurrences': number;
}

export interface TableRowType {
  key: string | number;
  isEnabled: boolean;
  durationStart: Moment;
  durationEnd: Moment;
  multiplier: number;
  'multiplier-duration': 'day(s)' | 'times';
  minimumOccurrences: number;
}

export interface LeavesTableData {
  key: string;
  emergencyLeave: number;
  otherLeave: number;
  personalLeave: number;
  publicHolidays: number;
  sickLeave: number;
  studyLeave: number;
  unauthorizedLeave: number;
  unpaidLeave: number;
  vacationLeave: number;
  workFromHome: number;
}

export type basicInfoDataWithImageType = basicInfoDataType & {
  id: string;
  avatarUrl: string;
};

export interface FullEmployeeDataType {
  basicInfoData: basicInfoDataWithImageType;
  personalInfoData: personalInfoDataType;
  bankInformationData: bankInformationDataType;
  emergencyContactData: emergencyContactDataType;
  attendanceAndDepartureInfoData: attendanceAndDepartureInfoDataType;
  salaryCalculationSystemData: salaryCalculationSystemDataType;
  otherCalculationSystemData: OtherCalculationSystemDataType;
  earlyArrivalDataSource: TableRowType[];
  lateArrivalDataSource: TableRowType[];
  earlyDepartureDataSource: TableRowType[];
  lateDepartureDataSource: TableRowType[];
  leavesTableDataSource: LeavesTableData[];
}
