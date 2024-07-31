import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { Form, Input, Popconfirm, Select, Switch, Table, TimePicker, Tooltip } from 'antd';
import BtnAddNewRow from '../../../../components/BtnAddNewRow';
import type { Moment } from 'moment';
import moment from 'moment';
import { IoIosArrowDown } from 'react-icons/io';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<unknown> | null>(null);

interface Item {
  key: string;
  isEnabled: boolean;
  durationStart: string;
  durationEnd: string;
  multiplier: string;
  minimumOccurrences: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  console.log(index);
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
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
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
  const inputRef = useRef<InputRef>(null);
  const timePickerRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      if (dataIndex === 'durationStart' || dataIndex === 'durationEnd') {
        timePickerRef.current?.focus();
      } else {
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
      const values = (await form.validateFields()) as Item;

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} is required.` }]}>
        {dataIndex === 'multiplier' && (
          <Select
            // placeholder={capitalizeName('Choose your gender')}
            suffixIcon={<IoIosArrowDown size={16} />}
            allowClear
            // disabled={isSaved}
            options={[
              { label: 'male', value: 'Male' },
              { label: 'female', value: 'Female' }
            ]}
            onChange={save}
            onBlur={save}
          />
        )}
        {dataIndex === 'durationStart' || dataIndex === 'durationEnd' ? (
          <TimePicker ref={timePickerRef} onOk={save} onBlur={save} defaultOpen format="HH:mm" />
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <button
        className="editable-cell-value-wrap w-full border-2 border-solid border-transparent px-[11px] py-1 hover:border-gray/light focus:outline-none"
        // style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </button>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  isEnabled: boolean;
  durationStart: Moment;
  durationEnd: Moment;
  multiplier: number;
  minimumOccurrences?: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const CalculationSystemTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      isEnabled: true,
      durationStart: moment('00:00', 'HH:mm'),
      durationEnd: moment('00:00', 'HH:mm'),
      multiplier: 1.5,
      minimumOccurrences: 1
    },
    {
      key: '1',
      isEnabled: true,
      durationStart: moment('05:00', 'HH:mm'),
      durationEnd: moment('10:00', 'HH:mm'),
      multiplier: 2,
      minimumOccurrences: 0
    }
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Action',
      dataIndex: 'action',
      width: '15%',
      // editable: true,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <button className="flex h-5 w-5 items-center justify-center focus:outline-none">
              <img src="/images/trash-icon.svg" alt="trash icon" />
            </button>
          </Popconfirm>

          <Switch className="custom-switch" />
        </div>
      )
    },
    {
      title: 'Duration Start (applied before the start of the shift)',
      dataIndex: 'durationStart',
      // width: '25%',
      ellipsis: {
        showTitle: false
      },
      editable: true,
      render: (durationStart) => (
        <Tooltip placement="topLeft" title={durationStart?.format('HH:mm')}>
          {/* {durationStart} */}
          {durationStart?.format('HH:mm')}
        </Tooltip>
      )
    },
    {
      title: 'Duration End (applied before the start of the shift)',
      dataIndex: 'durationEnd',
      editable: true,
      // width: '25%',
      ellipsis: {
        showTitle: false
      },
      render: (durationEnd) => (
        <Tooltip placement="topLeft" title={durationEnd?.format('HH:mm')}>
          {durationEnd?.format('HH:mm')}
        </Tooltip>
      )
    },
    {
      title: 'Multiplier',
      dataIndex: 'operation',
      // width: '25%',
      editable: true
    },
    {
      title: ' Minimum Allowed Occurrences.',
      dataIndex: 'minimumOccurrences',
      // width: 'fit-content',
      editable: true
    }
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      isEnabled: true,
      durationStart: moment('05:00', 'HH:mm'),
      durationEnd: moment('10:00', 'HH:mm'),
      multiplier: 2,
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
        pagination={{ position: ['bottomRight'], pageSize: 5 }}
        scroll={{ x: 750 }}
        className="overflow-x-auto"
      />
      <BtnAddNewRow onClick={handleAdd} className="absolute bottom-[18px] left-0" />
      {/* <BtnAddNewRow onClick={handleAdd} className="my-4" /> */}
    </div>
  );
};

export default CalculationSystemTable;
