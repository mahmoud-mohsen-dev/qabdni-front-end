import { Spin } from 'antd';
import { ImSpinner2 } from 'react-icons/im';

function Loader() {
  return (
    <div className="grid min-h-[calc(100vh-40px)] w-full place-items-center">
      <Spin indicator={<ImSpinner2 style={{ fontSize: 80 }} className="animate-spin" />} />
    </div>
  );
}

export default Loader;
