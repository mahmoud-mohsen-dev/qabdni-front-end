import ActionBtns from '../ActionBtns';
import SubHeading from '../SubHeading';
import { Form, InputNumber, Select, Switch } from 'antd';
import type { FormInstance } from 'antd';
import CalculationTable from './CalculationTable';
import LeavesCalculationTable from './LeavesCalculationTable';
import { IoIosArrowDown } from 'react-icons/io';
import { OtherCalculationSystemDataType } from '../../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import SpinnerAnt from '../../../../components/SpinnerAnt';
import { useEffect } from 'react';
import { onCancelEmployeeSection, updateCurrentEmployee } from '../../store/employeesSlice';
import { UseActionType } from '../../types';

interface CalculationSystemsProps {
  otherCalculationSystemForm: FormInstance<OtherCalculationSystemDataType>;
  isEmployeeDetailsPage?: boolean;
  actionBtns?: UseActionType;
}

function CalculationSystemsSection({
  otherCalculationSystemForm,
  isEmployeeDetailsPage = false,
  actionBtns
}: CalculationSystemsProps) {
  const {
    otherCalculationSystemData,
    basicInfoData: { id: employeeId }
  } = useSelector((state: RootState) => {
    return state.employees.currentEmployee;
  });

  let isSaved, handleSave, isLoading, handleEdit, handleCancel, handleGlobal, appliedGlobalSettings, handleOnlyGlobal;
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
    handleGlobal =
      actionBtns.handleCancel ??
      (() => {
        console.error('error at handleCancel');
      });
    appliedGlobalSettings =
      actionBtns.handleCancel ??
      (() => {
        console.error('error at handleCancel');
      });
    handleOnlyGlobal =
      actionBtns.handleCancel ??
      (() => {
        console.error('error at handleCancel');
      });
  }

  const dispatch = useDispatch();

  // Update otherCalculationSystemForm fields from the current employee data from redux store
  useEffect(() => {
    otherCalculationSystemForm.setFieldsValue({
      ...otherCalculationSystemData,
      'missingCheckInOrCheckOut-occurrences': otherCalculationSystemData['missingCheckInOrCheckOut-occurrences'] ?? 0,
      'missingCheckInOrCheckOut-deductValue': otherCalculationSystemData['missingCheckInOrCheckOut-deductValue'] ?? 0,
      'breakBefore-occurrences': otherCalculationSystemData['breakBefore-occurrences'] ?? 0,
      'breakBefore-deductValue': otherCalculationSystemData['breakBefore-deductValue'] ?? 0,
      'breakAfter-occurrences': otherCalculationSystemData['breakAfter-occurrences'] ?? 0,
      'breakAfter-deductValue': otherCalculationSystemData['breakAfter-deductValue'] ?? 0
    });
  }, [otherCalculationSystemData]);

  const onCancel = () => {
    dispatch(onCancelEmployeeSection({ id: employeeId, sectionName: 'earlyArrivalData' }));
    dispatch(onCancelEmployeeSection({ id: employeeId, sectionName: 'lateArrivalData' }));
    dispatch(onCancelEmployeeSection({ id: employeeId, sectionName: 'earlyDepartureData' }));
    dispatch(onCancelEmployeeSection({ id: employeeId, sectionName: 'lateDepartureData' }));
    dispatch(onCancelEmployeeSection({ id: employeeId, sectionName: 'leavesTableData' }));
    handleCancel();
  };

  return (
    <>
      {isEmployeeDetailsPage ? (
        <ActionBtns
          isSaved={isSaved}
          handleSave={handleSave}
          handleGlobal={handleGlobal}
          handleEdit={handleEdit}
          handleCancel={onCancel}
          appliedGlobalSettings={appliedGlobalSettings}
          global={true}
        >
          <SubHeading>Calculation Systems</SubHeading>
        </ActionBtns>
      ) : (
        <ActionBtns
          onlyGlobal={true}
          handleSave={handleSave}
          isSaved={isSaved}
          handleGlobal={handleGlobal}
          handleEdit={handleEdit}
          handleCancel={onCancel}
          appliedGlobalSettings={appliedGlobalSettings}
          handleOnlyGlobal={handleOnlyGlobal}
        >
          <SubHeading>Calculation Systems</SubHeading>
        </ActionBtns>
      )}
      {isLoading ? (
        <div className="mt-20">
          <SpinnerAnt />
        </div>
      ) : (
        <>
          <CalculationTable
            tableName="earlyArrivalData"
            heading="Early Arrival calculation system"
            tooltipDurationStart="Applied before the start of the shift"
            tooltipDurationEnd="Applied before the start of the shift"
            isEmployeeDetailsPage={isEmployeeDetailsPage}
            isSaved={isSaved}
          />
          <CalculationTable
            tableName="lateArrivalData"
            heading="late Arrival Calculation System"
            tooltipDurationStart="Applied after the start of the shift"
            tooltipDurationEnd="Applied after the start of the shift"
            isEmployeeDetailsPage={isEmployeeDetailsPage}
            isSaved={isSaved}
          />
          <CalculationTable
            tableName="earlyDepartureData"
            heading="EARLY Departure Calculation system"
            tooltipDurationStart="Applied before the end of the shift"
            tooltipDurationEnd="Applied before the end of the shift"
            isEmployeeDetailsPage={isEmployeeDetailsPage}
            isSaved={isSaved}
          />
          <CalculationTable
            tableName="lateDepartureData"
            heading="Late Departure calculation system"
            tooltipDurationStart="Applied after the end of the shift"
            tooltipDurationEnd="Applied after the end of the shift"
            isEmployeeDetailsPage={isEmployeeDetailsPage}
            isSaved={isSaved}
          />

          <div>
            <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">
              Leaves calculation system
            </h3>
            <LeavesCalculationTable isEmployeeDetailsPage={isEmployeeDetailsPage} isSaved={isSaved} />
          </div>

          <div className="mt-5">
            <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">
              Other calculation system
            </h3>
            <Form
              className="flex flex-col gap-5"
              form={otherCalculationSystemForm}
              initialValues={{
                ...otherCalculationSystemData,
                'missingCheckInOrCheckOut-occurrences':
                  otherCalculationSystemData['missingCheckInOrCheckOut-occurrences'] ?? 0,
                'missingCheckInOrCheckOut-deductValue':
                  otherCalculationSystemData['missingCheckInOrCheckOut-deductValue'] ?? 0,
                'breakBefore-occurrences': otherCalculationSystemData['breakBefore-occurrences'] ?? 0,
                'breakBefore-deductValue': otherCalculationSystemData['breakBefore-deductValue'] ?? 0,
                'breakAfter-occurrences': otherCalculationSystemData['breakAfter-occurrences'] ?? 0,
                'breakAfter-deductValue': otherCalculationSystemData['breakAfter-deductValue'] ?? 0
              }}
              disabled={isEmployeeDetailsPage ? isSaved : false}
            >
              {/* Missing checkIn or checkOut */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <Form.Item name="missingCheckInOrCheckOut-isEnabled" className="!mb-0 h-fit">
                  <Switch
                    className="custom-switch big"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'missingCheckInOrCheckOut-isEnabled': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>When an employee fails to check in or check out more than</p>
                <Form.Item name="missingCheckInOrCheckOut-occurrences" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter="Times"
                    min={0}
                    className="w-32"
                    placeholder="0"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'missingCheckInOrCheckOut-occurrences': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>, deduct</p>
                <Form.Item name="missingCheckInOrCheckOut-deductValue" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter="Day(s)"
                    min={0}
                    className="w-32"
                    placeholder=".5"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'missingCheckInOrCheckOut-deductValue': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>from their salary.</p>
              </div>

              {/* The break before*/}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <Form.Item name="breakBefore-isEnabled" className="!mb-0 h-fit">
                  <Switch
                    className="custom-switch big"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'breakBefore-isEnabled': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>If an employee takes a break before their specified break time more than</p>
                <Form.Item name="breakBefore-occurrences" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter="Times"
                    min={0}
                    className="w-32"
                    placeholder="0"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'breakBefore-occurrences': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>, deduct</p>
                <Form.Item name="breakBefore-deductValue" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter={
                      <Form.Item
                        name="breakBefore-deductValue-multiplierDuration"
                        className="!mb-0 flex h-[32px] items-center justify-center"
                        // initialValue={'times'}
                      >
                        <Select
                          style={{ width: 180 }}
                          suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                          options={[
                            { label: 'Times the duration', value: 'times' },
                            { label: 'Day(s)', value: 'day(s)' }
                          ]}
                          onChange={(value) => {
                            dispatch(
                              updateCurrentEmployee({
                                target: 'otherCalculationSystemData',
                                data: { 'breakBefore-deductValue-multiplierDuration': value }
                              })
                            );
                          }}
                        />
                      </Form.Item>
                    }
                    min={0}
                    className="w-[240px]"
                    placeholder="0"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'breakBefore-deductValue': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>from their salary.</p>
              </div>

              {/* The break after */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <Form.Item name="breakAfter-isEnabled" className="!mb-0 h-fit">
                  <Switch
                    className="custom-switch big"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'breakAfter-isEnabled': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>If an employee takes a break after their specified break time more than </p>
                <Form.Item name="breakAfter-occurrences" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter="Times"
                    min={0}
                    className="w-32"
                    placeholder="0"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'breakAfter-occurrences': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>, deduct</p>
                <Form.Item name="breakAfter-deductValue" className="!mb-0 h-fit">
                  <InputNumber
                    addonAfter={
                      <Form.Item
                        name="breakAfter-deductValue-multiplierDuration"
                        className="!mb-0 flex h-[32px] items-center justify-center"
                        // initialValue={'times'}
                      >
                        <Select
                          style={{ width: 180 }}
                          suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                          options={[
                            { label: 'Times the duration', value: 'times' },
                            { label: 'Day(s)', value: 'day(s)' }
                          ]}
                          onChange={(value) => {
                            dispatch(
                              updateCurrentEmployee({
                                target: 'otherCalculationSystemData',
                                data: { 'breakAfter-deductValue-multiplierDuration': value }
                              })
                            );
                          }}
                        />
                      </Form.Item>
                    }
                    min={0}
                    className="w-[240px]"
                    placeholder="0"
                    onChange={(value) => {
                      dispatch(
                        updateCurrentEmployee({
                          target: 'otherCalculationSystemData',
                          data: { 'breakAfter-deductValue': value }
                        })
                      );
                    }}
                  />
                </Form.Item>
                <p>from their salary.</p>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
  );
}

export default CalculationSystemsSection;
