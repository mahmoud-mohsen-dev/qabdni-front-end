// import { DivOrString } from '../types';
import { ReactNode } from 'react';
// import { IconType } from 'react-icons';

const colors = {
  orange: 'bg-orange/normal text-black/dark',
  green: 'bg-green/accent text-green/ultralight',
  blue: 'bg-blue/normal text-white hover:bg-blue/accent',
  blueAccent: 'bg-blue/ultralight text-blue/normal',
  blueDark: 'bg-blue/accent text-white',
  indigo: 'bg-indigo/accent text-white',
  purpleAccent: 'bg-purple/ultralight text-purple/normal',
  purple: 'bg-purple/normal text-white'
};

const paddingSizes = {
  '2xs': 'p-2.5 ',
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
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  styles?: string;
}

function Button({ children, color = 'blue', paddingSize = 'xs', fontSize = 'md', onClick, styles }: ButtonType) {
  return (
    <button
      className={`flex justify-center gap-2 rounded-lg ring-1 focus:outline-none focus:ring-blue/light [&>i]:w-6 ${fontSizes[fontSize]} ${paddingSizes[paddingSize]} ${colors[color]} ${styles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
