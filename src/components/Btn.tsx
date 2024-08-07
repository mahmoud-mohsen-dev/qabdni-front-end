import { ReactNode } from 'react';
// import { IconType } from 'react-icons';

const colors = {
  orange: 'bg-orange/normal text-black/dark rounded-lg',
  green: 'bg-green/accent text-green/ultralight rounded-lg',
  greenOutline: 'bg-white text-green/accent rounded-lg hover:shadow-none',
  blue: 'bg-blue/normal text-white hover:bg-blue/accent rounded-lg',
  redOutline: 'border-red/normal border text-red/normal hover:bg-red/accent hover:text-white rounded-lg',
  blueAccent: 'bg-blue/ultralight text-blue/normal active:opacity-[0.70] hover:shadow-none active:text-blue/medium',
  blueDark: 'bg-blue/accent text-white rounded-lg',
  indigo: 'bg-indigo/accent text-white rounded-lg',
  purpleAccent: 'bg-purple/ultralight text-purple/normal rounded-lg',
  purple: 'bg-purple/normal text-white rounded-lg',
  black: 'bg-other/black text-white hover:shadow-none rounded-lg',
  none: 'text-other/black hover:shadow-none'
};

const paddingSizes = {
  none: '',
  '2xs': 'px-[10px] ',
  xs: 'px-[10px] py-[4px]',
  sm: 'px-[16px] py-[6px]',
  md: 'px-[24px] py-[10px]',
  lg: 'px-[47px] py-[5.5px]',
  xl: 'px-[76px] py-[10px]',
  full: 'w-full py-[10px]'
};

const fontSizes = {
  none: '',
  '2xs': 'text-xs',
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-base',
  lg: 'text-base',
  xl: 'text-base',
  full: 'text-lg'
};

interface ButtonType {
  children: ReactNode;
  color?: keyof typeof colors;
  size?: keyof typeof paddingSizes; // '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

function Btn({ children, color = 'blue', size = 'sm', onClick, className = '', type = 'button' }: ButtonType) {
  return (
    <button
      type={type}
      className={`flex h-min cursor-pointer items-center justify-center gap-2 outline-none transition-all duration-150 hover:shadow-btnHover focus:outline-none active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&>i]:w-6 ${fontSizes[size]} ${paddingSizes[size]} ${colors[color]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Btn;
