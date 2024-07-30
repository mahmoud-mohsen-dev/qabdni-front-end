import { useState } from 'react';
import ColorRadioButton from '../../../components/ColorRadioButton';
import { FiveColorsType } from '../../../types';
import { Button, message, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';

const bgColor = {
  indigo: 'bg-indigo/light',
  orange: 'bg-orange/light',
  blue: 'bg-blue/light',
  green: 'bg-green/light',
  pink: 'bg-pink/light'
};

function AddedItem({
  name,
  color = 'indigo',
  index,
  length,
  deleteConfirm,
  handleChange
}: {
  name: string;
  color: FiveColorsType;
  index: number;
  length: number;
  deleteConfirm: (name: string) => void;
  handleChange: ({ name, color }: { name: string; color: FiveColorsType }) => void;
}) {
  const [value, setValue] = useState<FiveColorsType>(color);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: radioName } = e.target;
    setValue(radioName as FiveColorsType);
    const updatedValue: { name: string; color: FiveColorsType } = { name, color: radioName as FiveColorsType };
    handleChange(updatedValue);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    deleteConfirm(name);
    message.success('Removed successfully');
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.info('You canceled');
  };
  return (
    <div
      className={`flex items-center justify-between border-dashed border-gray/light py-4 ${index < length - 1 ? 'border-b' : ''}`}
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

        <Popconfirm
          title={`Delete ${name}`}
          description="Are you sure to delete this?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default AddedItem;
