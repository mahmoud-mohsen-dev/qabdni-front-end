import { message } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import EmployeeForms from '../components/CreateEmployees/EmployeeForms';
import useEmployeeForms from '../hooks/useEmployeeForms';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentEmployee } from '../store/employeesSlice';

// interface CreateEmployeeProps {
//   // isEmployeeDetailsPage?: boolean;
// }

function CreateEmployee() {
  // const {
  //   basicInfoData,
  //   personalInfoData,
  //   bankInformationData,
  //   emergencyContactData,
  //   attendanceAndDepartureInfoData,
  //   salaryCalculationSystemData,
  //   otherCalculationSystemData,
  //   earlyArrivalData,
  //   earlyDepartureData,
  //   lateArrivalData,
  //   lateDepartureData,
  //   leavesTableData
  // } = useSelector((state: RootState) => {
  //   return state.employees.currentEmployee;
  // });

  // const { avatarInfo, id: storeId, ...basicInfoRestData } = basicInfoData;
  // console.log(storeId);
  const employeeId = '01';
  const dispatch = useDispatch();
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

  useEffect(() => {
    // basicInfoForm.setFieldsValue({ ...basicInfoRestData });
    dispatch(updateCurrentEmployee({ target: 'basicInfoData', data: { id: employeeId } }));
  }, []);

  const handleCreateEmployee = async () => {
    try {
      const [
        resBasicInfoData
        // resPersonalInfoData,
        // resBankInformationData,
        // resEmergencyContactData,
        // resAttendanceAndDepartureInfoData,
        // resSalaryCalculationSystemData,
        // resOtherCalculationSystemData
      ] = await Promise.all([
        basicInfoForm.validateFields()
        // personalInfoForm.validateFields(),
        // bankInformationForm.validateFields(),
        // emergencyContactForm.validateFields(),
        // attendanceAndDepartureInfoForm.validateFields(),
        // salaryCalculationSystemForm.validateFields(),
        // otherCalculationSystemForm.validateFields()
      ]);
      console.log(
        resBasicInfoData
        // resPersonalInfoData,
        // resBankInformationData,
        // resEmergencyContactData,
        // resAttendanceAndDepartureInfoData,
        // resSalaryCalculationSystemData,
        // resOtherCalculationSystemData
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
      employeeIdCreateProps={employeeId}
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
