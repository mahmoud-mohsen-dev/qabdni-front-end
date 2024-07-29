import { Divider, Select, Space } from 'antd';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { capitalizeName } from '../utils/user';

interface CustomSelectType {
  placeHolder: string;
  createText: string;
  options: () => {
    value: string;
    label: JSX.Element;
  }[];
  handleDrawerOpen: () => void;
}

function CustomSelect({ placeHolder, createText, options, handleDrawerOpen }: CustomSelectType) {
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const finalOptions = options();

  const handleChange = (value: string) => {
    setSelectValue(value);
    console.log(value, 'value');
  };
  const handleClick = () => {
    handleDrawerOpen();
    setSelectValue(null);
  };

  return (
    <Select
      placeholder={capitalizeName(placeHolder)}
      suffixIcon={<IoIosArrowDown size={16} />}
      options={finalOptions}
      allowClear
      value={selectValue}
      onChange={handleChange}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0 2px' }} />
          <Space style={{ width: '100%', height: '100%' }}>
            <button
              className="flex h-full w-full items-center gap-[6px] px-[11px] py-[10px] capitalize text-blue/medium focus:outline-none"
              onClick={handleClick}
            >
              <FaPlus size={12} />
              {createText}
            </button>
          </Space>
        </>
      )}
    />
  );
}

export default CustomSelect;
