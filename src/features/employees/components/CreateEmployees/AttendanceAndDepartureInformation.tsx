import { Form, InputNumber, Spin } from 'antd';
import LabelInput from '../LabelInput';
import CustomSelect from '../../../../components/CustomSelect';
import PositionsDrawer from '../../../company/components/Drawer/PositionsDrawer';
import { RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import useDrawer from '../../../../hooks/useDrawer';
import { attendanceAndDepartureInfoDataType, ValueItemType } from '../../../../types';
import DepartmentsDrawer from '../../../company/components/Drawer/DepartmentsDrawer';
import type { FormInstance } from 'antd';
import ActionBtns from '../ActionBtns';
import SubHeading from '../SubHeading';
import { useEffect } from 'react';
import { updateCurrentEmployee } from '../../store/employeesSlice';
import { UseActionType } from '../../types';

interface AttendanceAndDepartureInformationProps {
  form: FormInstance<attendanceAndDepartureInfoDataType>;
  isEmployeeDetailsPage?: boolean;
  actionBtns?: UseActionType;
}

function AttendanceAndDepartureInformation({
  isEmployeeDetailsPage = false,
  form,
  actionBtns
}: AttendanceAndDepartureInformationProps) {
  const { positions, departments } = useSelector((state: RootState) => state);
  const { openedDrawer, loading, closeDrawer, showLoading } = useDrawer();
  const { attendanceAndDepartureInfoData } = useSelector((state: RootState) => {
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
      ...attendanceAndDepartureInfoData
    });
  }, [attendanceAndDepartureInfoData]);

  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelAlign="left"
      colon={false}
      requiredMark={false}
      form={form}
      initialValues={{ ...attendanceAndDepartureInfoData }}
    >
      {isEmployeeDetailsPage ? (
        <ActionBtns isSaved={isSaved} handleSave={handleSave} handleEdit={handleEdit} handleCancel={handleCancel}>
          <SubHeading>Attendance and departure information</SubHeading>
        </ActionBtns>
      ) : (
        <SubHeading>Attendance and departure information</SubHeading>
      )}

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
            // form={form}
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
            onChange={(value) => {
              dispatch(
                updateCurrentEmployee({
                  target: 'attendanceAndDepartureInfoData',
                  data: { fingerprintDevice: value }
                })
              );
            }}
          />

          {/* Branch */}
          <DepartmentsDrawer isOpened={openedDrawer === 'departments'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="branch"
            // form={form}
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
            onChange={(value) => {
              dispatch(
                updateCurrentEmployee({
                  target: 'attendanceAndDepartureInfoData',
                  data: { branch: value }
                })
              );
            }}
          />

          {/* Work Plan */}
          <DepartmentsDrawer isOpened={openedDrawer === 'departments'} loading={loading} closeDrawer={closeDrawer} />
          <CustomSelect
            name="workPlan"
            // form={form}
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
            onChange={(value) => {
              dispatch(
                updateCurrentEmployee({
                  target: 'attendanceAndDepartureInfoData',
                  data: { workPlan: value }
                })
              );
            }}
          />

          {/* annualLeavesBalance */}
          <Form.Item
            name="annualLeavesBalance"
            label={
              <LabelInput
                title="Annual Leaves Balance"
                description="The total number of leaves allowed to an employee per year"
              />
            }
            rules={[
              {
                validator: (_, value) => {
                  if (typeof value !== 'number' || value < 0) {
                    return Promise.reject(
                      new Error('Annual leaves balance must have a value equal or bigger than zero')
                    );
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <InputNumber
              min={0}
              max={365}
              className="w-full"
              disabled={isSaved}
              onChange={(value) => {
                dispatch(
                  updateCurrentEmployee({
                    target: 'attendanceAndDepartureInfoData',
                    data: { annualLeavesBalance: value }
                  })
                );
              }}
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
}
export default AttendanceAndDepartureInformation;
