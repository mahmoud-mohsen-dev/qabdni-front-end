import { FaPlus } from 'react-icons/fa6';

function BtnAddNewRow({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button className={`flex items-center gap-2 focus:outline-none ${className}`} onClick={onClick}>
      <span className="rounded-full bg-indigo/accent p-2 text-indigo/ultralight">
        <FaPlus />
      </span>
      <span className="text-sm font-medium text-other/black&blue-normal">Add New Row</span>
    </button>
  );
}

export default BtnAddNewRow;
