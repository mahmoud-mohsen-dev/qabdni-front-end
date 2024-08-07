import { IoIosSave } from 'react-icons/io';
import HeadingTitle from '../../../components/HeadingTitle';
import UploadImage, { ImageInfoType } from '../../../components/UploadImage';
import { HiMiniXMark } from 'react-icons/hi2';
import Btn from '../../../components/Btn';
import BasicInformationForm from '../components/CreateEmployees/BasicInformationForm';
import { Divider, message } from 'antd';
import PersonalInfo from '../components/CreateEmployees/PersonalInfo';
import BankInformation from '../components/CreateEmployees/BankInformation';
import EmergencyContact from '../components/CreateEmployees/EmergencyContact';
import AttendanceAndDepartureInformation from '../components/CreateEmployees/AttendanceAndDepartureInformation';
import SalaryCalculationSystem from '../components/CreateEmployees/SalaryCalculationSystem';
import CalculationSystemsSection from '../components/CreateEmployees/CalculationSystemsSection';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import {
  attendanceAndDepartureInfoDataType,
  bankInformationDataType,
  basicInfoDataType,
  emergencyContactDataType,
  FullEmployeeDataType,
  LeavesTableData,
  OtherCalculationSystemDataType,
  personalInfoDataType,
  salaryCalculationSystemDataType
} from '../../../types';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import moment from 'moment';
import { DataType } from '../components/CreateEmployees/CalculationSystemTable';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { clearCurrentEmployee, createEmployee } from '../store/employeesSlice';
import { useNavigate } from 'react-router-dom';

const tableData: DataType[] = [
  {
    key: '0',
    isEnabled: true,
    durationStart: moment('07:00', 'HH:mm'),
    durationEnd: moment('08:00', 'HH:mm'),
    multiplier: 1.25,
    'multiplier-duration': 'day(s)',
    minimumOccurrences: 5
  },
  {
    key: '1',
    isEnabled: false,
    durationStart: moment('05:00', 'HH:mm'),
    durationEnd: moment('10:00', 'HH:mm'),
    multiplier: 50,
    'multiplier-duration': 'times',
    minimumOccurrences: 0
  }
];

const leavesTableData = [
  {
    key: '0',
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
];

function CreateEmployee() {
  const employeeId = '01';
  const [imageInfo, setImageInfo] = useState<ImageInfoType>({
    uid: '-1',
    name: 'image.png',
    status: 'done' as const,
    // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    url: 'https://lh3.googleusercontent.com/pw/AP1GczPHPgTKlGVhES9_uzGRTv7lweR1QRSWkl1b2KyQrEkH5WJBlTj_oCpQkLB0Qa1UI910tsSbk94TK9xDCNXtPe7hpk90jiTBs3mSa5X2fSYKz39nfSH3lqeRueNUOQiPcd0vjb6o3jRj4BCZwTy-Wo2FGw=w984-h984-s-no-gm?authuser=0'
  });
  const [basicInfoForm] = useForm<basicInfoDataType>();
  const [personalInfoForm] = useForm<personalInfoDataType>();
  const [bankInformationForm] = useForm<bankInformationDataType>();
  const [emergencyContactForm] = useForm<emergencyContactDataType>();
  const [attendanceAndDepartureInfoForm] = useForm<attendanceAndDepartureInfoDataType>();
  const [salaryCalculationSystemForm] = useForm<salaryCalculationSystemDataType>();
  const [otherCalculationSystemForm] = useForm<OtherCalculationSystemDataType>();
  const [earlyArrivalDataSource, setEarlyArrivalDataSource] = useState<DataType[]>(tableData);
  const [lateArrivalDataSource, setLateArrivalDataSource] = useState<DataType[]>(tableData);
  const [earlyDepartureDataSource, setEarlyDepartureDataSource] = useState<DataType[]>(tableData);
  const [lateDepartureDataSource, setLateDepartureDataSource] = useState<DataType[]>(tableData);
  const [leavesTableDataSource, setLeavesTableDataSource] = useState<LeavesTableData[]>(leavesTableData);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCreateEmployee = async () => {
    try {
      const basicInfoData: basicInfoDataType = await basicInfoForm.validateFields();
      const personalInfoData: personalInfoDataType = await personalInfoForm.validateFields();
      const bankInformationData: bankInformationDataType = await bankInformationForm.validateFields();
      const emergencyContactData: emergencyContactDataType = await emergencyContactForm.validateFields();
      const attendanceAndDepartureInfoData: attendanceAndDepartureInfoDataType =
        await attendanceAndDepartureInfoForm.validateFields();
      const salaryCalculationSystemData: salaryCalculationSystemDataType =
        await salaryCalculationSystemForm.validateFields();
      const otherCalculationSystemData: OtherCalculationSystemDataType =
        await otherCalculationSystemForm.validateFields();

      const employeeData: FullEmployeeDataType = {
        basicInfoData: { ...basicInfoData, avatarUrl: imageInfo.url ?? '', id: employeeId },
        personalInfoData,
        bankInformationData,
        emergencyContactData,
        attendanceAndDepartureInfoData,
        salaryCalculationSystemData,
        otherCalculationSystemData,
        earlyArrivalDataSource,
        lateArrivalDataSource,
        earlyDepartureDataSource,
        lateDepartureDataSource,
        leavesTableDataSource
      };
      dispatch(createEmployee(employeeData));
      navigate('/dashboard/employees');
      console.log(employeeData);
    } catch (e) {
      const error = e as ValidateErrorEntity<any>;
      console.error(error.errorFields[0].errors[0]);
      message.error(error.errorFields[0].errors[0]);
    }
  };

  const handleCancel = () => {
    dispatch(clearCurrentEmployee());
    navigate('/dashboard/employees');
  };

  return (
    <div className="create-employee">
      {/* Just the heading */}
      <div className="flex flex-wrap items-center justify-between gap-5">
        <HeadingTitle>Create Employee</HeadingTitle>
        <div className="rounded-bl-[50px] rounded-tr-[50px] border border-gray/light px-7 py-[10px] shadow-dropShadow">
          <UploadImage imageInfo={imageInfo} setImageInfo={setImageInfo} />
        </div>
        <div className="flex items-center gap-4">
          {/* Cancel Button */}
          <Btn color="blueAccent" className="rounded-3xl font-medium" size="md" onClick={handleCancel}>
            <HiMiniXMark size={20} />
            Cancel
          </Btn>
          {/* Save Button */}
          <Btn className="font-medium" size="md" type="submit" onClick={handleCreateEmployee}>
            <IoIosSave size={20} />
            Save
          </Btn>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-two gap-4">
        {/* Employee Info */}
        <div className="rounded-[20px] border border-gray/light p-6">
          <BasicInformationForm form={basicInfoForm} employeeId={employeeId} />
          <Divider className="my-4" />
          <PersonalInfo form={personalInfoForm} />
          <Divider className="my-4" />
          <BankInformation form={bankInformationForm} />
          <Divider className="my-4" />
          <EmergencyContact form={emergencyContactForm} />
          <Divider className="my-4" />
          <AttendanceAndDepartureInformation form={attendanceAndDepartureInfoForm} />
          <Divider className="my-4" />
          <SalaryCalculationSystem form={salaryCalculationSystemForm} />
        </div>

        {/* Calculation Systems */}
        <div className="rounded-[20px] border border-gray/light p-6">
          <CalculationSystemsSection
            earlyArrivalDataSource={earlyArrivalDataSource}
            setEarlyArrivalDataSource={setEarlyArrivalDataSource}
            lateArrivalDataSource={lateArrivalDataSource}
            setLateArrivalDataSource={setLateArrivalDataSource}
            earlyDepartureDataSource={earlyDepartureDataSource}
            setEarlyDepartureDataSource={setEarlyDepartureDataSource}
            lateDepartureDataSource={lateDepartureDataSource}
            setLateDepartureDataSource={setLateDepartureDataSource}
            leavesTableDataSource={leavesTableDataSource}
            setLeavesTableDataSource={setLeavesTableDataSource}
            otherCalculationSystemForm={otherCalculationSystemForm}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
