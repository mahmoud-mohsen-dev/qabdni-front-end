import { DatePicker, Form, Input, Select, Spin } from 'antd';
import LabelInput from '../LabelInput';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeName } from '../../../../utils/user';
import { RadioButton, RadioGroup } from '../../../../components/RadioGroup';
import useActionBtns from '../../hooks/useActionBtns';
import TextArea from 'antd/es/input/TextArea';
import SubHeading from '../SubHeading';
import ActionBtns from '../ActionBtns';
import type { FormInstance } from 'antd';
import { personalInfoDataType } from '../../../../types';

interface PersonalInfoProps {
  form: FormInstance<personalInfoDataType>;
  isEditable?: boolean;
}

function PersonalInfo({ isEditable = false, form }: PersonalInfoProps) {
  const { isSaved, handleSave, isLoading, handleEdit, handleCancel } = useActionBtns();
  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      onFinish={(values) => {
        console.log(values);
        if (isEditable) {
          handleSave();
        }
      }}
      form={form}
    >
      {isEditable ? (
        <ActionBtns form={form} isSaved={isSaved} handleEdit={handleEdit} handleCancel={handleCancel}>
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
            <Input placeholder="National ID No." disabled={isSaved} />
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
            />
          </Form.Item>

          {/* Marital Status */}
          <Form.Item
            name="maritalStatus"
            label={<LabelInput title="Marital status" description="Choose option if available" />}
            initialValue={form.getFieldValue('maritalStatus') ?? 'single'}
          >
            <RadioGroup
              disabled={isSaved}
              defaultValue={form.getFieldValue('maritalStatus') ?? 'single'}
              className="self-center"
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
                { label: 'male', value: 'Male' },
                { label: 'female', value: 'Female' }
              ]}
            />
          </Form.Item>

          {/* Education Status */}
          <Form.Item
            name="educationStatus"
            label={<LabelInput title="Education status" description="Choose if the employee is a student or not" />}
            initialValue={form.getFieldValue('educationStatus') ?? 'notAStudent'}
          >
            <RadioGroup disabled={isSaved} defaultValue={form.getFieldValue('educationStatus') ?? 'notAStudent'}>
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
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default PersonalInfo;
