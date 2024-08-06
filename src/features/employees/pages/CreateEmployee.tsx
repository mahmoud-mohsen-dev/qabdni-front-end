import { IoIosArrowDown, IoIosSave } from 'react-icons/io';
import HeadingTitle from '../../../components/HeadingTitle';
import UploadImage from '../../../components/UploadImage';
import { HiMiniXMark } from 'react-icons/hi2';
import Btn from '../../../components/Btn';
import BasicInformationForm from '../components/CreateEmployees/BasicInformationForm';
import CalculationSystems from '../components/CreateEmployees/CalculationSystems';
import { Divider, Form, InputNumber, Select, Switch } from 'antd';
import PersonalInfo from '../components/CreateEmployees/PersonalInfo';
import BankInformation from '../components/CreateEmployees/BankInformation';
import EmergencyContact from '../components/CreateEmployees/EmergencyContact';
import AttendanceAndDepartureInformation from '../components/CreateEmployees/AttendanceAndDepartureInformation';
import SalaryCalculationSystem from '../components/CreateEmployees/SalaryCalculationSystem';
import useSubHeading from '../hooks/useSubHeading';
import SubHeading from '../components/SubHeading';
import { useForm } from 'antd/es/form/Form';
import LeaveCalculationTable from '../components/CreateEmployees/LeaveCalculationTable';

function CreateEmployee() {
  // const profileImageUrl = '';
  const { isSaved, handleGlobal, handleCancel, handleEdit } = useSubHeading();
  const [form] = useForm();

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
        <div className="flex flex-col gap-3 rounded-[20px] border border-gray/light p-6">
          <SubHeading
            global={true}
            form={form}
            isSaved={isSaved}
            handleGlobal={handleGlobal}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
          >
            Calculation Systems
          </SubHeading>
          <CalculationSystems
            heading="Early Arrival calculation system"
            tooltipDurationStart="Applied before the start of the shift"
            tooltipDurationEnd="Applied before the start of the shift"
          />
          <CalculationSystems
            heading="late Arrival Calculation System"
            tooltipDurationStart="Applied after the start of the shift"
            tooltipDurationEnd="Applied after the start of the shift"
          />
          <CalculationSystems
            heading="EARLY Departure Calculation system"
            tooltipDurationStart="Applied before the end of the shift"
            tooltipDurationEnd="Applied before the end of the shift"
          />
          <CalculationSystems
            heading="Late Departure calculation system"
            tooltipDurationStart="Applied after the end of the shift"
            tooltipDurationEnd="Applied after the end of the shift"
          />

          <div>
            <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">
              Leave calculation system
            </h3>
            <LeaveCalculationTable />
          </div>

          <div>
            <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">
              Other calculation system
            </h3>
            <div className="flex flex-col gap-5">
              {/* Missing checkIn or checkOut */}
              <Form className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <Switch className="custom-switch big" />
                <p>When an employee fails to check in or check out more than</p>
                <Form.Item name="occurrences" className="!mb-0 h-fit">
                  <InputNumber addonAfter="Times" min={0} className="w-32" placeholder="0" />
                </Form.Item>
                <p>, deduct</p>
                <Form.Item name="deductValue" className="!mb-0 h-fit">
                  <InputNumber addonAfter="Day(s)" min={0} className="w-32" placeholder=".5" />
                </Form.Item>
                <p>from their salary.</p>
              </Form>

              {/* The break before*/}
              <Form className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <Switch className="custom-switch big" />
                <p>If an employee takes a break before their specified break time more than</p>
                <Form.Item name="occurrences" className="!mb-0 h-fit">
                  <InputNumber addonAfter="Times" min={0} className="w-32" placeholder="0" />
                </Form.Item>
                <p>, deduct</p>
                <Form.Item name="deductValue" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter={
                      <Form.Item
                        name="multiplier-duration"
                        className="!mb-0 flex h-[32px] items-center justify-center"
                        initialValue={'times'}
                      >
                        <Select
                          defaultValue={'times'}
                          style={{ width: 180 }}
                          suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                          options={[
                            { label: 'Times the duration', value: 'times' },
                            { label: 'Day(s)', value: 'day(s)' }
                          ]}
                        />
                      </Form.Item>
                    }
                    min={0}
                    className="w-[240px]"
                    placeholder="0"
                  />
                </Form.Item>
                <p>from their salary.</p>
              </Form>

              {/* The break after */}
              <Form className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <Switch className="custom-switch big" />
                <p>If an employee takes a break after their specified break time more than </p>
                <Form.Item name="occurrences" className="!mb-0 h-fit">
                  <InputNumber addonAfter="Times" min={0} className="w-32" placeholder="0" />
                </Form.Item>
                <p>, deduct</p>
                <Form.Item name="deductValue" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter={
                      <Form.Item
                        name="multiplier-duration"
                        className="!mb-0 flex h-[32px] items-center justify-center"
                        initialValue={'times'}
                      >
                        <Select
                          defaultValue={'times'}
                          style={{ width: 180 }}
                          suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                          options={[
                            { label: 'Times the duration', value: 'times' },
                            { label: 'Day(s)', value: 'day(s)' }
                          ]}
                        />
                      </Form.Item>
                    }
                    min={0}
                    className="w-[240px]"
                    placeholder="0"
                  />
                </Form.Item>
                <p>from their salary.</p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
