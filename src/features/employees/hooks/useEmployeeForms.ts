import { useForm } from 'antd/es/form/Form';
import {
  attendanceAndDepartureInfoDataType,
  bankInformationDataType,
  basicInfoFormType,
  emergencyContactDataType,
  OtherCalculationSystemDataType,
  personalInfoFormType,
  salaryCalculationSystemDataType
} from '../../../types';

const useEmployeeForms = () => {
  const [basicInfoForm] = useForm<basicInfoFormType>();
  const [personalInfoForm] = useForm<personalInfoFormType>();
  const [bankInformationForm] = useForm<bankInformationDataType>();
  const [emergencyContactForm] = useForm<emergencyContactDataType>();
  const [attendanceAndDepartureInfoForm] = useForm<attendanceAndDepartureInfoDataType>();
  const [salaryCalculationSystemForm] = useForm<salaryCalculationSystemDataType>();
  const [otherCalculationSystemForm] = useForm<OtherCalculationSystemDataType>();

  return {
    basicInfoForm,
    personalInfoForm,
    bankInformationForm,
    emergencyContactForm,
    attendanceAndDepartureInfoForm,
    salaryCalculationSystemForm,
    otherCalculationSystemForm
  };
};

export default useEmployeeForms;
