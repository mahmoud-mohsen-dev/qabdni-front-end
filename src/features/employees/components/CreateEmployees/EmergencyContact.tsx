import { Form, Input, Spin } from 'antd';
import SubHeading from '../SubHeading';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import useSubHeading from '../../hooks/useSubHeading';
import { useForm } from 'antd/es/form/Form';

function EmergencyContact() {
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
        Emergency Contact
      </SubHeading>

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
