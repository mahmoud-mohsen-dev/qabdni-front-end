import EmployeeCard from '../../features/employees/components/EmployeeCard';
import { v4 as uuidv4 } from 'uuid';
import SortBy from '../../features/employees/components/SortBy';
import FilterByStatus from '../../features/employees/components/FilterByStatus';
import FilterByBranch from '../../features/employees/components/FilterByBranch';
import FilterByDepartment from '../../features/employees/components/FilterByDepartment';
// import Btn from '../../components/Btn';
import { FaPlus } from 'react-icons/fa6';
import HeadingTitle from '../../components/HeadingTitle';
import { Button, Empty, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Employees() {
  const { basicEmployeesData: employees } = useSelector((state: RootState) => state.employees);
  const navigate = useNavigate();
  const handleAddEmployee = () => {
    navigate('/dashboard/create-employee');
  };

  return (
    <div>
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <HeadingTitle>Employees</HeadingTitle>
        <div className="flex flex-wrap gap-2">
          {/* Sort by Select Input */}
          <SortBy />
          {/* Status Select Input */}
          <FilterByStatus />
          {/* Branch Select Input */}
          <FilterByBranch />
          {/* Department Select Input */}
          <FilterByDepartment />

          {/* <Btn size="lg">
            <FaPlus />
            <span>Add Employee</span>
          </Btn> */}
          <Button type="primary" size="large" onClick={handleAddEmployee}>
            <FaPlus />
            <span>Add Employee</span>
          </Button>
        </div>
      </div>

      {/* Employees card */}
      <div className="mt-6 grid grid-cols-350 gap-5">
        {employees.length > 0 ? (
          employees.map((employee) => <EmployeeCard employee={employee} key={uuidv4()} />)
        ) : (
          // <Empty imageStyle={{ width: 300, height: 200 }} style={{ width: 300, placeSelf: 'center' }} />
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 154, width: 250 }}
            style={{ width: 250, placeSelf: 'center' }}
            description={<Typography.Text>No Data</Typography.Text>}
          >
            <Button
              type="dashed"
              className="mt-1 text-sm focus:outline-none"
              onClick={() => navigate('/dashboard/create-employee')}
            >
              Create Now
            </Button>
          </Empty>
        )}
      </div>
    </div>
  );
}

export default Employees;
