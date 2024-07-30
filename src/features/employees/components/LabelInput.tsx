import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface RawInputType {
  title: string;
  description: string;
  isRequired?: boolean;
  tooltip?: null | string;
}

function LabelInput({ title, description, tooltip = null, isRequired = false }: RawInputType) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="font-Libre text-[13px] font-medium uppercase leading-3 text-other/black">
        {title} {isRequired && <span className='font-["SimSun,sans-serif"] text-red/accent'>*</span>}{' '}
        {tooltip && (
          <Tooltip title={tooltip ?? ''}>
            <QuestionCircleOutlined className="text-other/black" />
          </Tooltip>
        )}
      </div>
      <div className="whitespace-normal font-mullish text-xs font-normal capitalize text-gray/darkest">
        {description}
      </div>
    </div>
  );
}

export default LabelInput;
