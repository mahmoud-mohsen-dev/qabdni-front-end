import AgeDistributionChart from './AgeDistributionChart';
import BirthdayCard from './BirthdayCard';
import DepartmentDistributionChart from './DepartmentDistributionChart';
import DepartmentItem from './DepartmentItem';
import EmployeesNumbers from './EmployeesNumbers';
import EmployeeTenureDistributionChart from './EmployeeTenureDistributionChart';
import FixedBars from './FixedBars';
import GenderDistributionChart from './GenderDistributionChart';

function MainContent() {
  return (
    <div className="mt-4 grid min-h-80 auto-rows-[60px] grid-cols-12 grid-rows-[60px] gap-4">
      {/* First Row */}
      <div className="col-span-9 row-span-2 grid grid-cols-4 gap-4">
        <EmployeesNumbers text="terminated" color="orange" value={2} />
        <EmployeesNumbers text="Active Employees" color="green" value={20} />
        <EmployeesNumbers text="OnSite" color="blue" value={16} />
        <EmployeesNumbers text="Remote" color="indigo" value={4} />
      </div>

      {/* Gender Distribution */}
      <div className="col-span-3 row-span-4 flex flex-col rounded-[20px] bg-gray/ultralight pb-5">
        <h3 className="p-5 pb-2 text-lg font-semibold">Gender Distribution</h3>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold text-other/black&blue-normal">20</h2>
          <p className="text-xs font-medium uppercase text-gray/darkest">Active Employees</p>
        </div>
        <GenderDistributionChart />
      </div>

      {/* ========== */}
      {/* Second Row */}
      {/* ========== */}
      <div className="col-span-9 row-span-4 grid grid-cols-5 gap-4">
        {/* Department Distribution */}
        <div className="col-span-2 row-span-4 flex flex-col rounded-[20px] bg-other/black&blue-dark">
          <h3 className="p-5 pb-2 text-lg font-semibold text-[#ccc]">Distribution by Departments</h3>
          <DepartmentDistributionChart />
        </div>

        {/* Department */}
        <div className="col-span-3 row-span-4 flex flex-col overflow-hidden rounded-[20px] bg-gray/ultralight p-5">
          <h3 className="text-lg font-semibold">Departments</h3>
          <div className="mt-4 flex flex-col gap-2 overflow-x-auto pr-2">
            <DepartmentItem text="Development" color="indigo" employeesImages={['', '', '', '', '', '', '']} />
            <DepartmentItem text="Sales & Marketing" color="orange" employeesImages={['', '', '', '', '', '', '']} />
            <DepartmentItem text="Project Management" color="green" employeesImages={['', '', '', '', '', '', '']} />
            <DepartmentItem text="Analytics & Data" color="blue" employeesImages={['', '', '', '', '', '', '']} />
            <DepartmentItem text="Finance" color="pink" employeesImages={['', '', '', '', '', '', '']} />
          </div>
        </div>
      </div>

      {/* Total Branches */}
      <div className="col-span-3 row-span-2 flex flex-col rounded-[20px] bg-gray/ultralight p-5">
        <h3 className="text-lg font-semibold">Total Branches</h3>
        <FixedBars value={22} />
      </div>

      {/* ========= */}
      {/* Third Row */}
      {/* ========= */}
      <div className="col-span-9 row-span-5 grid grid-cols-5 gap-4">
        {/* <div className="col-span-2 row-span-1 flex flex-col rounded-[20px] bg-gray/ultralight">
          <h3 className="p-5 pb-2 text-[22px] font-semibold ">Total Warehouses</h3>
        </div> */}

        {/* Age Distribution */}
        <div className="col-span-3 row-span-1 flex flex-col rounded-[20px] bg-gray/ultralight p-5">
          <h3 className="text-lg font-semibold">Age Distribution</h3>
          <AgeDistributionChart />
        </div>

        {/* Employee Tenure Distribution */}
        <div className="col-span-2 row-span-1 flex flex-col justify-between overflow-hidden rounded-[20px] bg-blue/accent p-5 text-white">
          <h3 className="text-lg font-semibold">Birthdays in this Month</h3>

          <div className="mt-6 flex gap-5 overflow-y-auto">
            <BirthdayCard url="" name="mahmoud mohsen" position="data analyst" birthDate="2024-02-19T22:00:00.000Z" />
            <BirthdayCard url="" name="mahmoud mohsen" position="data analyst" birthDate="2024-02-19T22:00:00.000Z" />
          </div>
        </div>
      </div>

      {/* Birthdays in this Month */}
      <div className="col-span-3 row-span-5 flex flex-col rounded-[20px] bg-gray/ultralight p-5">
        <h3 className="text-lg font-semibold">Employee Tenure Distribution </h3>
        <EmployeeTenureDistributionChart />
      </div>
    </div>
  );
}

export default MainContent;
