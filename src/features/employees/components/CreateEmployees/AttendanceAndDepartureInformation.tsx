import { Form, InputNumber, Spin } from 'antd';
import SubHeading from '../SubHeading';
import LabelInput from '../LabelInput';
import CustomSelect from '../../../../components/CustomSelect';
import PositionsDrawer from '../../../company/components/Drawer/PositionsDrawer';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import useDrawer from '../../../../hooks/useDrawer';
import { ValueItemType } from '../../../../types';
import DepartmentsDrawer from '../../../company/components/Drawer/DepartmentsDrawer';
import useSubHeading from '../../hooks/useSubHeading';
import { useForm } from 'antd/es/form/Form';

function AttendanceAndDepartureInformation() {
  const { positions, departments } = useSelector((state: RootState) => state);
  const { openedDrawer, loading, closeDrawer, showLoading } = useDrawer();
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
        Attendance and departure information
      </SubHeading>

      {isLoading ? (
        <div className="m-auto grid place-items-center py-20">
          <Spin tip="Loading" size="large">
            <div style={{ padding: '50px' }} />
          </Spin>
        </div>
      ) : (
        <>
          {/* Fingerprint Device */}
          <PositionsDrawer isOpened={openedDrawer === 'positions'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="fingerprintDevice"
            label={<LabelInput title="Fingerprint Device" description="Choose Fingerprint Device" isRequired={true} />}
            rules={[{ required: true, message: 'Fingerprint device is is required' }]}
            placeHolder="Choose Fingerprint Device"
            createText="Create new fingerprint device"
            disabled={isSaved}
            options={() => {
              return positions.final.all.map((position: ValueItemType) => ({
                value: position.name,
                label: <span className="capitalize">{position.name}</span>
              }));
            }}
            handleDrawerOpen={() => {
              showLoading('positions');
              form.setFieldValue('department', null);
            }}
          />

          {/* Branch */}
          <DepartmentsDrawer isOpened={openedDrawer === 'departments'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="branch"
            label={<LabelInput title="BRANCh" description="Choose Branch" isRequired={true} />}
            rules={[{ required: true, message: 'Branch is required' }]}
            disabled={isSaved}
            placeHolder="Choose Branch"
            createText="Create new branch"
            options={() => {
              return departments.final.all.map((department: ValueItemType) => ({
                value: department.name,
                label: <span className="capitalize">{department.name}</span>
              }));
            }}
            handleDrawerOpen={() => {
              showLoading('departments');
              form.setFieldValue('department', null);
            }}
          />

          {/* Work Plan */}
          <DepartmentsDrawer isOpened={openedDrawer === 'departments'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="workPlan"
            label={<LabelInput title="Work Plan" description="Select The Employee Work Shift" isRequired={true} />}
            rules={[{ required: true, message: 'Work plan is required' }]}
            disabled={isSaved}
            placeHolder="Select a work plan"
            createText="Create new work plan"
            options={() => {
              return departments.final.all.map((department: ValueItemType) => ({
                value: department.name,
                label: <span className="capitalize">{department.name}</span>
              }));
            }}
            handleDrawerOpen={() => {
              showLoading('departments');
              form.setFieldValue('department', null);
            }}
          />

          {/* Annual Leaves Balance */}
          <Form.Item
            name="annualLeavesBalance"
            label={
              <LabelInput
                title="Annual Leaves Balance"
                description="The total number of leaves allowed to an employee per year"
              />
            }
          >
            <InputNumber min={0} max={365} defaultValue={0} className="w-full" disabled={isSaved} />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default AttendanceAndDepartureInformation;
