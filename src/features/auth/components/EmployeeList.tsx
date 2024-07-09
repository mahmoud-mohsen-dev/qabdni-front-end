import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
