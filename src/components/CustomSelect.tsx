import { Divider, Select, Space } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { positionType } from '../store/positionsReducer';

interface CustomSelectType {
  all: positionType[];
  showLoading: () => void;
}

function CustomSelect({ all, showLoading }: CustomSelectType) {
  const positionOptions = () => {
    const options = all.map((position: positionType) => ({
      value: position.name,
      label: <span className="capitalize">{position.name}</span>
    }));

    return options;
  };

  return (
    <Select
      placeholder="Choose Position"
      suffixIcon={<IoIosArrowDown size={16} />}
      options={positionOptions()}
      allowClear
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0 2px' }} />
          <Space style={{ width: '100%', height: '100%' }}>
            <button
              className="flex h-full w-full items-center gap-[6px] px-[11px] py-[10px] capitalize text-blue/medium focus:outline-none"
              onClick={() => showLoading()}
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
