import { Select } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function FilterByDepartment() {
  return (
    <Select
      // defaultValue="Department"
      placeholder="Department"
      //   style={{ minWidth: 180 }}
      size="large"
      suffixIcon={<IoIosArrowDown size={16} />}
      onChange={handleChange}
      options={[
        { value: 'Analytics & Data', label: 'Analytics & Data' },
        { value: 'Sales & Marketing', label: 'Sales & Marketing' },
        { value: 'Development', label: 'Development' },
        { value: 'Managment', label: 'Managment' }
      ]}
      allowClear
    />
  );
}

export default FilterByDepartment;
