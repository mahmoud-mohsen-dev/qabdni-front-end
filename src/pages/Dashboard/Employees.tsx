import EmployeeCard from '../../features/employees/components/EmployeeCard';
import { v4 as uuidv4 } from 'uuid';
import SortBy from '../../features/employees/components/SortBy';
import FilterByStatus from '../../features/employees/components/FilterByStatus';
import FilterByBranch from '../../features/employees/components/FilterByBranch';
import FilterByDepartment from '../../features/employees/components/FilterByDepartment';
import Button from '../../components/Button';
import { FaPlus } from 'react-icons/fa6';

const employee = {
  imageUrl: '/public/images/account-image-1.png',
  name: 'Sebastian bennett',
  position: 'C++ Game Developer',
  status: 'active' as const, // active | remoter | onHoliday | terminated
  department: 'Sales & Marketing',
  dateOfJoining: '',
  email: 'bennett-seb@example.com',
  phone: '01006879945'
};

const employees = [
  employee,
  employee,
  {
    ...employee,
    dateOfJoining: '2024-02-19T22:00:00.000Z',
    imageUrl: '/public/images/mahmoud-porfile-reducedVersion.jpg'
  },
  { ...employee, imageUrl: '/public/images/ahmed-cover.jpg' },
  { ...employee, imageUrl: '/public/images/christian-buehne.jpg' },
  employee,
  employee,
  employee,
  employee,
  employee,
  employee,
  employee,
  employee,
  employee,
  employee,
  employee
];

function Employees() {
  return (
    <div>
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-other/black&blue-normal">Employees</h1>
        <div className="flex gap-2">
          {/* Sort by Select Input */}
          <SortBy />
          {/* Status Select Input */}
          <FilterByStatus />
          {/* Branch Select Input */}
          <FilterByBranch />
          {/* Department Select Input */}
          <FilterByDepartment />

          <Button paddingSize="2xs">
            <FaPlus />
            <span>Add Employee</span>
          </Button>
        </div>
      </div>

      {/* Employees card */}
      <div className="grid-cols-350 mt-6 grid gap-5">
        {employees.map((employee) => (
          <EmployeeCard employee={employee} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
}

export default Employees;
