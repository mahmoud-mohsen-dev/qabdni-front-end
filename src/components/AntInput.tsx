import { Input } from 'antd';

interface AntInputType {
  placeHolder: string;
  id?: string;
}

function AntInput({ placeHolder, id }: AntInputType) {
  return <Input placeholder={placeHolder} id={id} />;
}

export default AntInput;
