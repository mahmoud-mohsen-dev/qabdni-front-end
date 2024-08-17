import { Drawer } from 'antd';

interface CustomDrawerType {
  title: string;
  isFirstDrawer?: boolean;
  handleCloseDrawer: () => void;
  isOpened: boolean;
  loading: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}

function FirstPageCustomDrawer({
  title,
  handleCloseDrawer,
  isOpened,
  loading,
  closeDrawer,
  children
}: CustomDrawerType) {
  const onCloseDrawer = () => {
    closeDrawer();
    handleCloseDrawer();
  };

  return (
    <Drawer
      title={<h2 className={`text-center font-Libre text-3xl font-semibold text-other/black&blue-normal`}>{title}</h2>}
      width={720}
      closable={false}
      onClose={onCloseDrawer}
      open={isOpened}
      loading={loading}
      destroyOnClose={true}
      className="drawer"
      styles={{
        header: {
          paddingInline: 40,
          borderBottom: '1px solid #0505050f'
        },
        body: {
          paddingBottom: 40,
          paddingInline: 40
        }
      }}
    >
      <button
        className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray/ultralight focus:outline-none"
        onClick={onCloseDrawer}
      >
        <img src="/images/chevron-right.svg" alt="chevron right" />
      </button>

      {children}
    </Drawer>
  );
}

export default FirstPageCustomDrawer;
