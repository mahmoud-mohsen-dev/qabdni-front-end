import { FaRegPenToSquare } from 'react-icons/fa6';
import { HiMiniXMark } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { MdSync } from 'react-icons/md';
import Btn from '../../../../components/Btn';

interface SubHeadingType {
  children: string;
  global?: boolean;
  isSaved: boolean;
  handleGlobal?: () => void;
  handleEdit: () => void;
  handleCancel: () => void;
}

function SubHeading({
  children,
  isSaved = true,
  handleGlobal = () => {},
  handleCancel,
  handleEdit,
  global
}: SubHeadingType) {
  const styles = `text-sm font-medium text-gray/darkest`;
  const iconSize = 18;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="font-Libre text-[18px] font-semibold text-other/black">{children}</h2>
      <div className="flex items-center gap-4">
        {isSaved ? (
          <Btn color="none" className={`${styles}`} type="button" size="none" onClick={handleEdit}>
            <FaRegPenToSquare size={iconSize} />
            Edit
          </Btn>
        ) : (
          <>
            {global && (
              <Btn color="none" className={`${styles}`} type="button" size="none" onClick={handleGlobal}>
                <MdSync size={iconSize} />
                Apply Global Settings
              </Btn>
            )}
            <Btn color="none" className={`${styles}`} type="button" size="none" onClick={handleCancel}>
              <HiMiniXMark size={iconSize} />
              Cancel
            </Btn>
            <Btn color="none" className={`${styles}`} type="submit" size="none">
              <IoIosSave size={iconSize} />
              Save
            </Btn>
          </>
        )}
      </div>
    </div>
  );
}

export default SubHeading;
