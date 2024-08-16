import { message } from 'antd';
import type { FormInstance } from 'antd';
import { useState } from 'react';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { editEmployee, onCancelEmployeeSection } from '../store/employeesSlice';
import { CurrentEmployeeType } from '../../../types';

interface useActionBtnsProps {
  isSavedInitialValue: boolean;
  id?: string | null;
  form: FormInstance<any>;
  target: keyof CurrentEmployeeType;
  setIsSavedGlobal?: React.Dispatch<React.SetStateAction<boolean>>;
  isSavedGlobalLoading?: boolean;
}

const useActionBtns = ({
  isSavedInitialValue = false,
  id,
  target,
  form,
  setIsSavedGlobal,
  isSavedGlobalLoading = false
}: useActionBtnsProps) => {
  const { currentEmployee } = useSelector((state: RootState) => state.employees);
  const [isSaved, setIsSaved] = useState<boolean>(isSavedInitialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appliedGlobalSettings, setAppliedGlobalSettings] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    try {
      await form.validateFields();

      if (id) {
        dispatch(editEmployee({ id, target: target, data: currentEmployee[target] }));
      }

      console.log(isSavedGlobalLoading);
      setIsLoading(true);
      if (isSavedGlobalLoading) {
        setIsLoading(false);
      }

      setTimeout(() => {
        setIsLoading(false);
        setIsSaved(true);
      }, 1000);
      return true;
    } catch (e) {
      const error = e as ValidateErrorEntity<any>;
      console.error(error.errorFields[0].errors[0]);
      message.error(error.errorFields[0].errors[0]);
      return false;
    }
  };

  const handleCancel = () => {
    try {
      setIsLoading(false);
      setIsSaved(true);
      // console.log(form.getFieldsValue());
      form.resetFields();
      // dispatch(clearCurrentEmployee());
      if (id) {
        dispatch(onCancelEmployeeSection({ id, sectionName: target }));
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
    if (setIsSavedGlobal) {
      setIsSavedGlobal(false);
    }
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
