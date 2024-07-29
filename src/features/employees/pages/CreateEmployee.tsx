import { IoIosSave } from 'react-icons/io';
import HeadingTitle from '../../../components/HeadingTitle';
import UploadImage from '../../../components/UploadImage';
import { HiMiniXMark } from 'react-icons/hi2';
import SubHeading from '../components/CreateEmployees/SubHeading';
import Btn from '../../../components/Btn';
import BasicInformationForm from '../components/CreateEmployees/BasicInformationForm';

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
        </div>

        {/* Calculation Systemsn */}
        <div className="rounded-[20px] border border-gray/light p-6">
          <SubHeading global={true}>Calculation Systems</SubHeading>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
