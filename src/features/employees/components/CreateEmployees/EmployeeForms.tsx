import { IoIosSave } from 'react-icons/io';
import Btn from '../../../../components/Btn';
import HeadingTitle from '../../../../components/HeadingTitle';
import UploadImage from '../../../../components/UploadImage';
import { FaRegPenToSquare } from 'react-icons/fa6';
import BasicInformationForm from './BasicInformationForm';
import { Divider, Empty } from 'antd';
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
import {
  attendanceAndDepartureInfoDataType,
  bankInformationDataType,
  basicInfoFormType,
  emergencyContactDataType,
  OtherCalculationSystemDataType,
  personalInfoFormType,
  salaryCalculationSystemDataType
} from '../../../../types';
import { UseActionType } from '../../types';
import SpinnerAnt from '../../../../components/SpinnerAnt';

interface EmployeeFormsProps {
  handleCreateEmployee?: () => Promise<void>;
  handleEditEmployee?: () => void;
  basicInfoForm: FormInstance<basicInfoFormType>;
  personalInfoForm: FormInstance<personalInfoFormType>;
  bankInformationForm: FormInstance<bankInformationDataType>;
  emergencyContactForm: FormInstance<emergencyContactDataType>;
  attendanceAndDepartureInfoForm: FormInstance<attendanceAndDepartureInfoDataType>;
  salaryCalculationSystemForm: FormInstance<salaryCalculationSystemDataType>;
  otherCalculationSystemForm: FormInstance<OtherCalculationSystemDataType>;

  basicActionBtns?: UseActionType;
  personalInfoActionBtns?: UseActionType;
  bankInfoActionBtns?: UseActionType;
  emergencyContactActionBtns?: UseActionType;
  attendanceAndDepartureInfoActionBtns?: UseActionType;
  salaryCalculationSystemActionBtns?: UseActionType;
  otherSalaryCalculationSystemActionBtns?: UseActionType;

  isSavedGlobal?: boolean;
  isSavedGlobalLoading?: boolean;
}

function EmployeeForms({
  handleCreateEmployee,
  handleEditEmployee,
  basicInfoForm,
  personalInfoForm,
  bankInformationForm,
  emergencyContactForm,
  attendanceAndDepartureInfoForm,
  salaryCalculationSystemForm,
  otherCalculationSystemForm,

  basicActionBtns,
  personalInfoActionBtns,
  bankInfoActionBtns,
  emergencyContactActionBtns,
  attendanceAndDepartureInfoActionBtns,
  salaryCalculationSystemActionBtns,
  otherSalaryCalculationSystemActionBtns,

  isSavedGlobal = false,
  isSavedGlobalLoading = false
}: EmployeeFormsProps) {
  const { id: empoyeeId } = useSelector((state: RootState) => state.employees.currentEmployee.basicInfoData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { employeeId: paramsEmployeeId } = useParams();

  const isEmployeeDetailsPage = paramsEmployeeId ? true : false;

  const handleCancel = () => {
    dispatch(clearCurrentEmployee());
    navigate('/dashboard/employees');
  };

  if (!isEmployeeDetailsPage && !empoyeeId) {
    return <Empty description="Employee Not Found" className="grid min-h-[calc(100vh-150px)] place-content-center" />;
  }

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
            isSavedGlobal ? (
              <Btn className="font-medium" size="md" type="submit" onClick={handleEditEmployee}>
                <FaRegPenToSquare size={20} />
                Edit
              </Btn>
            ) : (
              <Btn className="font-medium" size="md" type="submit" onClick={handleEditEmployee}>
                <IoIosSave size={20} />
                Save
              </Btn>
            )
          ) : (
            <Btn className="font-medium" size="md" type="submit" onClick={handleCreateEmployee}>
              <IoIosSave size={20} />
              Save
            </Btn>
          )}
        </div>
      </div>

      {/* Employee Info */}
      {isSavedGlobalLoading ? (
        <div className="mt-20">
          <SpinnerAnt />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-two gap-4">
          <div className="rounded-[20px] border border-gray/light p-6">
            <BasicInformationForm
              form={basicInfoForm}
              isEmployeeDetailsPage={isEmployeeDetailsPage}
              actionBtns={basicActionBtns}
            />
            <Divider className="my-4" />
            <PersonalInfo
              form={personalInfoForm}
              isEmployeeDetailsPage={isEmployeeDetailsPage}
              actionBtns={personalInfoActionBtns}
            />
            <Divider className="my-4" />
            <BankInformation
              form={bankInformationForm}
              isEmployeeDetailsPage={isEmployeeDetailsPage}
              actionBtns={bankInfoActionBtns}
            />
            <Divider className="my-4" />
            <EmergencyContact
              form={emergencyContactForm}
              isEmployeeDetailsPage={isEmployeeDetailsPage}
              actionBtns={emergencyContactActionBtns}
            />
            <Divider className="my-4" />
            <AttendanceAndDepartureInformation
              form={attendanceAndDepartureInfoForm}
              isEmployeeDetailsPage={isEmployeeDetailsPage}
              actionBtns={attendanceAndDepartureInfoActionBtns}
            />
            <Divider className="my-4" />
            <SalaryCalculationSystem
              form={salaryCalculationSystemForm}
              isEmployeeDetailsPage={isEmployeeDetailsPage}
              actionBtns={salaryCalculationSystemActionBtns}
            />
          </div>
          {/* Calculation Systems */}
          <div className="rounded-[20px] border border-gray/light p-6">
            <CalculationSystemsSection
              otherCalculationSystemForm={otherCalculationSystemForm}
              isEmployeeDetailsPage={isEmployeeDetailsPage}
              actionBtns={otherSalaryCalculationSystemActionBtns}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeForms;
