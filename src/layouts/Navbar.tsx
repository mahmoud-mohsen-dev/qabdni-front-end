import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { getNavDate, getNavTime } from '../utils/date';
import { useEffect, useState } from 'react';

function Navbar() {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString('en-US'));

  useEffect(() => {
    setInterval(() => {
      setTime(getNavTime);
    }, 1000);
  }, []);

  return (
    <div className="mb-11 flex items-center justify-between rounded-3xl border border-gray/light px-5 py-[6px] font-dm">
      <div className="flex items-center justify-center gap-3">
        <button>
          <HiMiniMagnifyingGlass size={16} />
        </button>
        <input
          placeholder="Search by name, position"
          className="placeholder:text-gray/darkest text-other/black font-mullish text-base focus:outline-none"
        />
        <span className="text-base font-medium">{getNavDate() + ', 0' + time}</span>
      </div>

      {/* Admin Profile & notification */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img src="/public\images\notification.svg" alt="notfication icon" />
          <div className="bg-red/accent absolute right-[-50%] top-[-50%] flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold leading-none text-red/ultralight">
            <span>1</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray/normal"></div>
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
