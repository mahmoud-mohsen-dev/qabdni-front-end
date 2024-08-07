import { Form, InputNumber, Select, Spin } from 'antd';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import useActionBtns from '../../hooks/useActionBtns';
import { IoIosArrowDown } from 'react-icons/io';
import type { FormInstance } from 'antd';
import ActionBtns from '../ActionBtns';
import SubHeading from '../SubHeading';
import { salaryCalculationSystemDataType } from '../../../../types';

interface SalaryCalculationSystemProps {
  form: FormInstance<salaryCalculationSystemDataType>;
  isEditable?: boolean;
}

function SalaryCalculationSystem({ isEditable = false, form }: SalaryCalculationSystemProps) {
  const { isSaved, handleSave, isLoading, handleEdit, handleCancel } = useActionBtns();

  const { Option } = Select;
  const selectBefore = (
    <Form.Item name="currency" className="!mb-0 flex h-[32px] items-center justify-center" initialValue="EGP">
      <Select style={{ width: 80 }} suffixIcon={<IoIosArrowDown size={18} color="rgba(0, 0, 0, 0.20)" />}>
        <Option value="EGP">ج.م</Option>
        <Option value="USD">$</Option>
        <Option value="EUR">€</Option>
        {/* <Option value="GBP">£</Option>
        <Option value="CNY">¥</Option> */}
      </Select>
    </Form.Item>
  );
  const selectAfter = (
    <Form.Item name="period" className="!mb-0 flex h-[32px] items-center justify-center" initialValue={'monthly'}>
      <Select style={{ width: 120 }} suffixIcon={<IoIosArrowDown size={18} color="rgba(0, 0, 0, 0.20)" />}>
        <Option value="hourly">Hourly</Option>
        <Option value="monthly">Monthly</Option>
      </Select>
    </Form.Item>
  );

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
          <SubHeading>Salary Calculation System</SubHeading>
        </ActionBtns>
      ) : (
        <SubHeading>Salary Calculation System</SubHeading>
      )}

      {isLoading ? (
        <div className="m-auto grid place-items-center py-20">
          <Spin tip="Loading" size="large">
            <div style={{ padding: '50px' }} />
          </Spin>
        </div>
      ) : (
        <>
          {/* Salary */}
          <Form.Item
            name="salary"
            label={<LabelInput title="Salary" description="Enter employee's salary" isRequired={true} />}
            rules={[
              { required: true, message: 'Salary is required' },
              {
                validator: (_, value) => {
                  if (typeof value !== 'number' || value <= 0) {
                    return Promise.reject(new Error('Salary must have a value bigger than zero'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
            initialValue={0}
          >
            <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} disabled={isSaved} />
          </Form.Item>

          {/* Insurances */}
          <Form.Item
            name="insurances"
            label={
              <LabelInput
                title="Insurances"
                description="Enter Insurance Amount"
                // tooltip="Example: 100 (employee amount) = 10% (rate) * 1000 (employer amount). The 100 here will be dedcuted from employee's salary"
                tooltip="Example: 100 (employee amount). The 100 here will be dedcuted from employee's salary"
              />
            }
            rules={[
              {
                validator: (_, value) => {
                  if (typeof value !== 'number' || value < 0) {
                    return Promise.reject(new Error('Insurances must have a value equal or bigger than zero'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
            initialValue={0}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Employee Pays Amount" disabled={isSaved} />
          </Form.Item>

          {/* Taxes */}
          <Form.Item
            name="taxes"
            label={<LabelInput title="Taxes" description="Enter Taxes Percentage" />}
            rules={[
              {
                validator: (_, value) => {
                  console.log(value);
                  if (typeof value !== 'number' || value < 0) {
                    return Promise.reject(new Error('Taxes must have a value equal or bigger than zero'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
            initialValue={0}
          >
            <InputNumber
              min={0}
              max={100}
              placeholder={capitalizeName('Enter Taxes Percentage')}
              disabled={isSaved}
              className="w-full"
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default SalaryCalculationSystem;
