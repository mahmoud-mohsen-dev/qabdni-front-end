import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { Form, Input, Popconfirm, Switch, Table, Tooltip } from 'antd';
import BtnAddNewRow from '../../../../components/BtnAddNewRow';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<unknown> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
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
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const CalculationSystemTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0'
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1'
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
      // width: '10%',
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
      width: '30%',
      ellipsis: {
        showTitle: false
      },
      editable: true,
      render: (durationStart) => (
        <Tooltip placement="topLeft" title={durationStart}>
          {durationStart}
        </Tooltip>
      )
    },
    {
      title: 'Duration End (applied before the start of the shift)',
      dataIndex: 'durationEnd',
      // width: '200px',
      editable: true
    },
    {
      title: 'Multiplier',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <button className="focus:outline-none">Delete</button>
          </Popconfirm>
        ) : null
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
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`
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
    <div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        className="overflow-x-auto"
      />
      <BtnAddNewRow onClick={handleAdd} />
    </div>
  );
};

export default CalculationSystemTable;
