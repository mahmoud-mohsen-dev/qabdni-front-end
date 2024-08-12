import { IoIosSave } from 'react-icons/io';
import Btn from '../../../../components/Btn';
import HeadingTitle from '../../../../components/HeadingTitle';
import UploadImage from '../../../../components/UploadImage';
import { FaRegPenToSquare } from 'react-icons/fa6';
import BasicInformationForm from './BasicInformationForm';
import { Divider } from 'antd';
import type { FormInstance } from 'antd';
import PersonalInfo from './PersonalInfo';
import BankInformation from './BankInformation';
import EmergencyContact from './EmergencyContact';
import AttendanceAndDepartureInformation from './AttendanceAndDepartureInformation';
import SalaryCalculationSystem from './SalaryCalculationSystem';
import CalculationSystemsSection from './CalculationSystemsSection';
import { HiMiniXMark } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../store';
import { clearCurrentEmployee } from '../../store/employeesSlice';
import { useState } from 'react';
import {
  attendanceAndDepartureInfoDataType,
  bankInformationDataType,
  basicInfoFormType,
  emergencyContactDataType,
  LeavesTableData,
  OtherCalculationSystemDataType,
  personalInfoFormType,
  salaryCalculationSystemDataType,
  TableRowType
} from '../../../../types';

interface EmployeeFormsProps {
  handleCreateEmployee?: () => Promise<void>;
  handleEditEmployee?: () => Promise<void>;
  employeeIdCreateProps?: string;
  basicInfoForm: FormInstance<basicInfoFormType>;
  personalInfoForm: FormInstance<personalInfoFormType>;
  bankInformationForm: FormInstance<bankInformationDataType>;
  emergencyContactForm: FormInstance<emergencyContactDataType>;
  attendanceAndDepartureInfoForm: FormInstance<attendanceAndDepartureInfoDataType>;
  salaryCalculationSystemForm: FormInstance<salaryCalculationSystemDataType>;
  otherCalculationSystemForm: FormInstance<OtherCalculationSystemDataType>;
}

function EmployeeForms({
  employeeIdCreateProps,
  handleCreateEmployee,
  handleEditEmployee,
  basicInfoForm,
  personalInfoForm,
  bankInformationForm,
  emergencyContactForm,
  attendanceAndDepartureInfoForm,
  salaryCalculationSystemForm,
  otherCalculationSystemForm
}: EmployeeFormsProps) {
  const { earlyArrivalData, earlyDepartureData, lateArrivalData, lateDepartureData, leavesTableData } = useSelector(
    (state: RootState) => {
      return state.employees.currentEmployee;
    }
  );

  const [earlyArrivalDataSource, setEarlyArrivalDataSource] = useState<TableRowType[]>(earlyArrivalData);
  const [lateArrivalDataSource, setLateArrivalDataSource] = useState<TableRowType[]>(lateArrivalData);
  const [earlyDepartureDataSource, setEarlyDepartureDataSource] = useState<TableRowType[]>(earlyDepartureData);
  const [lateDepartureDataSource, setLateDepartureDataSource] = useState<TableRowType[]>(lateDepartureData);
  const [leavesTableDataSource, setLeavesTableDataSource] = useState<[LeavesTableData]>(leavesTableData);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { employeeId: paramsEmployeeId } = useParams();

  const isEmployeeDetailsPage = paramsEmployeeId ? true : false;

  const handleCancel = () => {
    dispatch(clearCurrentEmployee());
    navigate('/dashboard/employees');
  };

  return (
    <div className="create-employee">
      {/* Just the heading */}
      <div className="flex flex-wrap items-center justify-between gap-5">
        {isEmployeeDetailsPage ? (
          <HeadingTitle>Employee Details</HeadingTitle>
        ) : (
          <HeadingTitle>Create Employee</HeadingTitle>
        )}
        <div className="rounded-bl-[50px] rounded-tr-[50px] border border-gray/light px-7 py-[10px] shadow-dropShadow">
          <UploadImage />
        </div>
        <div className="flex items-center gap-4">
          {/* Cancel Button */}
          <Btn color="blueAccent" className="rounded-3xl font-medium" size="md" onClick={handleCancel}>
            <HiMiniXMark size={20} />
            Cancel
          </Btn>
          {/* Save Button */}
          {paramsEmployeeId ? (
            <Btn className="font-medium" size="md" type="submit" onClick={handleEditEmployee}>
              <FaRegPenToSquare size={20} />
              Edit
            </Btn>
          ) : (
            <Btn className="font-medium" size="md" type="submit" onClick={handleCreateEmployee}>
              <IoIosSave size={20} />
              Save
            </Btn>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-two gap-4">
        {/* Employee Info */}
        <div className="rounded-[20px] border border-gray/light p-6">
          <BasicInformationForm
            form={basicInfoForm}
            isEmployeeDetailsPage={isEmployeeDetailsPage}
            employeeIdCreateProps={employeeIdCreateProps}
          />
          <Divider className="my-4" />
          <PersonalInfo form={personalInfoForm} isEmployeeDetailsPage={isEmployeeDetailsPage} />
          <Divider className="my-4" />
          <BankInformation form={bankInformationForm} isEmployeeDetailsPage={isEmployeeDetailsPage} />
          <Divider className="my-4" />
          <EmergencyContact form={emergencyContactForm} isEmployeeDetailsPage={isEmployeeDetailsPage} />
          <Divider className="my-4" />
          <AttendanceAndDepartureInformation
            form={attendanceAndDepartureInfoForm}
            isEmployeeDetailsPage={isEmployeeDetailsPage}
          />
          <Divider className="my-4" />
          <SalaryCalculationSystem form={salaryCalculationSystemForm} isEmployeeDetailsPage={isEmployeeDetailsPage} />
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
            isEmployeeDetailsPage={isEmployeeDetailsPage}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeeForms;
