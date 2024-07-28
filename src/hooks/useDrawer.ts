import { useState } from 'react';

const useDrawer = () => {
  const [openedDrawer, setOpenedDrawer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const closeDrawer = () => {
    setOpenedDrawer('');
  };

  const showDrawer = (value: string) => {
    setOpenedDrawer(value);
  };

  const showLoading = (value: string) => {
    showDrawer(value);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return { openedDrawer, loading, closeDrawer, showLoading };
};

export default useDrawer;
