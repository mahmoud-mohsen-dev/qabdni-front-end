import { useState } from 'react';

const useDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const showLoading = () => {
    showDrawer();
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return { openDrawer, loading, showDrawer, closeDrawer, showLoading };
};

export default useDrawer;
