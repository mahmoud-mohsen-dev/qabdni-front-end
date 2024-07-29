import { Dropdown, message, Modal } from 'antd';
// import Button from './Button';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import { DeleteOutlined } from '@ant-design/icons';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const showDeleteConfirm = () => {
  confirm({
    title: 'Delete Employee',
    icon: <ExclamationCircleFilled />,
    content: 'Are you sure to delete this employee?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    autoFocusButton: null,
    style: { top: '30%' },
    onOk() {
      message.success('Item deleted successfully');
    },
    onCancel() {
      message.info('Operation Canceled');
    }
  });
};

const items = [
  {
    key: '1',
    label: (
      // <Popconfirm
      //   placement="leftTop"
      //   title="Delete Employee"
      //   description="Are you sure to delete this employee?"
      //   okText="Yes"
      //   cancelText="No"
      //   icon={<img src="/public\images\trash-icon.svg" alt="trash icon" className="mr-[8px] h-5 w-5" />}
      //   onConfirm={() =>
      //     new Promise((resolve) => {
      //       setTimeout(() => resolve(null), 1000);
      //     }).then(() => message.success('Item deleted successfully'))
      //   }
      //   onCancel={() => message.info('Operation Canceled')}
      // >
      //   <p className="flex items-center justify-center gap-2 text-red/accent">
      //     <span>Delete</span>
      //     <span>
      //       <img src="/public\images\trash-icon.svg" alt="trash icon" className="h-5 w-5" />
      //     </span>
      //   </p>
      // </Popconfirm>
      // <Button onClick={showDeleteConfirm}>t</Button>
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
];

function DotsMenu() {
  return (
    <Dropdown
      menu={{
        items: items
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
