import { Select } from 'antd';
import { IoIosArrowDown } from 'react-icons/io';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function SortBy() {
  return (
    <Select
      // defaultValue="Sort by"
      placeholder="Sort by"
      style={{ minWidth: 220 }}
      size="large"
      suffixIcon={<IoIosArrowDown size={16} />}
      onChange={handleChange}
      options={[
        { value: 'name-asc', label: 'Name: (A-Z)' },
        { value: 'name-des', label: 'Name: (Z-A)' },
        { value: 'status-asc', label: 'Status: (A-Z)' },
        { value: 'status-des', label: 'Status: (Z-A)' },
        { value: 'branch-asc', label: 'Branch: (A-Z)' },
        { value: 'branch-des', label: 'Branch: (Z-A)' },
        { value: 'department-asc', label: 'Department: (A-Z)' },
        { value: 'department-des', label: 'Department: (Z-A)' },
        { value: 'dateOfJoining-asc', label: 'Date of joining: (Newest to Oldest)' },
        { value: 'dateOfJoining-des', label: 'Date of joining: (Oldest to Newest)' },
        { value: 'created-asc', label: 'Created: (Newest to Oldest)' },
        { value: 'created-des', label: 'Created: (Oldest to Newest)' }
      ]}
      allowClear
    />
  );
}

export default SortBy;
