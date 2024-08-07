import { useState } from 'react';

const useActionBtns = (initialValue = false) => {
  const [isSaved, setIsSaved] = useState<boolean>(initialValue);
  const [appliedGlobalSettings, setAppliedGlobalSettings] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
    }, 1000);
  };

  const handleCancel = () => {
    setIsLoading(false);
    setIsSaved(true);
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
