import { IoIosSave } from 'react-icons/io';
import HeadingTitle from '../../../components/HeadingTitle';
import UploadImage from '../../../components/UploadImage';
import { HiMiniXMark } from 'react-icons/hi2';
import Btn from '../../../components/Btn';
import BasicInformationForm from '../components/CreateEmployees/BasicInformationForm';
import CalculationSystems from '../components/CreateEmployees/CalculationSystems';
import { Divider } from 'antd';
import PersonalInfo from '../components/CreateEmployees/PersonalInfo';
import BankInformation from '../components/CreateEmployees/BankInformation';
import EmergencyContact from '../components/CreateEmployees/EmergencyContact';
import AttendanceAndDepartureInformation from '../components/CreateEmployees/AttendanceAndDepartureInformation';
import SalaryCalculationSystem from '../components/CreateEmployees/SalaryCalculationSystem';

function CreateEmployee() {
  // const profileImageUrl = '';

  return (
    <div className="create-employee">
      {/* Just the heading */}
      <div className="flex flex-wrap items-center justify-between gap-5">
        <HeadingTitle>Create Employee</HeadingTitle>
        <div className="rounded-bl-[50px] rounded-tr-[50px] border border-gray/light px-7 py-[10px] shadow-dropShadow">
          <UploadImage />
        </div>
        <div className="flex items-center gap-4">
          {/* Cancel Button */}
          <Btn color="blueAccent" className="rounded-3xl font-medium" size="md">
            <HiMiniXMark size={20} />
            Cancel
          </Btn>
          {/* Save Button */}
          <Btn className="font-medium" size="md">
            <IoIosSave size={20} />
            Save
          </Btn>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-4 grid grid-cols-two gap-4">
        <div className="rounded-[20px] border border-gray/light p-6">
          {/* Basic Information */}
          <BasicInformationForm />
          <Divider className="my-4" />
          <PersonalInfo />
          <Divider className="my-4" />
          <BankInformation />
          <Divider className="my-4" />
          <EmergencyContact />
          <Divider className="my-4" />
          <AttendanceAndDepartureInformation />
          <Divider className="my-4" />
          <SalaryCalculationSystem />
        </div>

        {/* Calculation Systems */}
        <div className="rounded-[20px] border border-gray/light p-6">
          <CalculationSystems />
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
