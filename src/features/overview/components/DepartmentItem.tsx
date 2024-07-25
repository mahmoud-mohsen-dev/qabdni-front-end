import ProfileImage from './ProfileImage';
import { v4 as uuidv4 } from 'uuid';

interface DepartmentItemType {
  color: 'indigo' | 'orange' | 'blue' | 'green' | 'pink';
  text: string;
  employeesImages: string[];
}

const bgColor = {
  indigo: 'bg-indigo/ultralight',
  orange: 'bg-orange/ultralight',
  blue: 'bg-blue/ultralight',
  green: 'bg-green/ultralight',
  pink: 'bg-pink/ultralight'
};

function DepartmentItem({ color, text, employeesImages }: DepartmentItemType) {
  const filteredEmployeesImages = employeesImages.filter((item) => (item ? item : null));
  const resArr = filteredEmployeesImages.length === 0 ? ['', '', '', '', ''] : filteredEmployeesImages;

  return (
    <div className={`${bgColor[color]} flex items-center justify-between rounded-xl px-5 py-3`}>
      <h3 className="text-base font-bold">{text}</h3>
      <div className="flex items-center justify-center gap-5">
        <div className="flex">
          {resArr.map((url, i) => {
            return i < 5 ? <ProfileImage url={url} key={uuidv4()} /> : '';
          })}
        </div>
        <span className="font-mullish text-2xl font-semibold">{filteredEmployeesImages.length ?? 0}</span>
      </div>
    </div>
  );
}

export default DepartmentItem;
