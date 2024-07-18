import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="auth-layout flex min-h-screen items-center justify-center bg-loginImage bg-cover bg-center text-white">
      <div
        className="m-4 flex flex-col items-center justify-center rounded-[28px] border-2 border-[#5882c1c7] bg-[#5882c17f] px-9 py-8"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <img src="/public/images/login-app-logo.svg" alt="qabdni logo" className="w-[200px]" />
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
