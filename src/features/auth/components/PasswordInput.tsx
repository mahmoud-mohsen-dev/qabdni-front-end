import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';

interface PasswordInputType {
  id?: string;
  placeHolder: string;
}

const PasswordInput = ({ id, placeHolder }: PasswordInputType) => {
  return (
    <Input.Password
      placeholder={placeHolder}
      id={id}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  );
};

export default PasswordInput;
