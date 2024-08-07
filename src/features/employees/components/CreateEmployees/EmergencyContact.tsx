import { Form, Input, Spin } from 'antd';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import useActionBtns from '../../hooks/useActionBtns';
import SubHeading from '../SubHeading';
import type { FormInstance } from 'antd';
import ActionBtns from '../ActionBtns';
import { emergencyContactDataType } from '../../../../types';

interface EmergencyContactProps {
  form: FormInstance<emergencyContactDataType>;
  isEditable?: boolean;
}

function EmergencyContact({ isEditable = false, form }: EmergencyContactProps) {
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
            <Input placeholder={capitalizeName('Contact Name')} disabled={isSaved} />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            name="emergencyContactPhone"
            label={<LabelInput title="Phone Number" description="Only numbers" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input placeholder={capitalizeName('Enter Emergency Contact Number')} disabled={isSaved} />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default EmergencyContact;
