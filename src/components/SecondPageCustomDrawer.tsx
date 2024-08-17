import { Drawer } from 'antd';
// import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Btn from './Btn';

interface CustomDrawerType {
  title: string;
  isFirstDrawer?: boolean;
  handleCloseDrawer: () => void;
  handleSaveDrawer: () => void;
  isOpened: boolean;
  loading: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}

function SecondPageCustomDrawer({
  title,
  handleCloseDrawer,
  handleSaveDrawer,
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
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onCloseDrawer()} className="focus:outline-none">
              <FaArrowAltCircleLeft size={28} className="text-gray/darkest" />
            </button>
            <h2 className={`text-center font-Libre text-3xl font-semibold text-other/black&blue-normal`}>{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Btn
              onClick={onCloseDrawer}
              color="blueAccent"
              size="none"
              className="rounded-full px-[36px] py-[8px] ring-blue/normal ring-offset-1 hover:ring-1"
            >
              Cancel
            </Btn>
            <Btn
              onClick={handleSaveDrawer}
              type="submit"
              size="none"
              className="ml-2 rounded-lg px-[36px] py-[8px] ring-blue/normal ring-offset-1 hover:ring-1"
            >
              Save
            </Btn>
          </div>
        </div>
      }
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
          paddingBottom: 20,
          paddingTop: 32,
          paddingInline: 40
        }
      }}
    >
      <button
        className="absolute left-0 top-1/2 z-50 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray/ultralight focus:outline-none"
        onClick={onCloseDrawer}
      >
        <img src="/images/chevron-right.svg" alt="chevron right" />
      </button>

      {children}
    </Drawer>
  );
}

export default SecondPageCustomDrawer;
