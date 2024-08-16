import { DatePicker, Form, Input, Select, Spin } from 'antd';
import LabelInput from '../LabelInput';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeName } from '../../../../utils/user';
import { RadioButton, RadioGroup } from '../../../../components/RadioGroup';
import TextArea from 'antd/es/input/TextArea';
import SubHeading from '../SubHeading';
import ActionBtns from '../ActionBtns';
import type { FormInstance } from 'antd';
import { personalInfoFormType } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { updateCurrentEmployee } from '../../store/employeesSlice';
import { useEffect } from 'react';
import { parseDayjsToIsoString, parseIsoStringToDayjs } from '../../../../utils/date';
import { valueInArray } from '../../../../utils/helpers';
import { UseActionType } from '../../types';

interface PersonalInfoProps {
  form: FormInstance<personalInfoFormType>;
  isEmployeeDetailsPage?: boolean;
  actionBtns?: UseActionType;
}

function PersonalInfo({ isEmployeeDetailsPage = false, form, actionBtns }: PersonalInfoProps) {
  const { personalInfoData } = useSelector((state: RootState) => {
    return state.employees.currentEmployee;
  });

  let isSaved, handleSave, isLoading, handleEdit, handleCancel;
  if (actionBtns) {
    isSaved = actionBtns.isSaved ?? false;
    handleSave =
      actionBtns.handleSave ??
      (() => {
        console.error('error at handleSave');
      });
    isLoading =
      actionBtns.isLoading ??
      (() => {
        console.error('error at isLoading');
      });
    handleEdit =
      actionBtns.handleEdit ??
      (() => {
        console.error('error at handleEdit');
      });
    handleCancel =
      actionBtns.handleCancel ??
      (() => {
        console.error('error at handleCancel');
      });
  }
  const dispatch = useDispatch();

  // Update form fields from the current employee data from redux store
  useEffect(() => {
    form.setFieldsValue({
      ...personalInfoData,
      gender: valueInArray(personalInfoData.gender, ['male', 'female']),
      nationalIdExpDate: parseIsoStringToDayjs(personalInfoData.nationalIdExpDate),
      dateOfBirth: parseIsoStringToDayjs(personalInfoData.dateOfBirth)
    });
  }, [personalInfoData]);

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      // onFinish={(values) => {
      //   console.log(values);
      //   if (isEditable) {
      //     handleSave();
      //   }
      // }}
      form={form}
      initialValues={{
        ...personalInfoData,
        gender: valueInArray(personalInfoData.gender, ['male', 'female']),
        nationalIdExpDate: parseIsoStringToDayjs(personalInfoData.nationalIdExpDate),
        dateOfBirth: parseIsoStringToDayjs(personalInfoData.dateOfBirth)
      }}
    >
      {isEmployeeDetailsPage ? (
        <ActionBtns isSaved={isSaved} handleSave={handleSave} handleEdit={handleEdit} handleCancel={handleCancel}>
          <SubHeading>Personal Info</SubHeading>
        </ActionBtns>
      ) : (
        <SubHeading>Personal Info</SubHeading>
      )}

      {isLoading ? (
        <div className="m-auto grid place-items-center py-20">
          <Spin tip="Loading" size="large">
            <div style={{ padding: '50px' }} />
          </Spin>
        </div>
      ) : (
        <>
          {/* Nation Id No */}
          <Form.Item
            name="nationlIdNum"
            label={<LabelInput title="National ID No." description="Add Passport No." />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder="National ID No."
              disabled={isSaved}
              onChange={(e) => {
                console.log(e.target.value);
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'personalInfoData', data: { nationlIdNum: value } }));
              }}
            />
          </Form.Item>

          {/* National ID Exp Date. */}
          <Form.Item
            name="nationalIdExpDate"
            label={<LabelInput title="National ID Exp Date." description="YYYY-MM-DD" />}
          >
            <DatePicker
              placeholder={capitalizeName('National ID Exp Date')}
              className="w-full py-[7px]"
              allowClear
              disabled={isSaved}
              onChange={(value) => {
                dispatch(
                  updateCurrentEmployee({
                    target: 'personalInfoData',
                    data: { nationalIdExpDate: parseDayjsToIsoString(value) as string }
                  })
                );
              }}
            />
          </Form.Item>

          {/* Date of Birthday. */}
          <Form.Item
            name="dateOfBirth"
            label={<LabelInput title="Date of Birthday" description="YYYY-MM-DD" isRequired={true} />}
            rules={[{ required: true, message: 'Date of birthday is required' }]}
          >
            <DatePicker
              placeholder={capitalizeName("Select the employee's date of birth")}
              className="w-full py-[7px]"
              allowClear
              disabled={isSaved}
              onChange={(value) => {
                console.log(value);
                console.log(parseDayjsToIsoString(value));
                dispatch(
                  updateCurrentEmployee({
                    target: 'personalInfoData',
                    data: { dateOfBirth: parseDayjsToIsoString(value) as string }
                  })
                );
              }}
            />
          </Form.Item>

          {/* Marital Status */}
          <Form.Item
            name="maritalStatus"
            label={<LabelInput title="Marital status" description="Choose option if available" />}
            // initialValue={form.getFieldValue('maritalStatus') ?? 'single'}
          >
            <RadioGroup
              className="self-center"
              form={form}
              name="maritalStatus"
              disabled={isSaved}
              onChange={(value) => {
                // form.setFieldValue('maritalStatus', value);d
                dispatch(updateCurrentEmployee({ target: 'personalInfoData', data: { maritalStatus: value } }));
              }}
            >
              <RadioButton value="single">Single</RadioButton>
              <RadioButton value="married">Married</RadioButton>
              <RadioButton value="divorced">Divorced</RadioButton>
            </RadioGroup>
          </Form.Item>

          {/* Gender */}
          <Form.Item
            name="gender"
            label={<LabelInput title="Gender" description="Choose your gender" isRequired={true} />}
            rules={[{ required: true, message: 'Gender is required' }]}
          >
            <Select
              placeholder={capitalizeName('Choose your gender')}
              suffixIcon={<IoIosArrowDown size={16} />}
              allowClear
              disabled={isSaved}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]}
              onChange={(value) => {
                dispatch(updateCurrentEmployee({ target: 'personalInfoData', data: { gender: value } }));
              }}
            />
          </Form.Item>

          {/* Education Status */}
          <Form.Item
            name="educationStatus"
            label={<LabelInput title="Education status" description="Choose if the employee is a student or not" />}
            // initialValue={form.getFieldValue('educationStatus') ?? 'notAStudent'}
          >
            <RadioGroup
              form={form}
              name="educationStatus"
              disabled={isSaved}
              onChange={(value) => {
                // form.setFieldValue('educationStatus', value);
                dispatch(updateCurrentEmployee({ target: 'personalInfoData', data: { educationStatus: value } }));
              }}
            >
              <RadioButton value="student">A student</RadioButton>
              <RadioButton value="notAStudent">Not a student</RadioButton>
            </RadioGroup>
          </Form.Item>

          {/* Education */}
          <Form.Item name="education" label={<LabelInput title="Education" description="Enter Education Level " />}>
            <TextArea
              placeholder="Bachelor's degree in Computer Science University of Technology"
              disabled={isSaved}
              className="leading-5 placeholder:leading-5"
              rows={5}
              onChange={(e) => {
                dispatch(updateCurrentEmployee({ target: 'personalInfoData', data: { education: e.target.value } }));
              }}
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default PersonalInfo;
