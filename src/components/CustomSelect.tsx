import { Divider, Select, Space } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';

interface CustomSelectType {
  options: () => {
    value: string;
    label: JSX.Element;
  }[];
  handleDrawerOpen: () => void;
}

function CustomSelect({ options, handleDrawerOpen }: CustomSelectType) {
  const finalOptions = options();
  return (
    <Select
      placeholder="Choose Position"
      suffixIcon={<IoIosArrowDown size={16} />}
      options={finalOptions}
      allowClear
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0 2px' }} />
          <Space style={{ width: '100%', height: '100%' }}>
            <button
              className="flex h-full w-full items-center gap-[6px] px-[11px] py-[10px] capitalize text-blue/medium focus:outline-none"
              onClick={handleDrawerOpen}
            >
              <FaPlus size={12} />
              create new position
            </button>
          </Space>
        </>
      )}
    />
  );
}

export default CustomSelect;
