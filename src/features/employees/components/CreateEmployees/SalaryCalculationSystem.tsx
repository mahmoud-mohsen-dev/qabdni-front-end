import { Form, InputNumber, Select, Space, Spin, Tooltip } from 'antd';
import SubHeading from '../SubHeading';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import useSubHeading from '../../hooks/useSubHeading';
import { useForm } from 'antd/es/form/Form';
import { IoIosArrowDown } from 'react-icons/io';

function SalaryCalculationSystem() {
  const { isSaved, handleSave, handleCancel, handleEdit, isLoading } = useSubHeading();
  const [form] = useForm();

  const { Option } = Select;
  const selectBefore = (
    <Select
      defaultValue="USD"
      style={{ width: 70 }}
      suffixIcon={<IoIosArrowDown size={18} color="rgba(0, 0, 0, 0.20)" />}
    >
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );
  const selectAfter = (
    <Select
      defaultValue="monthly"
      style={{ width: 120 }}
      suffixIcon={<IoIosArrowDown size={18} color="rgba(0, 0, 0, 0.20)" />}
    >
      <Option value="hourly">Hourly</Option>
      <Option value="monthly">Monthly</Option>
    </Select>
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
        handleSave();
      }}
      form={form}
    >
      <SubHeading form={form} isSaved={isSaved} handleCancel={handleCancel} handleEdit={handleEdit}>
        Salary Calculation System
      </SubHeading>

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
              { whitespace: true },
              {
                validator: (_, value) => {
                  if (typeof value !== 'number' && value <= 0) {
                    return Promise.reject(new Error('Salary must have a value bigger than zero'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <InputNumber addonBefore={selectBefore} addonAfter={selectAfter} defaultValue={0} disabled={isSaved} />
          </Form.Item>

          {/* Insurances */}
          <Form.Item
            name="insurances"
            label={
              <LabelInput
                title="Insurances"
                description="Enter Insurance Amount"
                tooltip="Example: 100 (employee amount) = 10% (rate) * 1000 (employer amount). The 100 here will be dedcuted from employee's salary"
              />
            }
          >
            <Space direction="vertical" size="middle">
              <Space.Compact>
                <Tooltip title="Employee Pays Amount">
                  <InputNumber
                    min={0}
                    max={10}
                    style={{ width: '40%' }}
                    placeholder="Employee Pays Amount"
                    disabled={isSaved}
                  />
                </Tooltip>
                <Tooltip title="Rate">
                  <InputNumber min={0} max={10} style={{ width: '20%' }} placeholder="Rate" disabled={isSaved} />
                </Tooltip>
                <Tooltip title="Employer Pays Amount">
                  <InputNumber
                    min={0}
                    max={10}
                    style={{ width: '40%' }}
                    placeholder="Employer Pays Amount"
                    disabled={isSaved}
                  />
                </Tooltip>
              </Space.Compact>
            </Space>
          </Form.Item>

          {/* Taxes */}
          <Form.Item
            name="taxes"
            label={<LabelInput title="Taxes" description="Enter Taxes Percentage" />}
            rules={[{ whitespace: true }, { max: 35 }]}
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
