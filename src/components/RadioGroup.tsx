import { createContext, useContext, useState, ReactNode, ChangeEvent } from 'react';

// Create context
interface RadioGroupContextProps {
  selectedValue: string;
  disabled: boolean;
  handleChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(undefined);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('useRadioGroup must be used within a RadioGroup');
  }
  return context;
};

// RadioGroup component
interface RadioGroupProps {
  children: ReactNode;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const RadioGroup = ({ children, className = '', defaultValue, disabled = false, onChange }: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioGroupContext.Provider value={{ selectedValue, handleChange, disabled }}>
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

interface RadioButtonType {
  label?: string;
  value: string;
  children?: ReactNode;
}

function RadioButton({ value, children = '' }: RadioButtonType) {
  const { selectedValue, handleChange, disabled } = useRadioGroup();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    handleChange(e.target.value);
  };

  return (
    <label className={`radio-color-label radio-group capitalize ${disabled ? 'disabled' : ''}`}>
      <input
        className={`radio-input`}
        type="radio"
        value={value}
        onChange={onChange}
        checked={selectedValue === value}
        disabled={disabled}
      />
      <span
        className={`custom-radio ${disabled ? (selectedValue === value ? 'after:bg-gray-200' : 'bg-[rgb(0,0,0,0.04)]') : selectedValue === value ? 'after:bg-indigo/accent' : 'after:bg-white'}`}
      />
      {children}
    </label>
  );
}

export { RadioGroup, RadioButton };
