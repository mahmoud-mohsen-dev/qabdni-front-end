interface EmployeesNumberType {
  color: 'orange' | 'green' | 'blue' | 'indigo';
  value: number;
  text: string;
  styles?: string;
}

interface ColorType {
  orange: string;
  green: string;
  blue: string;
  indigo: string;
}

const barColor: ColorType = {
  orange: 'bg-orange/accent',
  green: 'bg-green/accent',
  blue: 'bg-blue/accent',
  indigo: 'bg-indigo/accent'
};

const bgColor: ColorType = {
  orange: 'bg-orange/ultralight',
  green: 'bg-green/ultralight',
  blue: 'bg-blue/ultralight',
  indigo: 'bg-indigo/ultralight'
};

function EmployeesNumbers({ color, value, text, styles }: EmployeesNumberType) {
  return (
    <div className={`flex items-center justify-start rounded-[20px] px-6 py-6 ${bgColor[color]} ${styles}`}>
      {/* Horizontal Line */}
      <div className={`mr-4 h-full w-[5px] rounded-sm ${barColor[color]}`}></div>
      <div className="flex flex-col gap-2">
        <h2 className="block w-full text-3xl font-semibold">{value}</h2>
        <p className="text-base font-medium capitalize text-gray/darkest">{text}</p>
      </div>
    </div>
  );
}

export default EmployeesNumbers;
