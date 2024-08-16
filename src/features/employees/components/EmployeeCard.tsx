import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import StatusTag from './StatusTag';
import DotsMenu from '../../../components/DotsMenu';
import { IoMdMail } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa6';
import Btn from '../../../components/Btn';
import { basicInfoDataWithImageType } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { capitalizeName } from '../../../utils/user';
import dayjs from 'dayjs';

interface EmployeeCardType {
  employee: basicInfoDataWithImageType;
}

function EmployeeCard({ employee }: EmployeeCardType) {
  const {
    avatarInfo,
    id,
    basic: { fullName, position, status, department, dateOfJoining, email, phone }
  } = employee;
  const navigate = useNavigate();
  // const normalizedStatus = status?.normalize() ?? 'not valid';
  let resStatus;
  switch (status) {
    case 'active':
    case 'remote':
    case 'terminated':
      resStatus = status;
      break;
    case 'onHoliday':
      resStatus = 'on holiday';
      break;
    default:
      resStatus = 'status not available';
      break;
  }
  return (
    <div className="rounded-[20px] border border-gray/light px-6 py-8">
      <div className="flex items-center justify-end gap-2">
        <StatusTag status={resStatus}>{resStatus}</StatusTag>
        <DotsMenu employee={employee} />
      </div>

      {/* Profile Name and Image */}
      <div className="mt-2 flex gap-3">
        {avatarInfo.url ? (
          <img
            src={avatarInfo.url}
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
          <h3 className="text-xl font-medium">{fullName ? capitalizeName(fullName) : 'Full name not available'}</h3>
          <h4 className="text-base font-medium">{position ? capitalizeName(position) : 'Position not available'}</h4>
        </div>
      </div>

      <div className="mt-5 flex justify-between pr-5">
        <div className="flex flex-col gap-2">
          <span className="font-mullish text-xs font-normal uppercase text-gray/darkest">Department</span>
          <span className="font-mullish text-sm font-medium">
            {department ? capitalizeName(department) : 'Not Specified'}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mullish text-xs font-normal uppercase text-gray/darkest">Date of joining</span>
          <span className="font-mullish text-sm font-medium">
            {dateOfJoining ? dayjs(dateOfJoining).format('DD/MM/YYYY') : '-- / -- / ----'}
          </span>
        </div>
      </div>

      {/* Email and Phone Number */}
      <div className="mt-5 rounded-2xl bg-gray/ultralight p-4">
        <div className="flex items-center gap-3 border-b border-gray/light pb-3">
          <IoMdMail className="text-gray/normal" />
          <p className="font-base text-sm">{email ? email : 'Email address was not provided.'}</p>
        </div>
        <div className="flex items-center gap-3 pt-3">
          <FaPhone className="text-gray/normal" />
          <p className="font-base text-sm">{phone ? phone : 'Phone number was not provided.'}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex justify-between gap-3">
        <Btn color="blueAccent" size="lg" className="w-full rounded-lg">
          Records
        </Btn>
        <Btn
          size="lg"
          className="w-full"
          onClick={() => {
            navigate(`/dashboard/employees/${id}`);
          }}
        >
          Details
        </Btn>
      </div>
    </div>
  );
}

export default EmployeeCard;
