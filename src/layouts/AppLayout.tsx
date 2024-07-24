import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';

function AppLayout() {
  return (
    <div className="flex min-h-screen font-Libre">
      <SideBar />
      <main className="m-8 ml-[332px] w-full">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
