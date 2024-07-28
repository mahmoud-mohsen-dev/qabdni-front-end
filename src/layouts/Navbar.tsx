import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { getNavDate, getNavTime } from '../utils/date';
import { useEffect, useState } from 'react';

function Navbar() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString('en-US'));
  const [search, setSearch] = useState('');

  useEffect(() => {
    setInterval(() => {
      setTime(getNavTime);
    }, 1000);
  }, []);

  return (
    <div className="mb-6 flex items-center justify-between rounded-3xl border border-gray/light px-5 py-[6px] font-dm">
      <div className="flex items-center justify-center gap-5">
        <span className="text-base font-medium">{getNavDate() + ', ' + time}</span>
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setSearch('')} className={`focus:outline-none`}>
            <HiMiniMagnifyingGlass size={16} />
          </button>
          <input
            placeholder="Search by name, position"
            className="font-mullish text-base text-other/black placeholder:text-gray/darkest focus:outline-none"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Admin Profile & notification */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img src="/images/notification.svg" alt="notfication icon" />
          <div className="absolute right-[-50%] top-[-50%] flex h-4 w-4 items-center justify-center rounded-full bg-red/accent text-[10px] font-semibold leading-none text-red/ultralight">
            <span>1</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-gray/ultralight bg-other/gray&red-light"></div>
          <div>
            <h4 className="text-sm font-bold capitalize">Bright feranmi</h4>
            <p className="text-xs font-medium capitalize">admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
