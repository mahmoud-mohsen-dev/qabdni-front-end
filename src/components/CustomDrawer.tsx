import { Drawer, Space } from 'antd';
import Btn from './Btn';

interface CustomDrawerType {
  title: string;
  handleCloseDrawer: () => void;
  handleSave: () => void;
  isOpened: boolean;
  loading: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}

function CustomDrawer({
  title,
  handleSave,
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

  const SaveChanges = () => {
    closeDrawer();
    handleSave();
  };

  return (
    <Drawer
      title={<h2 className="font-Libre text-3xl font-semibold text-other/black&blue-normal">{title}</h2>}
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
          borderBottom: '1px solid #E0E4EA'
        },
        body: {
          paddingBottom: 40,
          paddingInline: 40
        }
      }}
      extra={
        <Space>
          <Btn
            onClick={onCloseDrawer}
            color="blueAccent"
            size="none"
            className="rounded-full px-[36px] py-[8px] ring-blue/normal ring-offset-1 hover:ring-1"
          >
            Cancel
          </Btn>
          <Btn
            onClick={SaveChanges}
            type="submit"
            size="none"
            className="ml-2 rounded-lg px-[36px] py-[8px] ring-blue/normal ring-offset-1 hover:ring-1"
          >
            Save
          </Btn>
        </Space>
      }
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

export default CustomDrawer;
