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

type StatusType = 'active' | 'remote' | 'on holiday' | 'terminated' | '';
interface StatusTagType {
  status: StatusType | null;
  className?: string;
  children: string;
}

function StatusTag({ status, className = '', children }: StatusTagType) {
  // const normalizedStatus = status?.normalize() ?? 'not valid';
  let color;
  switch (status) {
    case 'active':
    case 'remote':
    case 'terminated':
      color = colors[statuses[status]];
      break;
    case 'on holiday':
      color = colors[statuses['onHoliday']];
      break;
    default:
      color = 'bg-other/black text-white';
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
