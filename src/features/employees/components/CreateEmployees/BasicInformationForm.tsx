import { Form, Input } from 'antd';
import SubHeading from './SubHeading';
import LabelInput from './LabelInput';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import CustomDrawer from '../../../../components/CustomDrawer';
import useDrawer from '../../../../hooks/useDrawer';
import CustomSelect from '../../../../components/CustomSelect';

function BasicInformationForm() {
  // const inputRef = useRef<InputRef>(null);
  const {
    final: { all }
  } = useSelector((state: RootState) => state.positions);
  const { openDrawer, loading, closeDrawer, showLoading } = useDrawer();

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      // className="flex flex-col gap-[18px]"
      colon={false}
      requiredMark={false}
    >
      <CustomDrawer openDrawer={openDrawer} loading={loading} closeDrawer={closeDrawer} />
      <SubHeading>Basic Information</SubHeading>
      <div className="my-4 flex items-center gap-4">
        <h4 className="min-w-[200px] text-[13px] font-medium uppercase leading-4">ID NO.</h4>
        <p className="text-[13px] font-medium uppercase leading-4 text-gray/dark">01</p>
      </div>

      {/* Full Name */}
      <Form.Item
        name="Full name"
        label={<LabelInput title="full name" description="add employee name" isRequired={true} />}
        rules={[{ required: true, message: 'Full name is required' }, { whitespace: true }, { min: 3 }, { max: 35 }]}
      >
        <Input placeholder="Employee Name" />
      </Form.Item>

      {/* Positions */}
      <Form.Item
        name="Position"
        label={<LabelInput title="Position" description="Choose a role" isRequired={true} />}
        rules={[{ required: true, message: 'Position is required' }]}
      >
        <CustomSelect all={all} showLoading={showLoading} />
      </Form.Item>
    </Form>
  );
}
export default BasicInformationForm;
