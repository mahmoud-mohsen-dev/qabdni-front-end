import { Select } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function FilterByStatus() {
  return (
    <Select
      // defaultValue="Status"
      placeholder="Status"
      // style={{ minWidth: 180 }}
      size="large"
      suffixIcon={<IoIosArrowDown size={16} />}
      onChange={handleChange}
      options={[
        { value: 'active', label: 'Active' },
        { value: 'remote', label: 'Remote' },
        { value: 'onHoliday', label: 'On Holiday' },
        { value: 'terminated', label: 'Terminated' }
      ]}
      allowClear
    />
  );
}

export default FilterByStatus;
