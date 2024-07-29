import { Form, Input } from 'antd';
import SubHeading from './SubHeading';
import LabelInput from './LabelInput';
import CustomSelect from '../../../../components/CustomSelect';
import PositionsDrawer from '../Drawer/PositionsDrawer';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import useDrawer from '../../../../hooks/useDrawer';
import { ValueItemType } from '../../../../types';
import DepartmentsDrawer from '../Drawer/DepartmentsDrawer';

function BasicInformationForm() {
  const { positions, departments } = useSelector((state: RootState) => state);
  const { openedDrawer, loading, closeDrawer, showLoading } = useDrawer();

  return (
    <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} labelAlign="left" colon={false} requiredMark={false}>
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
      <PositionsDrawer isOpened={openedDrawer === 'positions'} loading={loading} closeDrawer={closeDrawer} />
      <Form.Item
        name="Position"
        label={<LabelInput title="Position" description="Choose a role" isRequired={true} />}
        rules={[{ required: true, message: 'Position is required' }]}
      >
        <CustomSelect
          placeHolder="Choose position"
          createText="Create new position"
          options={() => {
            return positions.final.all.map((position: ValueItemType) => ({
              value: position.name,
              label: <span className="capitalize">{position.name}</span>
            }));
          }}
          handleDrawerOpen={() => {
            showLoading('positions');
          }}
        />
      </Form.Item>

      {/* Departments */}
      <DepartmentsDrawer isOpened={openedDrawer === 'departments'} loading={loading} closeDrawer={closeDrawer} />
      <Form.Item
        name="Department"
        label={<LabelInput title="Department" description="Choose department" isRequired={true} />}
        rules={[{ required: true, message: 'Department is required' }]}
      >
        <CustomSelect
          placeHolder="Choose Category"
          createText="Create new department"
          options={() => {
            return departments.final.all.map((department: ValueItemType) => ({
              value: department.name,
              label: <span className="capitalize">{department.name}</span>
            }));
          }}
          handleDrawerOpen={() => {
            showLoading('departments');
          }}
        />
      </Form.Item>
    </Form>
  );
}
export default BasicInformationForm;
