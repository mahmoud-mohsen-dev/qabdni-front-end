import { createContext, useContext, ReactNode, ChangeEvent } from 'react';
import type { FormInstance } from 'antd';

// Create context
interface RadioGroupContextProps {
  form: FormInstance<any>;
  name: string;
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
  form: FormInstance<any>;
  name: string;
  className?: string;
  disabled?: boolean;
  onChange: (value: any) => void;
}

const RadioGroup = ({ children, form, name, className = '', disabled = false, onChange }: RadioGroupProps) => {
  // const [selectedValue, setSelectedValue] = useState(radioValue);

  const handleChange = (value: string) => {
    // setSelectedValue(value);
    onChange(value);
  };

  return (
    <RadioGroupContext.Provider value={{ form, name, handleChange, disabled }}>
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
  const { form, name, handleChange, disabled } = useRadioGroup();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name);
    handleChange(e.target.value);
  };
  return (
    <label className={`radio-color-label radio-group capitalize ${disabled ? 'disabled' : ''}`}>
      <input
        className={`radio-input`}
        type="radio"
        value={value}
        onChange={onChange}
        checked={form.getFieldValue(name) === value}
        disabled={disabled}
      />
      <span
        className={`custom-radio ${disabled ? (form.getFieldValue(name) === value ? 'after:bg-gray-200' : 'bg-[rgb(0,0,0,0.04)]') : form.getFieldValue(name) === value ? 'after:bg-indigo/accent' : 'after:bg-white'}`}
      />
      {children}
    </label>
  );
}

export { RadioGroup, RadioButton };
