import { Divider, Form, Select, Space } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeName } from '../utils/user';

interface CustomSelectType {
  name: string;
  label: JSX.Element;
  rules: {
    [keyof: string]: unknown;
  }[];
  placeHolder: string;
  createText: string;
  disabled: boolean;
  options: () => {
    value: string;
    label: JSX.Element;
  }[];
  handleDrawerOpen: () => void;
}

function CustomSelect({
  name,
  label,
  rules,
  placeHolder,
  disabled,
  createText,
  options,
  handleDrawerOpen
}: CustomSelectType) {
  const finalOptions = options();

  const handleClick = () => {
    handleDrawerOpen();
  };

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select
        placeholder={capitalizeName(placeHolder)}
        suffixIcon={<IoIosArrowDown size={16} />}
        options={finalOptions}
        allowClear
        disabled={disabled}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0 2px' }} />
            <Space style={{ width: '100%', height: '100%' }}>
              <button
                className="flex h-full w-full items-center gap-[6px] px-[11px] py-[13px] capitalize text-blue/medium focus:outline-none"
                type="button"
                onClick={handleClick}
              >
                <FaPlus size={12} />
                {createText}
              </button>
            </Space>
          </>
        )}
      />
    </Form.Item>
  );
}

export default CustomSelect;
