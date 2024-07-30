import { DatePicker, Form, Input, Select, Spin } from 'antd';
import SubHeading from './SubHeading';
import LabelInput from './LabelInput';
import CustomSelect from '../../../../components/CustomSelect';
import PositionsDrawer from '../Drawer/PositionsDrawer';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import useDrawer from '../../../../hooks/useDrawer';
import { ValueItemType } from '../../../../types';
import DepartmentsDrawer from '../Drawer/DepartmentsDrawer';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeName } from '../../../../utils/user';
import { RadioButton, RadioGroup } from '../../../../components/RadioGroup';
import useSubHeading from '../../hooks/useSubHeading';
import { useForm } from 'antd/es/form/Form';

function BasicInformationForm() {
  const { positions, departments } = useSelector((state: RootState) => state);
  const { openedDrawer, loading, closeDrawer, showLoading } = useDrawer();
  const { isSaved, handleSave, handleCancel, handleEdit, isLoading } = useSubHeading();
  const [form] = useForm();
  return (
    <Form
      labelCol={{ span: 11 }}
      wrapperCol={{ span: 13 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      onFinish={(values) => {
        console.log(values);
        handleSave();
      }}
      form={form}
    >
      <SubHeading isSaved={isSaved} handleCancel={handleCancel} handleEdit={handleEdit}>
        Basic Information
      </SubHeading>

      {isLoading ? (
        <div className="m-auto grid place-items-center py-20">
          <Spin tip="Loading" size="large">
            <div style={{ padding: '50px' }} />
          </Spin>
        </div>
      ) : (
        <>
          <div className="my-4 flex items-center">
            <h4 className="min-w-[200px] max-w-[45.83333333333333%] flex-[0_0_45.83333333333333%] text-[13px] font-medium uppercase leading-4">
              ID NO.
            </h4>
            <p className="max-w-[54.166666666666664%] flex-[0_0_54.166666666666664%] text-[13px] font-medium uppercase leading-4 text-gray/dark">
              01
            </p>
          </div>
          {/* Full Name */}
          <Form.Item
            name="fullName"
            label={<LabelInput title="full name" description="add employee name" isRequired={true} />}
            rules={[
              { required: true, message: 'Full name is required' },
              { whitespace: true },
              { min: 3 },
              { max: 35 }
            ]}
          >
            <Input placeholder="Employee Name" disabled={isSaved} />
          </Form.Item>
          {/* Positions */}
          <PositionsDrawer isOpened={openedDrawer === 'positions'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="position"
            label={<LabelInput title="Position" description="Choose a role" isRequired={true} />}
            rules={[{ required: true, message: 'Position is required' }]}
            placeHolder="Choose position"
            createText="Create new position"
            disabled={isSaved}
            options={() => {
              return positions.final.all.map((position: ValueItemType) => ({
                value: position.name,
                label: <span className="capitalize">{position.name}</span>
              }));
            }}
            handleDrawerOpen={() => {
              showLoading('positions');
              form.setFieldValue('department', null);
            }}
          />
          {/* Departments */}
          <DepartmentsDrawer isOpened={openedDrawer === 'departments'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="department"
            label={<LabelInput title="Department" description="Choose department" isRequired={true} />}
            rules={[{ required: true, message: 'Department is required' }]}
            disabled={isSaved}
            placeHolder="Choose Category"
            createText="Create new department"
            options={() => {
              return departments.final.all.map((department: ValueItemType) => ({
                value: department.name,
                label: <span className="capitalize">{department.name}</span>
              }));
            }}
            handleDrawerOpen={() => {
              showLoading('departments');
              form.setFieldValue('department', null);
            }}
          />
          {/* Status Type */}
          <Form.Item
            name="status"
            label={<LabelInput title="status type" description="Choose status" isRequired={true} />}
            rules={[{ required: true, message: 'Status is required' }]}
            // initialValue={null}
          >
            <Select
              placeholder={capitalizeName('Choose Employee Working Status')}
              suffixIcon={<IoIosArrowDown size={16} />}
              allowClear
              disabled={isSaved}
              options={[
                { label: 'Active', value: 'active' },
                { label: 'On Holiday', value: 'onHoliday' },
                { label: 'Remote' },
                { label: 'Terminated', value: 'terminated' }
              ]}
            />
          </Form.Item>
          {/* Date Of Joining */}
          <Form.Item
            name="dateOfJoining"
            label={
              <LabelInput title="Date Of Joining" description="Choose the employee's join date" isRequired={true} />
            }
            rules={[{ required: true, message: 'Date of joining is required' }]}
          >
            <DatePicker
              placeholder={capitalizeName("Choose the employee's join date")}
              className="w-full py-[7px]"
              allowClear
              disabled={isSaved}
            />
          </Form.Item>
          {/* Date Of Departure */}
          <Form.Item
            name="dateOfDeparture"
            label={<LabelInput title="Date of Departure" description="Choose the employee's departure date" />}
            // rules={[{ required: true, message: 'Date of Departure is required' }]}
          >
            <DatePicker
              placeholder={capitalizeName("Select the employee's date of Departure")}
              className="w-full py-[7px]"
              allowClear
              disabled={isSaved}
            />
          </Form.Item>
          {/* Phone Number */}
          <Form.Item
            name="phone"
            label={<LabelInput title="Phone Number" description="Only numbers" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input placeholder={capitalizeName('Enter Employee Phone Number')} disabled={isSaved} />
          </Form.Item>
          {/* Email Address */}
          <Form.Item
            name="email"
            label={<LabelInput title="Email Address" description="Add employee email" />}
            rules={[{ whitespace: true }, { type: 'email' }]}
          >
            <Input placeholder={'qabdni@example.com'} disabled={isSaved} />
          </Form.Item>
          {/* Employment Type */}
          <Form.Item
            name="employmentType"
            label={<LabelInput title="Employment Type" description="Pick one or multiple options" />}
          >
            <RadioGroup disabled={isSaved} defaultValue="fullTime">
              <RadioButton value="fullTime">Full time</RadioButton>
              <RadioButton value="partTime">Part Time</RadioButton>
              <RadioButton value="contract">Contract</RadioButton>
              <RadioButton value="freelance">Freelance</RadioButton>
              <RadioButton value="remote">Remote</RadioButton>
            </RadioGroup>
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default BasicInformationForm;
