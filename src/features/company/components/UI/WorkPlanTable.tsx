import React, { useContext, useEffect, useState } from 'react';
import type { GetRef } from 'antd';
import { Form, Input, Table, TimePicker } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { TableRowType } from '../../../../types';
import { formatDayjsToStrHoursAndMinutes, parseDayjsToIsoString, parseIsoStringToDayjs } from '../../../../utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  clearTempWorkPlanDayObj,
  DaysType,
  TimePickerValueType,
  toggleTempIsDayOff,
  updateTempWorkPlan
} from '../../../../store/workPlansSlice';
import { capitalizeName } from '../../../../utils/user';
import dayjs from 'dayjs';
import DotsMenu from '../../../../components/DotsMenu';
import { valueInArray } from '../../../../utils/helpers';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<unknown> | null>(null);

const EditableRow: React.FC = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const { workTime } = record ?? 0;
  const wrokPlanId = true;

  const [editing, setEditing] = useState(() => (wrokPlanId ? true : false));
  const [openMenu, setOpenMenu] = useState(false);

  const form = useContext(EditableContext)!;

  useEffect(() => {
    const handleWorkTime = async () => {
      try {
        if (dataIndex === 'workTime') {
          form.setFieldValue('workTime', workTime ?? 0);
          await form.getFieldValue(dataIndex);
          const values = (await form.getFieldsValue()) as TableRowType;
          handleSave({ ...record, ...values });
        }
      } catch (errInfo) {
        console.log(title);
        console.log('Save failed:', errInfo);
      }
    };
    handleWorkTime();
  }, [workTime]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      await form.getFieldValue(dataIndex);
      const values = (await form.getFieldsValue()) as TableRowType;
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log(title);
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (record && record.isDayOff) {
    if (dataIndex === 'shiftStart') {
      return (
        <td {...restProps} align="center">
          <p className="is-day-off">Day Off</p>
        </td>
      );
    }
  }

  if (editable) {
    if (dataIndex === 'workTime') {
      return (
        <td {...restProps} align="center">
          {childNode}
          <Form.Item style={{ margin: 0 }} name="workTime" initialValue={record['workTime']}>
            <Input hidden={true} />
          </Form.Item>
        </td>
      );
    }

    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        initialValue={record[dataIndex]}
        rules={[
          {
            required: dataIndex === 'shiftStart' || dataIndex === 'shiftEnd' ? true : false,
            message:
              dataIndex === 'shiftStart'
                ? 'Shift start is required'
                : dataIndex === 'shiftEnd'
                  ? 'Shift end is required'
                  : ''
          }
        ]}
      >
        {(dataIndex === 'shiftStart' ||
          dataIndex === 'shiftEnd' ||
          dataIndex === 'breakStart' ||
          dataIndex === 'breakEnd') && (
          <TimePicker
            // ref={inputRef}
            onOk={save}
            defaultOpen={openMenu}
            format="HH:mm"
            showNow={false}
            onFocus={() => {
              setOpenMenu(true);
            }}
            onBlur={() => {
              setOpenMenu(false);
            }}
            className="min-h-[32px] w-[140px]"
          />
        )}
      </Form.Item>
    ) : (
      <button
        className="editable-cell-value-wrap min-h-[30px] min-w-[100px] rounded-lg border-2 border-solid border-transparent px-[11px] py-2 hover:border-gray/lighter focus:outline-none"
        onClick={toggleEdit}
      >
        {children}
      </button>
    );
  }

  return (
    <td {...restProps} align="center">
      {childNode}
    </td>
  );
};

type EditableTableProps = Parameters<typeof Table>[0];

export interface DataType {
  key: string | number;
  day: DaysType;
  shiftStart: TimePickerValueType;
  shiftEnd: TimePickerValueType;
  breakStart: TimePickerValueType;
  breakEnd: TimePickerValueType;
  isDayOff: boolean;
  workTime: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const WorkPlanTable = ({
  isSaved = false,
  isInViewDetails = false
}: {
  isSaved?: boolean;
  isInViewDetails?: boolean;
}) => {
  const dispatch = useDispatch();
  const targetTableDataSource = useSelector((state: RootState) => state.workPlans.temp.week);
  const dataSource = targetTableDataSource.map((item) => ({
    ...item,
    shiftStart: parseIsoStringToDayjs(item.shiftStart),
    shiftEnd: parseIsoStringToDayjs(item.shiftEnd),
    breakStart: parseIsoStringToDayjs(item.breakStart),
    breakEnd: parseIsoStringToDayjs(item.breakEnd)
  }));

  type DefaultColumnsType = (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  const handleClearDayValues = (day: DaysType) => {
    if (valueInArray(day, ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']))
      dispatch(clearTempWorkPlanDayObj({ dayName: day }));
  };

  const defaultColumns: DefaultColumnsType = [
    {
      title: <p className="cursor-default">Day</p>,
      dataIndex: 'day',
      align: 'center',
      render: (day) => <p>{capitalizeName(day)}</p>
    },
    {
      title: <p className={`cursor-default`}>Shift Start</p>,
      dataIndex: 'shiftStart',
      align: 'center',
      editable: isInViewDetails ? !isSaved : true,
      render: (shiftStart) => {
        return (
          <div className="flex min-h-[11px] w-[111.5px] items-center justify-between gap-5">
            {shiftStart && (
              <>
                <p>{formatDayjsToStrHoursAndMinutes(shiftStart)}</p>
                <span>
                  <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                </span>
              </>
            )}
          </div>
        );
      }
    },
    {
      title: <p className="cursor-default">Shift End</p>,
      dataIndex: 'shiftEnd',
      editable: isInViewDetails ? !isSaved : true,
      align: 'center',
      render: (shiftEnd) => {
        return (
          <div className="flex min-h-[11px] w-[111.5px] items-center justify-between gap-5">
            {shiftEnd && (
              <>
                <p>{formatDayjsToStrHoursAndMinutes(shiftEnd)}</p>
                <span>
                  <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                </span>
              </>
            )}
          </div>
        );
      }
    },
    {
      title: <p className="cursor-default">Work Time</p>,
      dataIndex: 'workTime',
      align: 'center',
      editable: true,
      render: (_, record) => {
        let difference = '0';
        const shiftStartIsValid = dayjs(record.shiftStart).isValid();
        const shiftEndIsValid = dayjs(record.shiftEnd).isValid();

        if (shiftStartIsValid && shiftEndIsValid && record.shiftStart && record.shiftEnd) {
          difference = Number(dayjs(record.shiftEnd).diff(dayjs(record.shiftStart), 'minutes') / 60).toFixed(2);
        }
        record.workTime = Number(difference) ?? 0;
        return (
          <div className="test flex w-full items-center justify-center gap-3">
            {Number(difference) > 0 && (
              <>
                <span>
                  <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                </span>
                <span>{difference}</span>
              </>
            )}
          </div>
        );
      }
    },
    {
      title: <p className="cursor-default">Break Start</p>,
      dataIndex: 'breakStart',
      editable: isInViewDetails ? !isSaved : true,
      align: 'center',
      render: (breakStart) => {
        return (
          <div className="flex min-h-[11px] w-[111.5px] items-center justify-between gap-5">
            {breakStart && (
              <>
                <p>{formatDayjsToStrHoursAndMinutes(breakStart)}</p>
                <span>
                  <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                </span>
              </>
            )}
          </div>
        );
      }
    },
    {
      title: <p className="cursor-default">Break End</p>,
      dataIndex: 'breakEnd',
      editable: isInViewDetails ? !isSaved : true,
      align: 'center',
      render: (_, record) => {
        return (
          <div className="flex min-h-[11px] w-[111.5px] items-center justify-between gap-5">
            {record.breakEnd && (
              <>
                <p>{formatDayjsToStrHoursAndMinutes(record.breakEnd)}</p>
                <span>
                  <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                </span>
              </>
            )}
          </div>
        );
      }
    },
    {
      title: <p className="cursor-default">Actions</p>,
      dataIndex: 'isDayOff',
      editable: false,
      align: 'center',
      render: (_, record) => (
        <DotsMenu
          titleDeleteMessageConfirm="Reset day values"
          contentDeleteMessageConfirm="Are you sure to delete this day values?"
          isPageWorkPlan={true}
          enableDayOff={true}
          handleDotMenu={() => handleClearDayValues(record.day)}
          handleDayOff={() => {
            dispatch(toggleTempIsDayOff({ dayName: record.day }));
          }}
          isDayOff={record.isDayOff ?? null}
        />
      )
    }
  ];

  const handleDataSourceWithTimePickerISODate = (newData: DataType[]) => {
    const convertTimePickerValuesToStr = newData.map((item) => ({
      ...item,
      shiftStart: parseDayjsToIsoString(item.shiftStart),
      shiftEnd: parseDayjsToIsoString(item.shiftEnd),
      breakStart: parseDayjsToIsoString(item.breakStart),
      breakEnd: parseDayjsToIsoString(item.breakEnd),
      workTime: Number(item.workTime) ?? 0
    }));
    dispatch(updateTempWorkPlan({ targetName: 'week', data: convertTimePickerValuesToStr }));
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);

    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    handleDataSourceWithTimePickerISODate(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable && col.dataIndex === 'shiftStart') {
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
          colSapn: record?.isDayOff ? 5 : 1
        })
      };
    }

    if (col.dataIndex === 'day') {
      return {
        ...col,
        render: (day, record) => <p className={record.isDayOff ? 'is-day-off' : ''}>{capitalizeName(day)}</p>
      };
    }

    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: DataType) => {
        const basePropsOnCell = {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave
        };

        if (record && record.isDayOff) {
          if (col.dataIndex === 'shiftStart') {
            return { ...basePropsOnCell, colSpan: 5 };
          }
          return { ...basePropsOnCell, colSpan: 0 };
        }
        return { ...basePropsOnCell, colSpan: 1 };
      }
    };
  });

  return (
    <div className="relative">
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={{ position: ['none'] }}
        scroll={{ x: dataSource.length > 0 ? 1000 : 0 }}
        className={`${dataSource.length > 0 ? '' : 'mb-[18px]'} ${isSaved ? 'table-disabled' : ''}`}
      />
    </div>
  );
};

export default WorkPlanTable;
