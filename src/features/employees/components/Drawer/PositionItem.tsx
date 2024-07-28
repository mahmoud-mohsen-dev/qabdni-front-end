import { useState } from 'react';
import ColorRadioButton from '../../../../components/ColorRadioButton';
import { FiveColorsType } from '../../../../types';
import Btn from '../../../../components/Btn';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { removePositionTemp } from '../../../../store/positionsReducer';

const bgColor = {
  indigo: 'bg-indigo/light',
  orange: 'bg-orange/light',
  blue: 'bg-blue/light',
  green: 'bg-green/light',
  pink: 'bg-pink/light'
};

function PositionItem({
  name,
  color = 'indigo',
  index,
  length
}: {
  name: string;
  color: FiveColorsType;
  index: number;
  length: number;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = useState<FiveColorsType>(color);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setValue(name as FiveColorsType);
  };
  return (
    <div
      className={`flex items-center justify-between ${index < length - 1 ? (index === 0 ? 'border-b border-dashed border-gray/light pb-4' : 'border-b border-dashed border-gray/light py-4') : 'pt-4'}`}
    >
      <div
        className={`flex items-center justify-center rounded-full px-4 py-2 text-sm font-normal uppercase text-other/black ${bgColor[value]}`}
      >
        {name}
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="flex gap-3">
          <ColorRadioButton name="indigo" value={value} onChange={onChange} />
          <ColorRadioButton name="orange" value={value} onChange={onChange} />
          <ColorRadioButton name="blue" value={value} onChange={onChange} />
          <ColorRadioButton name="green" value={value} onChange={onChange} />
          <ColorRadioButton name="pink" value={value} onChange={onChange} />
        </div>
        <Btn
          color="redOutline"
          size="sm"
          className="rounded-xl font-mullish text-xs font-semibold uppercase"
          onClick={() => dispatch(removePositionTemp({ name }))}
        >
          Delete
        </Btn>
      </div>
    </div>
  );
}

export default PositionItem;
