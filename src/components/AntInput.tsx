import { Input } from 'antd';
import { IconType } from 'react-icons';

interface AntInputType {
  placeHolder: string;
  id?: string;
  prefix?: React.ReactElement<IconType>;
  suffix?: React.ReactElement<IconType>;
  className?: string;
  type?: string;
}

function AntInput({
  placeHolder,
  id,
  prefix: PrefixIcon,
  suffix: SuffixIcon,
  className = '',
  type = 'text'
}: AntInputType) {
  return (
    <Input
      placeholder={placeHolder}
      id={id}
      prefix={PrefixIcon}
      type={type}
      suffix={SuffixIcon}
      className={className}
    />
  );
}

export default AntInput;
