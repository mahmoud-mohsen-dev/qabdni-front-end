import { message } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import EmployeeForms from '../components/CreateEmployees/EmployeeForms';
import useEmployeeForms from '../hooks/useEmployeeForms';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateCurrentEmployee } from '../store/employeesSlice';
import { RootState } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CreateEmployee() {
  const { currentEmployee, fullEmployeesData } = useSelector((state: RootState) => {
    return state.employees;
  });
  const navigate = useNavigate();

  const employeeId = `${fullEmployeesData.length}${Math.floor(Math.random() * 100)}`;
  // Forms States
  const {
    basicInfoForm,
    personalInfoForm,
    bankInformationForm,
    emergencyContactForm,
    attendanceAndDepartureInfoForm,
    salaryCalculationSystemForm,
    otherCalculationSystemForm
  } = useEmployeeForms();
  // Tables States

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCurrentEmployee({ target: 'basicInfoData', data: { id: employeeId } }));
  }, []);

  const handleCreateEmployee = async () => {
    try {
      await Promise.all([
        basicInfoForm.validateFields(),
        personalInfoForm.validateFields(),
        bankInformationForm.validateFields(),
        emergencyContactForm.validateFields(),
        attendanceAndDepartureInfoForm.validateFields(),
        salaryCalculationSystemForm.validateFields(),
        otherCalculationSystemForm.validateFields()
      ]);

      dispatch(createEmployee(currentEmployee));
      navigate('/dashboard/employees');
    } catch (e) {
      const error = e as ValidateErrorEntity<any>;
      console.error(error.errorFields[0].errors[0]);
      message.error(error.errorFields[0].errors[0]);
    }
  };

  return (
    <EmployeeForms
      basicInfoForm={basicInfoForm}
      personalInfoForm={personalInfoForm}
      bankInformationForm={bankInformationForm}
      emergencyContactForm={emergencyContactForm}
      attendanceAndDepartureInfoForm={attendanceAndDepartureInfoForm}
      salaryCalculationSystemForm={salaryCalculationSystemForm}
      otherCalculationSystemForm={otherCalculationSystemForm}
      handleCreateEmployee={handleCreateEmployee}
    />
  );
}

export default CreateEmployee;
