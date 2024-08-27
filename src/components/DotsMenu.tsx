import { Dropdown, message, Modal } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';

const { confirm } = Modal;

function DotsMenu({
  titleDeleteMessageConfirm,
  contentDeleteMessageConfirm,
  isDayOff = null,
  isPageWorkPlan = false,
  enbaleEdit = false,
  enableDayOff = false,
  handleDotMenu,
  handleEdit = () => {},
  handleDayOff = () => {}
}: {
  titleDeleteMessageConfirm: string;
  contentDeleteMessageConfirm: string;
  isPageWorkPlan?: boolean;
  isDayOff?: boolean | null;
  enbaleEdit?: boolean;
  enableDayOff?: boolean;
  handleEdit?: () => void;
  handleDayOff?: () => void;
  // items?: { key: string; label: JSX.Element }[];
  handleDotMenu: () => void;
}) {
  const showDeleteConfirm = () => {
    confirm({
      title: titleDeleteMessageConfirm,
      icon: <ExclamationCircleFilled />,
      content: contentDeleteMessageConfirm,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      autoFocusButton: null,
      style: { top: '30%' },
      onOk() {
        handleDotMenu();
        isPageWorkPlan ? message.success('Item cleared successfully') : message.success('Item deleted successfully');
      },
      onCancel() {
        message.info('Operation Canceled');
      }
    });
  };

  const editItem = enbaleEdit
    ? [
        {
          key: '2',
          label: (
            <button
              onClick={handleEdit}
              className={`flex w-full items-center justify-between text-blue/accent outline-none focus:outline-none`}
            >
              <span>Edit</span>
              <span>
                <FaRegPenToSquare size={16} />
              </span>
            </button>
          )
        }
      ]
    : [];

  const dayOffItem = enableDayOff
    ? [
        {
          key: '3',
          label: (
            <button
              onClick={handleDayOff}
              className={`flex w-full items-center justify-between gap-5 text-orange/accent outline-none focus:outline-none`}
            >
              <span>Set {isDayOff ? 'Day On' : 'Day Off'}</span>
              <span>
                <FaCalendar size={16} />
              </span>
            </button>
          )
        }
      ]
    : [];

  const itemsArr = [
    {
      key: '1',
      label: (
        <button
          onClick={showDeleteConfirm}
          className="flex w-full items-center justify-between gap-2 text-red/accent outline-none focus:outline-none"
        >
          <span>{isPageWorkPlan ? 'Clear' : 'Delete'}</span>
          <span>
            {isPageWorkPlan ? (
              <GrPowerReset size={16} />
            ) : (
              <img src="/images/trash-icon.svg" alt="trash icon" className="h-5 w-5" />
            )}
          </span>
        </button>
      )
    },
    ...editItem,
    ...dayOffItem
  ];

  return (
    <Dropdown
      menu={{
        items: itemsArr
      }}
      trigger={['click']}
      placement="bottomRight"
      className={`${isDayOff ? 'is-day-off' : ''}`}
    >
      <button className="outline-none focus:outline-none" type="button">
        <BsThreeDotsVertical />
      </button>
    </Dropdown>
  );
}

export default DotsMenu;
