// import { DivOrString } from '../types';
import { ReactNode } from 'react';
// import { IconType } from 'react-icons';

const colors = {
  orange: 'bg-orange/normal text-black/dark',
  green: 'bg-green/accent text-green/ultralight',
  blue: 'bg-blue/normal text-white hover:bg-blue/accent',
  blueAccent: 'bg-blue/ultralight text-blue/normal active:opacity-[0.70] hover:shadow-none active:text-blue/medium',
  blueDark: 'bg-blue/accent text-white',
  indigo: 'bg-indigo/accent text-white',
  purpleAccent: 'bg-purple/ultralight text-purple/normal',
  purple: 'bg-purple/normal text-white',
  black: 'text-other/black hover:shadow-none'
};

const paddingSizes = {
  '2xs': 'px-2.5 ',
  xs: 'p-2.5',
  sm: 'px-6 py-2.5',
  md: 'px-9 py-2.5',
  lg: 'px-12 py-2.5',
  xl: 'px-[76px] py-2.5',
  '2xl': 'py-2.5 w-full'
};

const fontSizes = {
  '2xs': 'text-xs',
  xs: 'text-sm',
  sm: 'text-lg',
  md: 'text-base',
  lg: 'text-base',
  xl: 'text-base',
  '2xl': 'ext-base'
};

interface ButtonType {
  children: ReactNode;
  color?: keyof typeof colors;
  paddingSize?: keyof typeof paddingSizes;
  fontSize?: keyof typeof fontSizes; // '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  children,
  color = 'blue',
  paddingSize = 'xs',
  fontSize = 'md',
  onClick,
  className = '',
  type = 'button'
}: ButtonType) {
  return (
    <button
      type={type}
      className={`hover:shadow-btnHover flex cursor-pointer items-center justify-center gap-2 rounded-lg outline-none transition-all duration-150 focus:outline-none active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&>i]:w-6 ${fontSizes[fontSize]} ${paddingSizes[paddingSize]} ${colors[color]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
