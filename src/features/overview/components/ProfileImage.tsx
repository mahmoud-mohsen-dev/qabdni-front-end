import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface ProfileImageType {
  url: string;
  index: number;
}

const calcPosition = (index: number, lang: string) => {
  const position = index * -15;
  return lang === 'en' ? { right: `${position}px` } : { left: `${position}px` };
};

function ProfileImage({ url, index }: ProfileImageType) {
  const lang = useSelector((state: RootState) => state.adminSettings.language);
  const position = calcPosition(index, lang);
  return (
    <div
      className={`bg-other/gray&red-light relative top-0 h-10 w-10 rounded-full border-2 border-indigo/ultralight`}
      style={{ ...position }}
    >
      {url && <img src={url} alt="employee profile" />}
    </div>
  );
}

export default ProfileImage;
