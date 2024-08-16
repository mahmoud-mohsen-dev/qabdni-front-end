import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef } from 'antd';
import { Form, InputNumber, Popconfirm, Select, Switch, Table, TimePicker, Tooltip } from 'antd';
import BtnAddNewRow from '../../../../components/BtnAddNewRow';
import { IoIosArrowDown } from 'react-icons/io';
import { QuestionCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { EmployeeCalculationTableNameType, TableRowType } from '../../../../types';
import { useParams } from 'react-router-dom';
import { formatDayjsToStrHoursAndMinutes, parseDayjsToIsoString, parseIsoStringToDayjs } from '../../../../utils/date';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { updateCurrentEmployee } from '../../store/employeesSlice';
import { v4 } from 'uuid';

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
  dataIndex: keyof TableRowType;
  record: TableRowType;
  handleSave: (record: TableRowType) => void;
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
  const { employeeId } = useParams();

  const [editing, setEditing] = useState(() => (employeeId ? true : false));
  const [openMenu, setOpenMenu] = useState(false);

  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      if (dataIndex !== 'multiplier') {
        inputRef.current?.focus();
      }
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
        {(dataIndex === 'durationStart' || dataIndex === 'durationEnd') && (
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

        {dataIndex === 'multiplier' && (
          <InputNumber
            // ref={inputRef}
            className="flex w-[180px] items-center justify-center"
            addonAfter={
              <Form.Item
                name="multiplier-duration"
                className="!mb-0 flex h-[32px] items-center justify-center"
                initialValue={record['multiplier-duration'] ?? 'times'}
              >
                <Select
                  style={{ width: 110 }}
                  suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                  options={[
                    { label: 'Times', value: 'times' },
                    { label: 'Day(s)', value: 'day(s)' }
                  ]}
                  onChange={(value: 'day(s)' | 'times') => handleSave({ ...record, 'multiplier-duration': value })}
                  onBlur={save}
                />
              </Form.Item>
            }
            min={0}
            onPressEnter={save}
            onBlur={save}
          />
        )}
        {dataIndex === 'minimumOccurrences' && (
          <InputNumber
            // ref={inputRef}
            className="mx-auto flex w-[140px] items-center justify-center"
            addonAfter="Time(s)"
            min={0}
            onPressEnter={save}
            onBlur={save}
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
  isEnabled: boolean;
  durationStart: Dayjs | string | null;
  durationEnd: Dayjs | string | null;
  multiplier: number;
  'multiplier-duration': 'day(s)' | 'times';
  minimumOccurrences: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const CalculationSystemTable = ({
  tableName,
  tooltipDurationStart,
  tooltipDurationEnd,
  isSaved = false,
  isEmployeeDetailsPage = false
}: {
  tableName: EmployeeCalculationTableNameType;
  tooltipDurationStart: string;
  tooltipDurationEnd: string;
  isSaved?: boolean;
  isEmployeeDetailsPage?: boolean;
}) => {
  const dispatch = useDispatch();
  const targetTableDataSource = useSelector((state: RootState) => state.employees.currentEmployee[tableName]);
  const dataSource = targetTableDataSource.map((item) => ({
    ...item,
    durationStart: parseIsoStringToDayjs(item.durationStart),
    durationEnd: parseIsoStringToDayjs(item.durationEnd)
  }));

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    dispatch(updateCurrentEmployee({ target: tableName, data: newData }));
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: <p className="cursor-default">Action</p>,
      dataIndex: 'action',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <button
              className={`flex h-5 w-5 items-center justify-center focus:outline-none disabled:cursor-not-allowed`}
              disabled={isEmployeeDetailsPage ? isSaved : false}
            >
              <img
                src="/images/trash-icon.svg"
                alt="trash icon"
                className={`${isEmployeeDetailsPage ? (isSaved ? 'opacity-65' : '') : ''}`}
              />
            </button>
          </Popconfirm>

          <Switch
            className="custom-switch"
            checked={record?.isEnabled}
            onChange={(value) => handleSave({ ...record, isEnabled: value } as DataType)}
          />
        </div>
      )
    },
    {
      title: (
        <Tooltip title={tooltipDurationStart} className="flex cursor-default items-center justify-center gap-1">
          <p>Duration Start</p>
          <QuestionCircleOutlined className="text-other/black" />
        </Tooltip>
      ),
      dataIndex: 'durationStart',
      align: 'center',
      editable: isEmployeeDetailsPage ? !isSaved : true,
      render: (durationStart) => {
        return (
          <div className="flex min-h-[11px] w-[111.5px] items-center justify-between gap-5">
            {durationStart && (
              <>
                <p>{formatDayjsToStrHoursAndMinutes(durationStart)}</p>
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
      title: (
        <Tooltip title={tooltipDurationEnd} className="flex cursor-default items-center justify-center gap-1">
          <p>Duration End</p>
          <QuestionCircleOutlined className="text-other/black" />
        </Tooltip>
      ),
      dataIndex: 'durationEnd',
      editable: isEmployeeDetailsPage ? !isSaved : true,
      align: 'center',
      render: (durationEnd) => {
        return (
          <div className="flex min-h-[11px] w-[111.5px] items-center justify-between gap-5">
            {durationEnd && (
              <>
                <p>{formatDayjsToStrHoursAndMinutes(durationEnd)}</p>
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
      title: <p className="cursor-default">Multiplier</p>,
      dataIndex: 'multiplier',
      align: 'center',
      editable: isEmployeeDetailsPage ? !isSaved : true,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-2 py-1">
            {record?.multiplier > 0 && (
              <>
                <p>{record.multiplier}</p>
                <span>{record['multiplier-duration']}</span>
              </>
            )}
          </div>
        );
      }
    },
    {
      title: <p className="cursor-default">Minimum Allowed Occurrences.</p>,
      dataIndex: 'minimumOccurrences',
      align: 'center',
      editable: isEmployeeDetailsPage ? !isSaved : true,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-2 py-1">
            {record?.minimumOccurrences > 0 && (
              <>
                <p>{record.minimumOccurrences}</p>
                <span>time(s)</span>
              </>
            )}
          </div>
        );
      }
    }
  ];
  const handleDataSourceWithTimePickerISODate = (newData: DataType[]) => {
    const convertTimePickerValuesToStr = newData.map((item) => {
      return {
        ...item,
        durationStart: parseDayjsToIsoString(item.durationStart),
        durationEnd: parseDayjsToIsoString(item.durationEnd)
      };
    });
    dispatch(updateCurrentEmployee({ target: tableName, data: convertTimePickerValuesToStr }));
  };

  const handleAdd = () => {
    const newData: DataType = {
      key: v4(),
      isEnabled: false,
      durationStart: dayjs('00:00', 'HH:mm'),
      durationEnd: dayjs('00:00', 'HH:mm'),
      multiplier: 1.25,
      'multiplier-duration': 'times',
      minimumOccurrences: 1
    };

    handleDataSourceWithTimePickerISODate([...dataSource, newData]);
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
        pagination={{ position: ['bottomRight'], pageSize: 3 }}
        scroll={{ x: dataSource.length > 0 ? 800 : 0 }}
        className={`${dataSource.length > 0 ? '' : 'mb-[18px]'} ${isSaved ? 'table-disabled' : ''}`}
      />
      {/* Will be displayed in employee details page */}
      {isEmployeeDetailsPage && !isSaved && (
        <BtnAddNewRow
          onClick={handleAdd}
          className={`${dataSource.length > 0 ? 'absolute bottom-[18px] left-1' : 'mb-[18px] mt-4'}`}
        />
      )}
      {/* Will be displayed in create employee page */}
      {!isEmployeeDetailsPage && (
        <BtnAddNewRow
          onClick={handleAdd}
          className={`${dataSource.length > 0 ? 'absolute bottom-[18px] left-1' : 'mb-[18px] mt-4'}`}
        />
      )}
    </div>
  );
};

export default CalculationSystemTable;
