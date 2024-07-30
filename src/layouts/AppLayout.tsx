import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full font-Libre">
      <SideBar />
      <main className="mx-8 my-5 ml-[332px] h-fit min-h-[750px] w-full">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
