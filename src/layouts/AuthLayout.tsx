import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex h-screen items-center justify-center bg-loginImage bg-cover bg-center text-white">
      <div className="flex flex-col items-center justify-center rounded-[28px] border-2 border-[#5882c1c7] bg-[#5882c17f] p-10">
        <img src="/public/images/login-app-logo.svg" alt="qabdni logo" className="w-[200px]" />
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
