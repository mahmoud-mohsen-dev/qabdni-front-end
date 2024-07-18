import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { IconType } from 'react-icons';

interface PasswordInputType {
  id?: string;
  placeHolder: string;
  prefix?: React.ReactElement<IconType>;
  className?: string;
}

const PasswordInput = ({ id, placeHolder, prefix, className }: PasswordInputType) => {
  return (
    <Input.Password
      placeholder={placeHolder}
      id={id}
      prefix={prefix}
      className={className}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    />
  );
};

export default PasswordInput;
