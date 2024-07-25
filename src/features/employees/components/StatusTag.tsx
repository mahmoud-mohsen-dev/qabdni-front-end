const colors = {
  green: 'text-green/accent bg-green/ultralight',
  indigo: 'text-indigo/accent bg-indigo/ultralight',
  blue: 'text-blue/accent bg-blue/ultralight',
  orange: 'text-orange/accent bg-orange/ultralight'
};

const statuses = {
  active: 'green',
  remote: 'indigo',
  onHoliday: 'blue',
  terminated: 'orange'
} as const;

type StatusType = 'active' | 'remote' | 'onHoliday' | 'terminated' | '';
interface StatusTagType {
  status: StatusType;
  className?: string;
  children: string;
}

function StatusTag({ status, className = '', children }: StatusTagType) {
  const normalizedStatus = status.normalize();
  let color;
  switch (normalizedStatus) {
    case 'active' || 'remote' || 'onHoliday' || 'terminated':
      color = colors[statuses[normalizedStatus]];
      break;
    default:
      color = '';
      break;
  }
  return (
    <div
      className={`w-fit rounded-xl px-[14px] py-1 font-mullish text-xs font-semibold uppercase tracking-wide ${color} ${className}`}
    >
      {children}
    </div>
  );
}

export default StatusTag;
