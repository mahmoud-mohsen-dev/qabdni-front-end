import { Form, Input, Spin } from 'antd';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import useActionBtns from '../../hooks/useActionBtns';
import SubHeading from '../SubHeading';
import type { FormInstance } from 'antd';
import ActionBtns from '../ActionBtns';
import { emergencyContactDataType } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useEffect } from 'react';
import { updateCurrentEmployee } from '../../store/employeesSlice';

interface EmergencyContactProps {
  form: FormInstance<emergencyContactDataType>;
  isEmployeeDetailsPage?: boolean;
}

function EmergencyContact({ isEmployeeDetailsPage = false, form }: EmergencyContactProps) {
  const {
    emergencyContactData,
    basicInfoData: { id: employeeId }
  } = useSelector((state: RootState) => {
    return state.employees.currentEmployee;
  });
  const { isSaved, handleSave, isLoading, handleEdit, handleCancel } = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: form,
    id: employeeId,
    target: 'emergencyContactData'
  });
  const dispatch = useDispatch();

  // Update form fields from the current employee data from redux store
  useEffect(() => {
    form.setFieldsValue({
      ...emergencyContactData
    });
  }, [emergencyContactData]);

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      form={form}
      initialValues={{ ...emergencyContactData }}
    >
      {isEmployeeDetailsPage ? (
        <ActionBtns isSaved={isSaved} handleSave={handleSave} handleEdit={handleEdit} handleCancel={handleCancel}>
          <SubHeading>Bank information</SubHeading>
        </ActionBtns>
      ) : (
        <SubHeading>Emergency Contact</SubHeading>
      )}

      {isLoading ? (
        <div className="m-auto grid place-items-center py-20">
          <Spin tip="Loading" size="large">
            <div style={{ padding: '50px' }} />
          </Spin>
        </div>
      ) : (
        <>
          {/* Emergency Contact Name */}
          <Form.Item
            name="emergencyContactName"
            label={<LabelInput title="Emergency Contact Name" description="Add emergency contact full name " />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder={capitalizeName('Contact Name')}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(
                  updateCurrentEmployee({ target: 'emergencyContactData', data: { emergencyContactName: value } })
                );
              }}
            />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            name="emergencyContactPhone"
            label={<LabelInput title="Phone Number" description="Only numbers" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input
              placeholder={capitalizeName('Enter Emergency Contact Number')}
              disabled={isSaved}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(
                  updateCurrentEmployee({ target: 'emergencyContactData', data: { emergencyContactPhone: value } })
                );
              }}
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default EmergencyContact;
