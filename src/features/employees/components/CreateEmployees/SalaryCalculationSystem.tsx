import { Form, InputNumber, Select, Spin } from 'antd';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import { IoIosArrowDown } from 'react-icons/io';
import type { FormInstance } from 'antd';
import ActionBtns from '../ActionBtns';
import SubHeading from '../SubHeading';
import { salaryCalculationSystemDataType } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useEffect } from 'react';
import { updateCurrentEmployee } from '../../store/employeesSlice';
import { valueInArray } from '../../../../utils/helpers';
import { UseActionType } from '../../types';

interface SalaryCalculationSystemProps {
  form: FormInstance<salaryCalculationSystemDataType>;
  isEmployeeDetailsPage?: boolean;
  actionBtns?: UseActionType;
}

function SalaryCalculationSystem({ isEmployeeDetailsPage = false, form, actionBtns }: SalaryCalculationSystemProps) {
  const { salaryCalculationSystemData } = useSelector((state: RootState) => {
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
      ...salaryCalculationSystemData,
      // currency: valueInArray(salaryCalculationSystemData.currency, ['EGP', 'USD', 'EUR', 'GBP', 'CNY'], 'EGP'),
      currency: valueInArray(salaryCalculationSystemData.currency, ['EGP', 'USD', 'EUR'], 'EGP'),
      period: valueInArray(salaryCalculationSystemData.period, ['hourly', 'monthly'], 'monthly')
    });
  }, [salaryCalculationSystemData]);

  const { Option } = Select;
  const selectBefore = (
    <Form.Item name="currency" className="!mb-0 flex h-[32px] items-center justify-center">
      <Select
        style={{ width: 80 }}
        suffixIcon={<IoIosArrowDown size={18} color="rgba(0, 0, 0, 0.20)" />}
        disabled={isSaved}
        onChange={(value) => {
          dispatch(updateCurrentEmployee({ target: 'salaryCalculationSystemData', data: { currency: value } }));
        }}
      >
        <Option value="EGP">ج.م</Option>
        <Option value="USD">$</Option>
        <Option value="EUR">€</Option>
        {/* <Option value="GBP">£</Option>
        <Option value="CNY">¥</Option> */}
      </Select>
    </Form.Item>
  );
  const selectAfter = (
    <Form.Item name="period" className="!mb-0 flex h-[32px] items-center justify-center">
      <Select
        style={{ width: 120 }}
        suffixIcon={<IoIosArrowDown size={18} color="rgba(0, 0, 0, 0.20)" />}
        disabled={isSaved}
        onChange={(value) => {
          dispatch(updateCurrentEmployee({ target: 'salaryCalculationSystemData', data: { period: value } }));
        }}
      >
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
      form={form}
      initialValues={{
        ...salaryCalculationSystemData,
        currency: valueInArray(salaryCalculationSystemData.currency, ['EGP', 'USD', 'EUR'], 'EGP'),
        period: valueInArray(salaryCalculationSystemData.period, ['hourly', 'monthly'], 'monthly')
      }}
    >
      {isEmployeeDetailsPage ? (
        <ActionBtns isSaved={isSaved} handleSave={handleSave} handleEdit={handleEdit} handleCancel={handleCancel}>
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

            // initialValue={0}
          >
            <InputNumber
              min={0}
              addonBefore={selectBefore}
              addonAfter={selectAfter}
              disabled={isSaved}
              onChange={(value) => {
                dispatch(updateCurrentEmployee({ target: 'salaryCalculationSystemData', data: { salary: value } }));
              }}
            />
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
            // initialValue={0}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="Employee Pays Amount"
              disabled={isSaved}
              onChange={(value) => {
                dispatch(updateCurrentEmployee({ target: 'salaryCalculationSystemData', data: { insurances: value } }));
              }}
            />
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
                    return Promise.reject(new Error('Taxes must have a value equal or bigger than 0%'));
                  }
                  if (typeof value == 'number' && value > 100) {
                    return Promise.reject(new Error('Taxes must have a value equal or less than 100%'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
            // initialValue={0}
          >
            <InputNumber
              min={0}
              // max={100}
              placeholder={capitalizeName('Enter Taxes Percentage')}
              disabled={isSaved}
              className="w-full"
              onChange={(value) => {
                dispatch(updateCurrentEmployee({ target: 'salaryCalculationSystemData', data: { taxes: value } }));
              }}
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default SalaryCalculationSystem;
