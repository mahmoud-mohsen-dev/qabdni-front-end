import { useEffect, useState } from 'react';
import { viewEmployee } from '../store/employeesSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmployeeForms from '../components/CreateEmployees/EmployeeForms';
import useEmployeeForms from '../hooks/useEmployeeForms';
import useActionBtns from '../hooks/useActionBtns';
import { message } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

function EmployeeDetails() {
  const [isSavedGlobal, setIsSavedGlobal] = useState(true);
  const [isSavedGlobalLoading, setIsSavedGlobalLoading] = useState<boolean>(false);
  const {
    basicInfoForm,
    personalInfoForm,
    bankInformationForm,
    emergencyContactForm,
    attendanceAndDepartureInfoForm,
    salaryCalculationSystemForm,
    otherCalculationSystemForm
  } = useEmployeeForms();

  const { employeeId: paramsEmployeeId } = useParams();
  const isEmployeeDetailsPage = paramsEmployeeId ? true : false;
  const dispatch = useDispatch();

  const basicActionBtns = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: basicInfoForm,
    id: paramsEmployeeId,
    target: 'basicInfoData',
    setIsSavedGlobal: setIsSavedGlobal
  });
  const personalInfoActionBtns = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: personalInfoForm,
    id: paramsEmployeeId,
    target: 'personalInfoData',
    setIsSavedGlobal: setIsSavedGlobal
  });
  const bankInfoActionBtns = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: bankInformationForm,
    id: paramsEmployeeId,
    target: 'bankInformationData',
    setIsSavedGlobal: setIsSavedGlobal
  });
  const emergencyContactActionBtns = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: emergencyContactForm,
    id: paramsEmployeeId,
    target: 'emergencyContactData',
    setIsSavedGlobal: setIsSavedGlobal
  });
  const attendanceAndDepartureInfoActionBtns = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: attendanceAndDepartureInfoForm,
    id: paramsEmployeeId,
    target: 'attendanceAndDepartureInfoData',
    setIsSavedGlobal: setIsSavedGlobal
  });
  const salaryCalculationSystemActionBtns = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: salaryCalculationSystemForm,
    id: paramsEmployeeId,
    target: 'salaryCalculationSystemData',
    setIsSavedGlobal: setIsSavedGlobal
  });
  const otherSalaryCalculationSystemActionBtns = useActionBtns({
    isSavedInitialValue: isEmployeeDetailsPage,
    form: otherCalculationSystemForm,
    id: paramsEmployeeId,
    target: 'otherCalculationSystemData',
    setIsSavedGlobal: setIsSavedGlobal
  });

  useEffect(() => {
    if (paramsEmployeeId) {
      dispatch(viewEmployee({ id: paramsEmployeeId }));
    }
  }, [dispatch, paramsEmployeeId]);

  const handleEditEmployee = async () => {
    try {
      if (isSavedGlobal) {
        setIsSavedGlobal(false);
        setIsSavedGlobalLoading(false);
        basicActionBtns.handleEdit();
        personalInfoActionBtns.handleEdit();
        bankInfoActionBtns.handleEdit();
        emergencyContactActionBtns.handleEdit();
        attendanceAndDepartureInfoActionBtns.handleEdit();
        salaryCalculationSystemActionBtns.handleEdit();
        otherSalaryCalculationSystemActionBtns.handleEdit();
      } else {
        const data = await Promise.all([
          basicInfoForm.validateFields(),
          personalInfoForm.validateFields(),
          bankInformationForm.validateFields(),
          emergencyContactForm.validateFields(),
          attendanceAndDepartureInfoForm.validateFields(),
          salaryCalculationSystemForm.validateFields(),
          otherCalculationSystemForm.validateFields()
        ]);
        console.log(data);
        setIsSavedGlobalLoading(true);
        if (data) {
          //  console.log(currentEmployee.basicInfoData);
          setTimeout(() => {
            setIsSavedGlobal(true);
            basicActionBtns.handleSave();
            personalInfoActionBtns.handleSave();
            bankInfoActionBtns.handleSave();
            emergencyContactActionBtns.handleSave();
            attendanceAndDepartureInfoActionBtns.handleSave();
            salaryCalculationSystemActionBtns.handleSave();
            otherSalaryCalculationSystemActionBtns.handleSave();
            setIsSavedGlobalLoading(false);
          }, 2000);
        }
      }

      // dispatch(createEmployee(employeeData));
      // navigate('/dashboard/employees');
      // console.log(employeeData);
    } catch (e) {
      const error = e as ValidateErrorEntity<any>;
      console.error(error.errorFields[0].errors[0]);
      message.error(error.errorFields[0].errors[0]);
      return false;
    }
  };

  return (
    <EmployeeForms
      handleEditEmployee={handleEditEmployee}
      basicInfoForm={basicInfoForm}
      personalInfoForm={personalInfoForm}
      bankInformationForm={bankInformationForm}
      emergencyContactForm={emergencyContactForm}
      attendanceAndDepartureInfoForm={attendanceAndDepartureInfoForm}
      salaryCalculationSystemForm={salaryCalculationSystemForm}
      otherCalculationSystemForm={otherCalculationSystemForm}
      basicActionBtns={basicActionBtns}
      personalInfoActionBtns={personalInfoActionBtns}
      bankInfoActionBtns={bankInfoActionBtns}
      emergencyContactActionBtns={emergencyContactActionBtns}
      attendanceAndDepartureInfoActionBtns={attendanceAndDepartureInfoActionBtns}
      salaryCalculationSystemActionBtns={salaryCalculationSystemActionBtns}
      otherSalaryCalculationSystemActionBtns={otherSalaryCalculationSystemActionBtns}
      isSavedGlobal={isSavedGlobal}
      isSavedGlobalLoading={isSavedGlobalLoading}
    />
  );
}

export default EmployeeDetails;
