import { Dayjs } from 'dayjs';
import React from 'react';

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

export interface AvatarInfo {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error';
  url: string;
}

export interface basicInfoDataType {
  fullName: string | null;
  position: string | null;
  department: string | null;
  dateOfDeparture: string | null;
  dateOfJoining: string | null;
  employmentType: employmentType;
  email: string | null;
  phone: string | null;
  status: statusType | null;
}
export interface basicInfoFormType {
  fullName: string | null;
  position: string | null;
  department: string | null;
  dateOfDeparture: Dayjs | null;
  dateOfJoining: Dayjs | null;
  employmentType: employmentType;
  email: string | null;
  phone: string | null;
  status: statusType | null;
}
export interface personalInfoDataType {
  nationlIdNum: string | null;
  nationalIdExpDate: string | null;
  dateOfBirth: string | null;
  maritalStatus: maritalStatusType;
  gender: genderType | null;
  educationStatus: educationStatusType;
  education: string | null;
}
export interface personalInfoFormType {
  nationlIdNum: string | null;
  nationalIdExpDate: Dayjs | null;
  dateOfBirth: Dayjs | null;
  maritalStatus: maritalStatusType;
  gender: genderType | null;
  educationStatus: educationStatusType;
  education: string | null;
}
export interface bankInformationDataType {
  bankAccountNum: string | null;
  bankName: string | null;
  panNum: string | null;
  ifscCode: string | null;
}
export interface emergencyContactDataType {
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
}

export interface attendanceAndDepartureInfoDataType {
  annualLeavesBalance: number | null;
  branch: string | null;
  fingerprintDevice: string | null;
  workPlan: string | null;
}
export interface salaryCalculationSystemDataType {
  currency: currencyType;
  period: periodType;
  salary: number | null;
  insurances: number | null;
  taxes: number | null;
}

export interface OtherCalculationSystemDataType {
  'breakAfter-deductValue': number | null;
  'breakAfter-deductValue-multiplierDuration': durationType;
  'breakAfter-isEnabled': boolean;
  'breakAfter-occurrences': number | null;
  'breakBefore-deductValue': number | null;
  'breakBefore-deductValue-multiplierDuration': durationType;
  'breakBefore-isEnabled': boolean;
  'breakBefore-occurrences': number | null;
  'missingCheckInOrCheckOut-deductValue': number | null;
  'missingCheckInOrCheckOut-isEnabled': boolean;
  'missingCheckInOrCheckOut-occurrences': number | null;
}

export interface TableRowType {
  key: string | number;
  isEnabled: boolean;
  durationStart: Dayjs | string | null;
  durationEnd: Dayjs | string | null;
  multiplier: number;
  'multiplier-duration': 'day(s)' | 'times';
  minimumOccurrences: number;
}

export interface LeavesTableDataType {
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

export interface basicInfoDataWithImageType {
  id: string | null;
  avatarInfo: AvatarInfo;
  basic: basicInfoDataType;
}

export interface CurrentEmployeeType {
  basicInfoData: basicInfoDataWithImageType;
  personalInfoData: personalInfoDataType;
  bankInformationData: bankInformationDataType;
  emergencyContactData: emergencyContactDataType;
  attendanceAndDepartureInfoData: attendanceAndDepartureInfoDataType;
  salaryCalculationSystemData: salaryCalculationSystemDataType;
  otherCalculationSystemData: OtherCalculationSystemDataType;
  earlyArrivalData: TableRowType[];
  lateArrivalData: TableRowType[];
  earlyDepartureData: TableRowType[];
  lateDepartureData: TableRowType[];
  leavesTableData: [LeavesTableDataType];
}

export type CurrentEmployeeValuesType = Partial<CurrentEmployeeType[keyof CurrentEmployeeType]>;

export type OptionalEmployeeSectionsType =
  | Partial<basicInfoDataWithImageType>
  | Partial<basicInfoDataType>
  | Partial<personalInfoDataType>
  | Partial<bankInformationDataType>
  | Partial<emergencyContactDataType>
  | Partial<attendanceAndDepartureInfoDataType>
  | Partial<salaryCalculationSystemDataType>
  | Partial<OtherCalculationSystemDataType>
  | TableRowType[]
  | Partial<LeavesTableDataType>;

export type EmployeeCurrentKeysNameType = keyof CurrentEmployeeType | 'basicInfoData/basic';

export type EmployeeCalculationTableNameType =
  | 'earlyArrivalData'
  | 'lateArrivalData'
  | 'earlyDepartureData'
  | 'lateDepartureData';
