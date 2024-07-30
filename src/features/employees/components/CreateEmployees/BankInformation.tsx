import { Form, Input, Spin } from 'antd';
import SubHeading from '../SubHeading';
import LabelInput from '../LabelInput';
import { capitalizeName } from '../../../../utils/user';
import useSubHeading from '../../hooks/useSubHeading';
import { useForm } from 'antd/es/form/Form';

function BankInformation() {
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
        Bank information
      </SubHeading>

      {isLoading ? (
        <div className="m-auto grid place-items-center py-20">
          <Spin tip="Loading" size="large">
            <div style={{ padding: '50px' }} />
          </Spin>
        </div>
      ) : (
        <>
          {/* Bank account No. */}
          <Form.Item
            name="bankAccountNum"
            label={<LabelInput title="Bank account No." description="Bank account No." />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input placeholder={capitalizeName('Enter account number')} disabled={isSaved} />
          </Form.Item>

          {/* Bank Name */}
          <Form.Item
            name="bankName"
            label={<LabelInput title="Bank Name" description="Bank Name" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input placeholder={capitalizeName('Enter bank name')} disabled={isSaved} />
          </Form.Item>

          {/* PAN No */}
          <Form.Item
            name="panNum"
            label={<LabelInput title="PAN No" description="PAN No" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input placeholder={capitalizeName('Enter PAN number')} disabled={isSaved} />
          </Form.Item>

          {/* IFSC Code */}
          <Form.Item
            name="panNum"
            label={<LabelInput title="IFSC Code" description="IFSC Code" />}
            rules={[{ whitespace: true }, { max: 35 }]}
          >
            <Input placeholder={capitalizeName('Enter IFSC Code')} disabled={isSaved} />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default BankInformation;
