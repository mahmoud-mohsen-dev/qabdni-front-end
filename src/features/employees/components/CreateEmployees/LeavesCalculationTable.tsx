import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef } from 'antd';
import { Form, InputNumber, Table } from 'antd';
import { LeavesTableData } from '../../../../types';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<unknown> | null>(null);

interface Item {
  emergencyLeave: number;
  otherLeave: number;
  personalLeave: number;
  publicHolidays: number;
  sickLeave: number;
  studyLeave: number;
  unauthorizedLeave: number;
  unpaidLeave: number;
  vacationLeave: number;
  workFromHome: number;
}

const EditableRow: React.FC = ({ ...props }) => {
  const [form] = Form.useForm();
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

  const inputRef = useRef<any>(null);
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
      console.log(title);
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} className="flex w-full items-center justify-center">
        <InputNumber
          ref={inputRef}
          className="flex w-[140px] items-center justify-center"
          addonAfter="Day(s)"
          min={0}
          onBlur={save}
          defaultValue={0}
        />
      </Form.Item>
    ) : (
      <button
        className="editable-cell-value-wrap w-full rounded-lg border-2 border-solid border-transparent px-[11px] py-2 hover:border-gray/lighter focus:outline-none"
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

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const LeavesCalculationTable = ({
  dataSource,
  setDataSource
}: {
  dataSource: LeavesTableData[];
  setDataSource: React.Dispatch<React.SetStateAction<LeavesTableData[]>>;
}) => {
  // useEffect(() => {
  //   console.log('='.repeat(30));
  //   console.log(dataSource);
  //   console.log('='.repeat(30));
  // }, [dataSource]);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Leave Type',
      editable: false,
      dataIndex: 'leaveType',
      align: 'left',
      render: () => {
        return <h4 className="text-sm font-medium text-gray/darkest">Deduction Rate</h4>;
      }
    },
    {
      title: 'Emergency Leave',
      dataIndex: 'emergencyLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Other Leave',
      dataIndex: 'otherLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Personal Leave',
      dataIndex: 'personalLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Public Holidays',
      dataIndex: 'publicHolidays',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Sick Leave',
      dataIndex: 'sickLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Study Leave',
      dataIndex: 'studyLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Unauthorized Leave',
      dataIndex: 'unauthorizedLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Unpaid Leave',
      dataIndex: 'unpaidLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Vacation Leave',
      dataIndex: 'vacationLeave',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    },
    {
      title: 'Work From Home',
      dataIndex: 'workFromHome',
      align: 'center',
      editable: true,
      render: (value) => {
        return (
          <p className="flex items-center justify-center gap-1">
            <span>{value}</span>
            <span>day(s)</span>
          </p>
        );
      }
    }
  ];

  const handleSave = (row: LeavesTableData) => {
    const newData = [...dataSource];
    const item = newData[0];
    newData.splice(0, 1, {
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
      onCell: (record: LeavesTableData) => ({
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
        pagination={{ position: ['none'] }}
        scroll={{ x: 1800 }}
        className="overflow-x-auto"
      />
    </div>
  );
};

export default LeavesCalculationTable;
