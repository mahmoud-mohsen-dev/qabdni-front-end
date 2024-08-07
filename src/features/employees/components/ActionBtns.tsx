import { FaRegPenToSquare } from 'react-icons/fa6';
import { HiMiniXMark } from 'react-icons/hi2';
import { IoIosSave } from 'react-icons/io';
import { MdSync } from 'react-icons/md';
import Btn from '../../../components/Btn';
import type { FormInstance } from 'antd';
import { GoDotFill } from 'react-icons/go';

interface ActionBtnsType {
  children: React.ReactNode;
  global?: boolean;
  isSaved: boolean;
  onlyGlobal?: boolean;
  appliedGlobalSettings?: boolean;
  handleOnlyGlobal?: () => void;
  handleGlobal?: () => void;
  handleEdit: () => void;
  handleCancel: () => void;
  form: FormInstance<unknown>;
}

function ActionBtns({
  children,
  isSaved = true,
  handleGlobal = () => {},
  handleCancel,
  handleEdit,
  global,
  handleOnlyGlobal,
  onlyGlobal = false,
  appliedGlobalSettings = false,
  form
}: ActionBtnsType) {
  const styles = `text-sm font-medium text-gray/darkest`;
  const iconSize = 18;

  const onCancel = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      {children}
      <div className="mb-4 flex items-center gap-4">
        {onlyGlobal ? (
          appliedGlobalSettings ? (
            <Btn color="greenOutline" className={`${styles}`} type="button" size="none" onClick={handleOnlyGlobal}>
              {/* <MdSync size={iconSize} /> */}
              <GoDotFill size={iconSize} />
              Synced With Global Settings
            </Btn>
          ) : (
            <Btn color="none" className={`${styles}`} type="button" size="none" onClick={handleOnlyGlobal}>
              <MdSync size={iconSize} />
              Apply Global Settings
            </Btn>
          )
        ) : isSaved ? (
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
            <Btn color="none" className={`${styles}`} type="button" size="none" onClick={onCancel}>
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

export default ActionBtns;