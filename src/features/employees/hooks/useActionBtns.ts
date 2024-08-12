import { message } from 'antd';
import type { FormInstance } from 'antd';
import { useState } from 'react';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { clearCurrentEmployee, editEmployee, viewEmployeeSection } from '../store/employeesSlice';
import { CurrentEmployeeType } from '../../../types';

interface useActionBtnsProps {
  isSavedInitialValue: boolean;
  id?: string | null;
  form: FormInstance<any>;
  target: keyof CurrentEmployeeType;
}

const useActionBtns = ({ isSavedInitialValue = false, id, target, form }: useActionBtnsProps) => {
  const { currentEmployee } = useSelector((state: RootState) => state.employees);
  const [isSaved, setIsSaved] = useState<boolean>(isSavedInitialValue);
  const [appliedGlobalSettings, setAppliedGlobalSettings] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    try {
      await form.validateFields();
      if (id) {
        dispatch(
          // editEmployee({ id, target: 'basicInfoData', subTarget: 'basic', data: currentEmployee.basicInfoData.basic })
          editEmployee({ id, target: target, data: currentEmployee[target] })
        );
      }

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsSaved(true);
      }, 1000);
    } catch (e) {
      const error = e as ValidateErrorEntity<any>;
      console.error(error.errorFields[0].errors[0]);
      message.error(error.errorFields[0].errors[0]);
    }
  };

  const handleCancel = () => {
    try {
      setIsLoading(false);
      setIsSaved(true);
      // console.log(form.getFieldsValue());
      form.resetFields();
      dispatch(clearCurrentEmployee());
      if (id) {
        dispatch(viewEmployeeSection({ id, sectionName: target }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGlobal = () => {
    setIsLoading(false);
    setIsSaved(false);
  };

  const handleOnlyGlobal = () => {
    setAppliedGlobalSettings((prev) => !prev);
  };

  const handleEdit = () => {
    setIsLoading(false);
    setIsSaved(false);
  };

  return {
    isSaved,
    handleCancel,
    handleSave,
    handleEdit,
    handleGlobal,
    isLoading,
    appliedGlobalSettings,
    handleOnlyGlobal
  };
};

export default useActionBtns;
