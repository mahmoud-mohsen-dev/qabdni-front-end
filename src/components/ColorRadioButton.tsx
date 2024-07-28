import { v4 } from 'uuid';
import { FiveColorsType } from '../types';

interface ColorRadioButtonType {
  name: FiveColorsType;
  value: FiveColorsType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const colorObj = {
  indigo: 'after:bg-indigo/light',
  orange: 'after:bg-orange/light',
  blue: 'after:bg-blue/light',
  green: 'after:bg-green/light',
  pink: 'after:bg-pink/light'
};

function ColorRadioButton({ name, value, onChange }: ColorRadioButtonType) {
  const id = `color-radio-button-${name}-${v4()}`;
  return (
    <label htmlFor={id} className="radio-color-label">
      <input
        className="radio-input"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={value === name}
      />
      <span className={`custom-radio ${colorObj[name]}`} />
      {''}
    </label>
  );
}

export default ColorRadioButton;
