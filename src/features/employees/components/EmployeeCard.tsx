import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import StatusTag from './StatusTag';
import DotsMenu from '../../../components/DotsMenu';
import { isoToDate } from '../../../utils/date';
import { IoMdMail } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa6';
import Btn from '../../../components/Btn';

interface EmployeeCardType {
  employee: {
    imageUrl: string;
    name: string;
    position: string;
    status: 'active' | 'remote' | 'onHoliday' | 'terminated' | '';
    department: string;
    dateOfJoining: string;
    email: string;
    phone: string;
  };
}

function EmployeeCard({ employee }: EmployeeCardType) {
  const { imageUrl, name, position, status, department, dateOfJoining, email, phone } = employee;
  console.log(employee);
  const normalizedStatus = status.normalize();
  let resStatus;
  switch (normalizedStatus) {
    case 'active' || 'remote' || 'onHoliday' || 'terminated':
      resStatus = normalizedStatus;
      break;
    default:
      resStatus = '';
      break;
  }
  return (
    <div className="rounded-[20px] border border-gray/light p-6">
      <div className="flex items-center justify-end gap-2">
        <StatusTag status={status}>{resStatus}</StatusTag>
        <DotsMenu />
      </div>

      {/* Profile Name and Image */}
      <div className="mt-2 flex gap-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="profile_photo"
            className="h-[70px] w-[70px]"
            style={{
              border: '2px solid #979797',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: '50% 50%'
            }}
          />
        ) : (
          <Avatar size={70} icon={<UserOutlined />} style={{ border: '1px solid #979797' }} />
        )}

        <div className="flex flex-col items-start justify-center">
          <h3 className="text-xl font-medium">{name ? name : 'Not Valid'}</h3>
          <h4 className="text-base font-medium">{position ? position : 'Not Valid'}</h4>
        </div>
      </div>

      <div className="mt-5 flex justify-between pr-5">
        <div className="flex flex-col gap-2">
          <span className="font-mullish text-xs font-normal uppercase text-gray/darkest">Department</span>
          <span className="font-mullish text-sm font-medium">{department ? department : 'Not Specified'}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mullish text-xs font-normal uppercase text-gray/darkest">Date of joining</span>
          <span className="font-mullish text-sm font-medium">
            {dateOfJoining ? isoToDate(dateOfJoining) : '-- / -- / ----'}
          </span>
        </div>
      </div>

      {/* Email and Phone Number */}
      <div className="mt-5 rounded-2xl bg-gray/ultralight p-4">
        <div className="flex items-center gap-3 border-b border-gray/light pb-3">
          <IoMdMail className="text-gray/normal" />
          <p className="text-sm font-medium">{email ? email : 'Email address was not provided.'}</p>
        </div>
        <div className="flex items-center gap-3 pt-3">
          <FaPhone className="text-gray/normal" />
          <p className="text-sm font-medium">{phone ? phone : 'Phone number was not provided.'}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex justify-between gap-3">
        <Btn color="blueAccent" size="lg" className="w-full rounded-lg">
          Records
        </Btn>
        <Btn size="lg" className="w-full">
          Details
        </Btn>
      </div>
    </div>
  );
}

export default EmployeeCard;
