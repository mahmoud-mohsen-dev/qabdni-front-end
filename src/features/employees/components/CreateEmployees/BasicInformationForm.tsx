import { DatePicker, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd';
import LabelInput from '../LabelInput';
import CustomSelect from '../../../../components/CustomSelect';
import PositionsDrawer from '../../../company/components/Drawer/PositionsDrawer';
import { RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import useDrawer from '../../../../hooks/useDrawer';
import { basicInfoFormType, ValueItemType } from '../../../../types';
import DepartmentsDrawer from '../../../company/components/Drawer/DepartmentsDrawer';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeName } from '../../../../utils/user';
import { RadioButton, RadioGroup } from '../../../../components/RadioGroup';
import useActionBtns from '../../hooks/useActionBtns';
import SubHeading from '../SubHeading';
import ActionBtns from '../ActionBtns';
import SpinnerAnt from '../../../../components/SpinnerAnt';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateCurrentEmployee } from '../../store/employeesSlice';
import { parseDayjsToIsoString, parseIsoStringToDayjs } from '../../../../utils/date';
import { valueInArray, valueInArrayObjectOfNames } from '../../../../utils/helpers';
// import moment from 'moment';

interface BasicInfoFormProps {
  form: FormInstance<basicInfoFormType>;
  isEmployeeDetailsPage?: boolean;
  employeeIdCreateProps?: string;
}

function BasicInformationForm({ isEmployeeDetailsPage = false, form, employeeIdCreateProps = '' }: BasicInfoFormProps) {
  const { all: positionsFinalAll } = useSelector((state: RootState) => state.positions.final);
  const { all: departmentsFinalAll } = useSelector((state: RootState) => state.departments.final);
  const { basic: basicInfo, id: employeeId } = useSelector((state: RootState) => {
    return state.employees.currentEmployee.basicInfoData;
  });
  const { openedDrawer, loading, closeDrawer, showLoading } = useDrawer();
  const { isSaved, handleSave, isLoading, handleEdit, handleCancel } = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: form,
    id: employeeId,
    target: 'basicInfoData'
  });

  // This for updating employee Id in the basic info form
  const location = useLocation();
  const { pathname } = location;
  // Split the pathname by '/' and get the last segment
  const lastSegment = pathname.split('/').filter(Boolean).pop();
  const dispatch = useDispatch();
  useEffect(() => {
    if (lastSegment === 'create-employee') {
      dispatch(updateCurrentEmployee({ target: 'basicInfoData', data: { id: employeeIdCreateProps } }));
    }
  }, []);

  // Update form fields from the current employee data from redux store
  useEffect(() => {
    form.setFieldsValue({
      ...basicInfo,
      position: valueInArrayObjectOfNames(basicInfo.position, positionsFinalAll),
      department: valueInArrayObjectOfNames(basicInfo.department, departmentsFinalAll),
      status: valueInArray(basicInfo.status, ['active', 'onHoliday', 'terminated', 'remote']),
      employmentType: valueInArray(
        basicInfo.employmentType,
        ['fullTime', 'partTime', 'contract', 'freelance', 'remote'],
        'fullTime'
      ),
      dateOfJoining: parseIsoStringToDayjs(basicInfo.dateOfJoining),
      dateOfDeparture: parseIsoStringToDayjs(basicInfo.dateOfDeparture)
    });
  }, [basicInfo]);

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      form={form}
      initialValues={{
        ...basicInfo,
        position: valueInArrayObjectOfNames(basicInfo.position, positionsFinalAll),
        department: valueInArrayObjectOfNames(basicInfo.department, departmentsFinalAll),
        status: valueInArray(basicInfo.status, ['active', 'onHoliday', 'terminated', 'remote']),
        employmentType: valueInArray(
          basicInfo.employmentType,
          ['fullTime', 'partTime', 'contract', 'freelance', 'remote'],
          'fullTime'
        ),
        dateOfJoining: parseIsoStringToDayjs(basicInfo.dateOfJoining),
        dateOfDeparture: parseIsoStringToDayjs(basicInfo.dateOfDeparture)
      }}
    >
      {isEmployeeDetailsPage ? (
        <ActionBtns isSaved={isSaved} handleSave={handleSave} handleEdit={handleEdit} handleCancel={handleCancel}>
          <SubHeading>Basic Information</SubHeading>
        </ActionBtns>
      ) : (
        <SubHeading>Basic Information</SubHeading>
      )}

      {isLoading ? (
        <SpinnerAnt />
      ) : (
        <>
          <div className="mb-4 flex items-center">
            <h4 className="min-w-[200px] max-w-[41.66666666666667%] flex-[0_0_41.66666666666667%] text-[13px] font-medium uppercase leading-4">
              ID NO.
            </h4>
            <p className="max-w-[58.333333333333336%] flex-[0_0_58.333333333333336%] text-[13px] font-medium uppercase leading-4 text-gray/dark">
              {employeeId}
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
            <Input
              name="fullName"
              placeholder="Employee Name"
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { fullName: value } }));
              }}
            />
          </Form.Item>
          {/* Positions */}
          <PositionsDrawer isOpened={openedDrawer === 'positions'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="position"
            // form={form}
            label={<LabelInput title="Position" description="Choose a role" isRequired={true} />}
            rules={[{ required: true, message: 'Position is required' }]}
            placeHolder="Choose position"
            createText="Create new position"
            disabled={isSaved}
            options={() => {
              return positionsFinalAll.map((position: ValueItemType) => ({
                value: position.name,
                label: <span className="capitalize">{position.name}</span>
              }));
            }}
            handleDrawerOpen={() => {
              showLoading('positions');
              dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { position: null } }));
              console.log(basicInfo);
              form.setFieldValue('position', null);
            }}
            onChange={(value) => {
              dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { position: value } }));
            }}
          />
          {/* Departments */}
          <DepartmentsDrawer isOpened={openedDrawer === 'departments'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="department"
            // form={form}
            label={<LabelInput title="Department" description="Choose department" isRequired={true} />}
            rules={[{ required: true, message: 'Department is required' }]}
            disabled={isSaved}
            placeHolder="Choose Category"
            createText="Create new department"
            // value={basicInfo.department}
            options={() => {
              return departmentsFinalAll.map((department: ValueItemType) => ({
                value: department.name,
                label: <span className="capitalize">{department.name}</span>
              }));
            }}
            handleDrawerOpen={() => {
              showLoading('departments');
              dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { department: null } }));
              form.setFieldValue('department', null);
            }}
            onChange={(value) => {
              dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { department: value } }));
            }}
          />
          {/* Status Type */}
          <Form.Item
            name="status"
            label={<LabelInput title="status type" description="Choose status" isRequired={true} />}
            rules={[{ required: true, message: 'Status is required' }]}
          >
            <Select
              placeholder={capitalizeName('Choose Employee Working Status')}
              suffixIcon={<IoIosArrowDown size={16} />}
              allowClear
              disabled={isSaved}
              onChange={(value) => {
                dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { status: value } }));
              }}
              options={[
                { label: 'Active', value: 'active' },
                { label: 'On Holiday', value: 'onHoliday' },
                { label: 'Remote', value: 'remote' },
                { label: 'Terminated', value: 'terminated' }
              ]}
            />
          </Form.Item>
          {/* Date Of Joining */}
          <Form.Item
            name="dateOfJoining"
            label={<LabelInput title="Date Of Joining" description="Choose employee's join date" isRequired={true} />}
            rules={[{ required: true, message: 'Date of joining is required' }]}
          >
            <DatePicker
              placeholder={capitalizeName("Choose employee's join date")}
              className="w-full py-[7px]"
              allowClear
              disabled={isSaved}
              onChange={(value) => {
                console.log(value);
                dispatch(
                  updateCurrentEmployee({
                    target: 'basicInfoData/basic',
                    data: { dateOfJoining: parseDayjsToIsoString(value) }
                  })
                );
              }}
            />
          </Form.Item>
          {/* Date Of Departure */}
          <Form.Item
            name="dateOfDeparture"
            label={<LabelInput title="Date of Departure" description="Choose employee's departure date" />}
          >
            <DatePicker
              placeholder={capitalizeName("Select employee's departure date")}
              className="w-full py-[7px]"
              allowClear
              disabled={isSaved}
              onChange={(value) => {
                dispatch(
                  updateCurrentEmployee({
                    target: 'basicInfoData/basic',
                    data: { dateOfDeparture: parseDayjsToIsoString(value) }
                  })
                );
              }}
            />
          </Form.Item>
          {/* Phone Number */}
          <Form.Item
            name="phone"
            label={<LabelInput title="Phone Number" description="Only numbers" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder={capitalizeName('Enter Employee Phone Number')}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { phone: value } }));
              }}
            />
          </Form.Item>
          {/* Email Address */}
          <Form.Item
            name="email"
            label={<LabelInput title="Email Address" description="Add employee email" />}
            rules={[{ whitespace: true }, { type: 'email' }]}
          >
            <Input
              placeholder={'qabdni@example.com'}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { email: value } }));
              }}
            />
          </Form.Item>
          {/* Employment Type */}
          <Form.Item
            name="employmentType"
            label={<LabelInput title="Employment Type" description="Pick one or multiple options" />}
          >
            <RadioGroup
              form={form}
              name="employmentType"
              disabled={isSaved}
              onChange={(value) => {
                // form.setFieldValue('employmentType', value);
                dispatch(updateCurrentEmployee({ target: 'basicInfoData/basic', data: { employmentType: value } }));
              }}
            >
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
