import { FaPlus } from 'react-icons/fa6';

function BtnAddNewRow({
  onClick,
  className,
  hideText = false,
  size = 14
}: {
  onClick: () => void;
  className?: string;
  hideText?: boolean;
  size?: number; // default size is 14px
}) {
  return (
    <button className={`flex items-center gap-2 focus:outline-none ${className}`} onClick={onClick}>
      <span className="rounded-full bg-indigo/accent p-2 text-indigo/ultralight transition-colors duration-150 hover:bg-indigo/normal active:bg-indigo/accent">
        <FaPlus size={size} />
      </span>
      {hideText ? null : <span className="text-sm font-medium text-other/black&blue-normal">Add New Row</span>}
    </button>
  );
}

export default BtnAddNewRow;
