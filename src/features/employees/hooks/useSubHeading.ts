import { useState } from 'react';

const useSubHeading = (initialValue = false) => {
  const [isSaved, setIsSaved] = useState<boolean>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsSaved(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsLoading(false);
    setIsSaved(true);
  };

  const handleGlobal = () => {
    setIsLoading(false);
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
    setIsLoading(false);
  };

  return { isSaved, handleCancel, handleSave, handleEdit, handleGlobal, isLoading };
};

export default useSubHeading;
