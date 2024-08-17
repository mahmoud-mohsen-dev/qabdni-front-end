import { Dropdown, message, Modal } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

function DotsMenu({
  titleDeleteMessageConfirm,
  contentDeleteMessageConfirm,
  items = [],
  handleDelete
}: {
  titleDeleteMessageConfirm: string;
  contentDeleteMessageConfirm: string;
  items?: { key: string; label: JSX.Element }[];
  handleDelete: () => void;
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
        handleDelete();
        message.success('Item deleted successfully');
      },
      onCancel() {
        message.info('Operation Canceled');
      }
    });
  };

  const itemsArr = [
    ...[
      {
        key: '1',
        label: (
          <button
            onClick={showDeleteConfirm}
            className="flex items-center justify-center gap-2 text-red/accent outline-none focus:outline-none"
          >
            <span>Delete</span>
            <span>
              <img src="/images/trash-icon.svg" alt="trash icon" className="h-5 w-5" />
            </span>
          </button>
        )
      }
    ],
    ...items
  ];

  return (
    <Dropdown
      menu={{
        items: itemsArr
      }}
      trigger={['click']}
      placement="bottomRight"
    >
      <button className="outline-none focus:outline-none">
        <BsThreeDotsVertical />
      </button>
    </Dropdown>
  );
}

export default DotsMenu;
