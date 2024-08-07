import { Dropdown, message, Modal } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { basicInfoDataWithImageType } from '../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { deleteEmployee } from '../features/employees/store/employeesSlice';

const { confirm } = Modal;

function DotsMenu({ employee }: { employee: basicInfoDataWithImageType }) {
  // const currentEmployee = useSelector((state: RootState) => state.employees.basicEmployeesData.find(item => item.id === employee.id))
  const dispatch = useDispatch<AppDispatch>();

  const handleEmployeeDelete = () => {
    dispatch(deleteEmployee(employee));
  };

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
        handleEmployeeDelete();
        message.success('Item deleted successfully');
      },
      onCancel() {
        message.info('Operation Canceled');
      }
    });
  };

  return (
    <Dropdown
      menu={{
        items: [
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
        ]
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
