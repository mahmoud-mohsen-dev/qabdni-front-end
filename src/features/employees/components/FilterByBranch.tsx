import { Select } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function FilterByBranch() {
  return (
    <Select
      defaultValue="Branch"
      placeholder="Branch"
      //   style={{ minWidth: 180 }}
      size="large"
      suffixIcon={<IoIosArrowDown size={16} />}
      onChange={handleChange}
      options={[
        { value: 'El bostan 1', label: 'El bostan 1' },
        { value: 'El bostan 1', label: 'El bostan 2' },
        { value: 'Misr El Gadida', label: 'Misr El Gadida' },
        { value: 'Tagamoo3', label: 'Tagamoo3' }
      ]}
      allowClear
    />
  );
}

export default FilterByBranch;
