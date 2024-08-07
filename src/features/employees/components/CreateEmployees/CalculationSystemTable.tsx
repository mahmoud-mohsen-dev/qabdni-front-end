import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef } from 'antd';
import { Form, InputNumber, Popconfirm, Select, Switch, Table, TimePicker, Tooltip } from 'antd';
import BtnAddNewRow from '../../../../components/BtnAddNewRow';
import type { Moment } from 'moment';
import moment from 'moment';
import { IoIosArrowDown } from 'react-icons/io';
import { QuestionCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { TableRowType } from '../../../../types';

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
  const [editing, setEditing] = useState(false);

  const inputRef = useRef<any>(null);
  // const timePickerRef = useRef<any>(null);
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
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        {dataIndex === 'multiplier' ? (
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
                  defaultValue={record['multiplier-duration'] ?? 'times'}
                  style={{ width: 110 }}
                  suffixIcon={<IoIosArrowDown size={16} color="rgba(0, 0, 0, 0.20)" />}
                  options={[
                    { label: 'Times', value: 'times' },
                    { label: 'Day(s)', value: 'day(s)' }
                  ]}
                  value={record['multiplier-duration'] ?? 'times'}
                  onChange={(value: 'day(s)' | 'times') => handleSave({ ...record, 'multiplier-duration': value })}
                  onBlur={save}
                />
              </Form.Item>
            }
            min={0}
            onPressEnter={save}
            onBlur={save}
          />
        ) : dataIndex === 'durationStart' || dataIndex === 'durationEnd' ? (
          <TimePicker ref={inputRef} onOk={save} defaultOpen format="HH:mm" />
        ) : (
          <InputNumber
            ref={inputRef}
            className="mx-auto flex w-[140px] items-center justify-center"
            addonAfter="Times"
            min={0}
            onPressEnter={save}
            onBlur={save}
            defaultValue={record['minimumOccurrences'] ?? 0}
          />
        )}
      </Form.Item>
    ) : (
      <button
        className="editable-cell-value-wrap rounded-lg border-2 border-solid border-transparent px-[11px] py-2 hover:border-gray/lighter focus:outline-none"
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
  durationStart: Moment;
  durationEnd: Moment;
  multiplier: number;
  'multiplier-duration': 'day(s)' | 'times';
  minimumOccurrences: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const CalculationSystemTable = ({
  tooltipDurationStart,
  tooltipDurationEnd,
  dataSource,
  setDataSource
}: {
  tooltipDurationStart: string;
  tooltipDurationEnd: string;
  dataSource: DataType[];
  setDataSource: React.Dispatch<React.SetStateAction<DataType[]>>;
}) => {
  const [count, setCount] = useState(dataSource.length);

  // useEffect(() => {
  //   console.log('='.repeat(30));
  //   console.log(dataSource);
  //   console.log('='.repeat(30));
  // }, [dataSource]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
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
            <button className="flex h-5 w-5 items-center justify-center focus:outline-none">
              <img src="/images/trash-icon.svg" alt="trash icon" />
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
      editable: true,
      render: (durationStart) => {
        return (
          <div className="flex w-[111.5px] items-center justify-between gap-5">
            <p>{durationStart?.format('HH:mm')}</p>
            <span>
              <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
            </span>
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
      editable: true,
      align: 'center',
      render: (durationEnd) => {
        return (
          <div className="flex w-[111.5px] items-center justify-between gap-5">
            <p>{durationEnd?.format('HH:mm')}</p>
            <span>
              <ClockCircleOutlined size={14} style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
            </span>
          </div>
        );
      }
    },
    {
      title: <p className="cursor-default">Multiplier</p>,
      dataIndex: 'multiplier',
      align: 'center',
      editable: true,
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
      editable: true
    }
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      isEnabled: false,
      durationStart: moment('00:00', 'HH:mm'),
      durationEnd: moment('00:00', 'HH:mm'),
      multiplier: 0,
      'multiplier-duration': 'times',
      minimumOccurrences: 0
    };

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setDataSource(newData);
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
      })
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
        scroll={{ x: 800 }}
        className="overflow-x-auto"
      />
      <BtnAddNewRow onClick={handleAdd} className="absolute bottom-[18px] left-1" />
    </div>
  );
};

export default CalculationSystemTable;
