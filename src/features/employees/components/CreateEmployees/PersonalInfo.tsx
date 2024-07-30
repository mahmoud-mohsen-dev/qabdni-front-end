import { DatePicker, Form, Input, Select, Spin } from 'antd';
import SubHeading from '../SubHeading';
import LabelInput from '../LabelInput';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeName } from '../../../../utils/user';
import { RadioButton, RadioGroup } from '../../../../components/RadioGroup';
import useSubHeading from '../../hooks/useSubHeading';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

function PersonalInfo() {
  const { isSaved, handleSave, handleCancel, handleEdit, isLoading } = useSubHeading();
  const [form] = useForm();
  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      onFinish={(values) => {
        console.log(values);
        handleSave();
      }}
      form={form}
    >
      <SubHeading form={form} isSaved={isSaved} handleCancel={handleCancel} handleEdit={handleEdit}>
        Personal Info
      </SubHeading>

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
            <Input placeholder="Employee Name" disabled={isSaved} />
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
          <Form.Item name="dateOfBirth" label={<LabelInput title="Date of Birthday" description="YYYY-MM-DD" />}>
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
          >
            <RadioGroup disabled={isSaved} defaultValue="single" className="self-center">
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
          >
            <RadioGroup disabled={isSaved} defaultValue="notStudent">
              <RadioButton value="student">A student</RadioButton>
              <RadioButton value="notStudent">Not a student</RadioButton>
            </RadioGroup>
          </Form.Item>

          {/* Education */}
          <Form.Item
            name="educationStatus"
            label={<LabelInput title="Education" description="Enter Education Level " />}
          >
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
