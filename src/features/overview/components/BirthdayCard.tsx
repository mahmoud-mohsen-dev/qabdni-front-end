import { convertToCustomDate } from '../../../utils/date';

interface BirthdayCardType {
  url: string;
  name: string;
  position: string;
  birthDate: string;
}

function BirthdayCard({ url, name, position, birthDate }: BirthdayCardType) {
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
  return (
    <div className="mb-5 flex min-w-[180px] flex-col items-center justify-center gap-[10px] rounded-[20px] bg-white px-4 py-6">
      <div className="h-20 w-20 rounded-full bg-other/gray&red-light">{url && <img src={url} alt="Employee" />}</div>
      <h3 className="text-base font-semibold capitalize text-other/black&blue-normal">{name}</h3>
      <p className="font-mullish text-xs font-normal capitalize text-gray/darkest">{position}</p>
      <h4 className="font-mullish text-xs font-semibold text-other/black&blue-normal">
        {convertToCustomDate(birthDate)}
      </h4>
      <p className="font-mullish text-xs font-semibold text-green/accent">{age} y.o.</p>
    </div>
  );
}

export default BirthdayCard;
