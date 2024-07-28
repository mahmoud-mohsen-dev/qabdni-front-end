import { FaRegPenToSquare } from 'react-icons/fa6';
import { HiMiniXMark } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { useState } from 'react';
import { MdSync } from 'react-icons/md';
import Btn from '../../../../components/Btn';

interface SubHeadingType {
  children: string;
  global?: boolean;
}

function SubHeading({ children, global }: SubHeadingType) {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="font-Libre text-[20px] font-semibold text-other/black">{children}</h2>
      <div className="flex items-center gap-4">
        {!isEditable ? (
          <Btn
            color="none"
            className="font-medium text-gray/darkest"
            fontSize="xs"
            paddingSize="none"
            onClick={() => setIsEditable(true)}
          >
            <FaRegPenToSquare size={16} />
            Edit
          </Btn>
        ) : (
          <>
            {global && (
              <Btn
                color="none"
                className="font-medium text-gray/darkest"
                fontSize="xs"
                paddingSize="none"
                onClick={() => setIsEditable(false)}
              >
                <MdSync size={16} />
                Apply global settings
              </Btn>
            )}
            <Btn
              color="none"
              className="font-medium text-gray/darkest"
              fontSize="xs"
              paddingSize="none"
              onClick={() => setIsEditable(false)}
            >
              <HiMiniXMark size={16} />
              Cancel
            </Btn>
            <Btn
              color="none"
              className="font-medium text-gray/darkest"
              fontSize="xs"
              paddingSize="none"
              onClick={() => setIsEditable(false)}
            >
              <IoIosSave size={16} />
              Save
            </Btn>
          </>
        )}
      </div>
    </div>
  );
}

export default SubHeading;
