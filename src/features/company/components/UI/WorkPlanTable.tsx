import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef } from 'antd';
import { Form, Table, TimePicker } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { TableRowType } from '../../../../types';
import { formatDayjsToStrHoursAndMinutes, parseDayjsToIsoString, parseIsoStringToDayjs } from '../../../../utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { DaysType, TimePickerValueType, updateTempWorkPlan } from '../../../../store/workPlansSlice';
import { capitalizeName } from '../../../../utils/user';
import dayjs from 'dayjs';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<unknown> | null>(null);

const EditableRow: React.FC = ({ ...props }) => {
  const [form] = Form.useForm();
  // console.log(index);
  return (
    <Form form={form} component={false} onFinish={(values) => console.log(values)}>
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
  handleDataSourceWithTimePickerISODate: (newData: DataType[]) => void;
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
  // const  {wrokPlanId}  = useParams();
  const wrokPlanId = true;

  const [editing, setEditing] = useState(() => (wrokPlanId ? true : false));
  const [openMenu, setOpenMenu] = useState(false);

  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      // if (dataIndex !== 'multiplier') {
      //   inputRef.current?.focus();
      // }
      inputRef.current?.focus();
    }
  }, [editing, dataIndex]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = (await form.validateFields()) as TableRowType;
      console.log(values);
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log(title);
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} initialValue={record[dataIndex]}>
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

  // const handleClear = (key: React.Key) => {
  // const newData = dataSource.filter((item) => item.key !== key);
  // dispatch(updateCurrentEmployee({ target: tableName, data: newData }));
  // };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: <p className="cursor-default">Day</p>,
      dataIndex: 'day',
      // width: '15%',
      align: 'center',
      render: (day) => {
        return <p>{capitalizeName(day)}</p>;
      }
    },
    {
      title: <p className="cursor-default">Shift Start</p>,
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
      editable: false,
      render: (_, record) => {
        let difference = '0';
        const shiftStartIsValid = dayjs(record.shiftStart).isValid();
        const shiftEndIsValid = dayjs(record.shiftEnd).isValid();

        if (shiftStartIsValid && shiftEndIsValid && record.shiftStart && record.shiftEnd) {
          difference = Number(dayjs(record.shiftEnd).diff(dayjs(record.shiftStart), 'minutes') / 60).toFixed(2);
        }
        console.log(difference);
        record.workTime = difference;
        return (
          <div className="flex w-full items-center justify-center gap-3">
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
      render: (breakEnd) => {
        return (
          <div className="flex min-h-[11px] w-[111.5px] items-center justify-between gap-5">
            {breakEnd && (
              <>
                <p>{formatDayjsToStrHoursAndMinutes(breakEnd)}</p>
                <span>
                  <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
                </span>
              </>
            )}
          </div>
        );
      }
    }
  ];
  const handleDataSourceWithTimePickerISODate = (newData: DataType[]) => {
    const convertTimePickerValuesToStr = newData.map((item) => ({
      ...item,
      shiftStart: parseDayjsToIsoString(item.shiftStart),
      shiftEnd: parseDayjsToIsoString(item.shiftEnd),
      breakStart: parseDayjsToIsoString(item.breakStart),
      breakEnd: parseDayjsToIsoString(item.breakEnd)
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
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      }),
      handleDataSourceWithTimePickerISODate
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
