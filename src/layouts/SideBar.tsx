import { useState } from 'react';
import { FaCaretRight } from 'react-icons/fa6';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdAccessTime, MdOutlineKeyboardArrowRight } from 'react-icons/md';
// import { MdAccessTime, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

function SideBar() {
  const [hover, setHover] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-other/black sidebar flex flex-col items-center justify-between px-7 py-6 text-indigo/ultralight">
      <div>
        <img src="/public\images\app-logo.svg" alt="app logo" />

        {/* Comapany Logo */}
        <div className="mt-5 grid text-center">
          <img src="/public\images\Mask.svg" alt="company logo" className="justify-self-center" />
          <h3 className="mt-2 text-lg font-semibold">Ulad Luch</h3>
          <p className="text-sm font-medium leading-4 text-gray/light">hello@uladluch.com</p>
        </div>

        {/* Manage */}
        <div className="min-w-60">
          <h6 className="text-other/gray&indigo-light mx-6 mb-3 mt-7 text-sm">MANAGE</h6>

          {/* Links */}
          <div className="flex flex-col gap-1">
            {/* Overview */}
            <NavLink
              to="overview"
              className={`hover:bg-other/gray&blue-accent flex items-center gap-4 rounded-3xl bg-transparent px-6 py-[7px]`}
            >
              <img src="/public\images\side-bar-icons\Data Treemap.svg" alt="overview icon" />
              <span className="text-base font-semibold">Overview</span>
            </NavLink>

            {/* Attendance */}
            <NavLink
              to="attendance"
              className="hover:bg-other/gray&blue-accent flex items-center gap-4 rounded-3xl bg-transparent px-6 py-[7px]"
            >
              <MdAccessTime className="inline" size={24} />
              <span className="text-base font-semibold">Attendance</span>
            </NavLink>

            {/* Employees */}
            <NavLink
              to="employees"
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              className={`hover:bg-other/gray&blue-accent employees flex items-center justify-between rounded-3xl bg-transparent px-6 py-[7px]`}
            >
              <div className="flex justify-center gap-4">
                <img src="/public\images\side-bar-icons\People.svg" alt="people icon" />
                <span className="text-base font-semibold">Employees</span>
              </div>
              <MdOutlineKeyboardArrowRight
                size={24}
                className={`${hover ? 'opacity-100' : 'opacity-0'} transition-all duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                onClick={() => setIsExpanded((prev: boolean) => !prev)}
              />
            </NavLink>

            {isExpanded && (
              <div className="employee-nested-tabs">
                <NavLink to="create-employee" className="mx-11 mb-4 mt-1 flex items-center gap-4">
                  <FaCaretRight className="inline" size={16} />
                  <p className="text-sm font-normal">Create Employee</p>
                </NavLink>
                <NavLink to="leaves" className="mx-11 mb-2 flex items-center gap-4">
                  <FaCaretRight className="inline" size={16} />
                  <p className="text-sm font-normal">Leaves</p>
                </NavLink>
              </div>
            )}

            {/* Analytics */}
            <NavLink
              to="analytics"
              className="hover:bg-other/gray&blue-accent flex items-center gap-4 rounded-3xl bg-transparent px-6 py-[7px]"
            >
              <img src="/public\images\side-bar-icons\Chart Multiple.svg" alt="chart icon" />
              <span className="text-base font-semibold">Analytics</span>
            </NavLink>

            {/* Payroll */}
            <NavLink
              to="payroll"
              className="hover:bg-other/gray&blue-accent flex items-center gap-4 rounded-3xl bg-transparent px-6 py-[7px]"
            >
              <img src="/public\images\side-bar-icons\dollar sign.svg" alt="dollar sign icon" />
              <span className="text-base font-semibold">Payroll</span>
            </NavLink>
          </div>
        </div>

        {/* Preference */}
        <div className="mb-5">
          <h6 className="text-other/gray&indigo-light mx-6 mb-3 mt-7 text-sm">PERFERENCE</h6>

          {/* Links */}
          <div className="flex flex-col gap-1">
            {' '}
            {/* Settings */}
            <NavLink
              to="settings"
              className="hover:bg-other/gray&blue-accent flex items-center gap-4 rounded-3xl bg-transparent px-6 py-[7px]"
            >
              <IoSettingsOutline size={24} />
              <span className="text-base font-semibold">Settings</span>
            </NavLink>
            {/* Log out */}
            <NavLink
              to="/login"
              className="hover:bg-other/gray&blue-accent flex items-center gap-4 rounded-3xl bg-transparent px-6 py-[7px]"
            >
              <img src="/public\images\side-bar-icons\Arrow Exit.svg" alt="sign out icon" />
              <span className="text-base font-semibold">Log out</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-center text-xs">
        <p>Copyright © 2024 By Primo Soft.</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
}

export default SideBar;
