import ActionBtns from '../ActionBtns';
import SubHeading from '../SubHeading';
import { Form, InputNumber, Select, Switch } from 'antd';
import type { FormInstance } from 'antd';
import CalculationTable from './CalculationTable';
import LeavesCalculationTable from './LeavesCalculationTable';
import { IoIosArrowDown } from 'react-icons/io';
import useActionBtns from '../../hooks/useActionBtns';
import { useForm } from 'antd/es/form/Form';
import { DataType } from './CalculationSystemTable';
import { LeavesTableData } from '../../../../types';

interface CalculationSystemsProps {
  earlyArrivalDataSource: DataType[];
  setEarlyArrivalDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
  lateArrivalDataSource: DataType[];
  setLateArrivalDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
  earlyDepartureDataSource: DataType[];
  setEarlyDepartureDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
  lateDepartureDataSource: DataType[];
  setLateDepartureDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
  leavesTableDataSource: LeavesTableData[];
  setLeavesTableDataSource: React.Dispatch<React.SetStateAction<LeavesTableData[]>>;
  otherCalculationSystemForm: FormInstance<any>;
}

function CalculationSystemsSection({
  earlyArrivalDataSource,
  setEarlyArrivalDataSource,
  lateArrivalDataSource,
  setLateArrivalDataSource,
  earlyDepartureDataSource,
  setEarlyDepartureDataSource,
  lateDepartureDataSource,
  setLateDepartureDataSource,
  leavesTableDataSource,
  setLeavesTableDataSource,
  otherCalculationSystemForm
}: CalculationSystemsProps) {
  const { isSaved, handleGlobal, handleCancel, handleEdit, appliedGlobalSettings, handleOnlyGlobal } = useActionBtns();

  const [form] = useForm();

  return (
    <>
      <ActionBtns
        onlyGlobal={true}
        form={form}
        isSaved={isSaved}
        handleGlobal={handleGlobal}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        appliedGlobalSettings={appliedGlobalSettings}
        handleOnlyGlobal={handleOnlyGlobal}
      >
        <SubHeading>Calculation Systems</SubHeading>
      </ActionBtns>
      <CalculationTable
        dataSource={earlyArrivalDataSource}
        setDataSource={setEarlyArrivalDataSource}
        heading="Early Arrival calculation system"
        tooltipDurationStart="Applied before the start of the shift"
        tooltipDurationEnd="Applied before the start of the shift"
      />
      <CalculationTable
        dataSource={lateArrivalDataSource}
        setDataSource={setLateArrivalDataSource}
        heading="late Arrival Calculation System"
        tooltipDurationStart="Applied after the start of the shift"
        tooltipDurationEnd="Applied after the start of the shift"
      />
      <CalculationTable
        dataSource={earlyDepartureDataSource}
        setDataSource={setEarlyDepartureDataSource}
        heading="EARLY Departure Calculation system"
        tooltipDurationStart="Applied before the end of the shift"
        tooltipDurationEnd="Applied before the end of the shift"
      />
      <CalculationTable
        dataSource={lateDepartureDataSource}
        setDataSource={setLateDepartureDataSource}
        heading="Late Departure calculation system"
        tooltipDurationStart="Applied after the end of the shift"
        tooltipDurationEnd="Applied after the end of the shift"
      />

      <div>
        <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">Leaves calculation system</h3>
        <LeavesCalculationTable dataSource={leavesTableDataSource} setDataSource={setLeavesTableDataSource} />
      </div>

      <div className="mt-5">
        <h3 className="mb-4 text-[13px] font-medium uppercase leading-4 text-other/black">Other calculation system</h3>
        <Form className="flex flex-col gap-5" form={otherCalculationSystemForm}>
          {/* Missing checkIn or checkOut */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <Form.Item name="missingCheckInOrCheckOut-isEnabled" initialValue={false} className="!mb-0 h-fit">
              <Switch className="custom-switch big" />
            </Form.Item>
            <p>When an employee fails to check in or check out more than</p>
            <Form.Item name="missingCheckInOrCheckOut-occurrences" className="!mb-0 h-fit" initialValue={0}>
              <InputNumber addonAfter="Times" min={0} className="w-32" placeholder="0" />
            </Form.Item>
            <p>, deduct</p>
            <Form.Item name="missingCheckInOrCheckOut-deductValue" className="!mb-0 h-fit" initialValue={0}>
              <InputNumber addonAfter="Day(s)" min={0} className="w-32" placeholder=".5" />
            </Form.Item>
            <p>from their salary.</p>
          </div>

          {/* The break before*/}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <Form.Item name="breakBefore-isEnabled" initialValue={false} className="!mb-0 h-fit">
              <Switch className="custom-switch big" />
            </Form.Item>
            <p>If an employee takes a break before their specified break time more than</p>
            <Form.Item name="breakBefore-occurrences" className="!mb-0 h-fit" initialValue={0}>
              <InputNumber addonAfter="Times" min={0} className="w-32" placeholder="0" />
            </Form.Item>
            <p>, deduct</p>
            <Form.Item name="breakBefore-deductValue" className="!mb-0 h-fit" initialValue={0}>
              <InputNumber
                addonAfter={
                  <Form.Item
                    name="breakBefore-deductValue-multiplierDuration"
                    className="!mb-0 flex h-[32px] items-center justify-center"
                    initialValue={'times'}
                  >
                    <Select
                      defaultValue={'times'}
                      style={{ width: 180 }}
                      suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                      options={[
                        { label: 'Times the duration', value: 'times' },
                        { label: 'Day(s)', value: 'day(s)' }
                      ]}
                    />
                  </Form.Item>
                }
                min={0}
                className="w-[240px]"
                placeholder="0"
              />
            </Form.Item>
            <p>from their salary.</p>
          </div>

          {/* The break after */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <Form.Item name="breakAfter-isEnabled" initialValue={false} className="!mb-0 h-fit">
              <Switch className="custom-switch big" />
            </Form.Item>
            <p className="">If an employee takes a break after their specified break time more than </p>
            <Form.Item name="breakAfter-occurrences" className="!mb-0 h-fit" initialValue={0}>
              <InputNumber addonAfter="Times" min={0} className="w-32" placeholder="0" />
            </Form.Item>
            <p>, deduct</p>
            <Form.Item name="breakAfter-deductValue" className="!mb-0 h-fit" initialValue={0}>
              <InputNumber
                addonAfter={
                  <Form.Item
                    name="breakAfter-deductValue-multiplierDuration"
                    className="!mb-0 flex h-[32px] items-center justify-center"
                    initialValue={'times'}
                  >
                    <Select
                      defaultValue={'times'}
                      style={{ width: 180 }}
                      suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                      options={[
                        { label: 'Times the duration', value: 'times' },
                        { label: 'Day(s)', value: 'day(s)' }
                      ]}
                    />
                  </Form.Item>
                }
                min={0}
                className="w-[240px]"
                placeholder="0"
              />
            </Form.Item>
            <p>from their salary.</p>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CalculationSystemsSection;
