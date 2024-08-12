import { useEffect } from 'react';
import { viewEmployee } from '../store/employeesSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmployeeForms from '../components/CreateEmployees/EmployeeForms';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { message } from 'antd';
import useEmployeeForms from '../hooks/useEmployeeForms';

function EmployeeDetails() {
  const {
    basicInfoForm,
    personalInfoForm,
    bankInformationForm,
    emergencyContactForm,
    attendanceAndDepartureInfoForm,
    salaryCalculationSystemForm,
    otherCalculationSystemForm
  } = useEmployeeForms();

  const { employeeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (employeeId) {
      dispatch(viewEmployee({ id: employeeId }));
    }
  }, []);

  const handleEditEmployee = async () => {
    try {
      const [
        resBasicInfoData,
        resPersonalInfoData,
        resBankInformationData,
        resEmergencyContactData,
        resAttendanceAndDepartureInfoData,
        resSalaryCalculationSystemData,
        resOtherCalculationSystemData
      ] = await Promise.all([
        basicInfoForm.validateFields(),
        personalInfoForm.validateFields(),
        bankInformationForm.validateFields(),
        emergencyContactForm.validateFields(),
        attendanceAndDepartureInfoForm.validateFields(),
        salaryCalculationSystemForm.validateFields(),
        otherCalculationSystemForm.validateFields()
      ]);
      console.log(
        resBasicInfoData,
        resPersonalInfoData,
        resBankInformationData,
        resEmergencyContactData,
        resAttendanceAndDepartureInfoData,
        resSalaryCalculationSystemData,
        resOtherCalculationSystemData
      );
      // const employeeData: CurrentEmployeeType = {
      //   basicInfoData: { ...basicInfoData, avatarInfo: imageInfo, id: employeeUniqueId, ...resBasicInfoData },
      //   personalInfoData: { ...personalInfoData, ...resPersonalInfoData },
      //   bankInformationData: { ...bankInformationData, ...resBankInformationData },
      //   emergencyContactData: { ...emergencyContactData },
      //   attendanceAndDepartureInfoData: { ...attendanceAndDepartureInfoData, ...resAttendanceAndDepartureInfoData },
      //   salaryCalculationSystemData: { ...salaryCalculationSystemData, ...resSalaryCalculationSystemData },
      //   otherCalculationSystemData: { ...otherCalculationSystemData, ...resOtherCalculationSystemData },
      //   earlyArrivalData: { ...earlyArrivalData, ...earlyArrivalDataSource },
      //   lateArrivalData: { ...lateArrivalDataSource },
      //   earlyDepartureData: { ...lateArrivalData, ...earlyDepartureDataSource },
      //   lateDepartureData: { ...lateDepartureData, ...lateDepartureDataSource },
      //   leavesTableData: [{ ...leavesTableData, ...leavesTableDataSource[0] }]
      // };
      // dispatch(createEmployee(employeeData));
      // navigate('/dashboard/employees');
      // console.log(employeeData);
    } catch (e) {
      const error = e as ValidateErrorEntity<any>;
      console.error(error.errorFields[0].errors[0]);
      message.error(error.errorFields[0].errors[0]);
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
    />
  );
}

export default EmployeeDetails;
