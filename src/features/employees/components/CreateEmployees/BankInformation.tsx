import { Form, Input } from 'antd';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import useActionBtns from '../../hooks/useActionBtns';
import SubHeading from '../SubHeading';
import type { FormInstance } from 'antd';
import ActionBtns from '../ActionBtns';
import { bankInformationDataType } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import SpinnerAnt from '../../../../components/SpinnerAnt';
import { useEffect } from 'react';
import { updateCurrentEmployee } from '../../store/employeesSlice';

interface BankInformationProps {
  form: FormInstance<bankInformationDataType>;
  isEmployeeDetailsPage?: boolean;
}

function BankInformation({ isEmployeeDetailsPage = false, form }: BankInformationProps) {
  const {
    bankInformationData,
    basicInfoData: { id: employeeId }
  } = useSelector((state: RootState) => {
    return state.employees.currentEmployee;
  });
  const { isSaved, handleSave, isLoading, handleEdit, handleCancel } = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: form,
    id: employeeId,
    target: 'bankInformationData'
  });
  const dispatch = useDispatch();

  // Update form fields from the current employee data from redux store
  useEffect(() => {
    form.setFieldsValue({
      ...bankInformationData
    });
  }, [bankInformationData]);

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      form={form}
      initialValues={{ ...bankInformationData }}
    >
      {isEmployeeDetailsPage ? (
        <ActionBtns isSaved={isSaved} handleSave={handleSave} handleEdit={handleEdit} handleCancel={handleCancel}>
          <SubHeading>Bank information</SubHeading>
        </ActionBtns>
      ) : (
        <SubHeading>Bank information</SubHeading>
      )}

      {isLoading ? (
        <SpinnerAnt />
      ) : (
        <>
          {/* Bank account No. */}
          <Form.Item
            name="bankAccountNum"
            label={<LabelInput title="Bank account No." description="Bank account No." />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder={capitalizeName('Enter account number')}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'bankInformationData', data: { bankAccountNum: value } }));
              }}
            />
          </Form.Item>

          {/* Bank Name */}
          <Form.Item
            name="bankName"
            label={<LabelInput title="Bank Name" description="Bank Name" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder={capitalizeName('Enter bank name')}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'bankInformationData', data: { bankName: value } }));
              }}
            />
          </Form.Item>

          {/* PAN No */}
          <Form.Item
            name="panNum"
            label={<LabelInput title="PAN No" description="PAN No" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder={capitalizeName('Enter PAN number')}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'bankInformationData', data: { panNum: value } }));
              }}
            />
          </Form.Item>

          {/* IFSC Code */}
          <Form.Item
            name="ifscCode"
            label={<LabelInput title="IFSC Code" description="IFSC Code" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder={capitalizeName('Enter IFSC Code')}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(updateCurrentEmployee({ target: 'bankInformationData', data: { ifscCode: value } }));
              }}
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default BankInformation;
