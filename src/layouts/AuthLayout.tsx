import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div
      className="background-image h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/bg-login-page.png")' }}
    >
      <Outlet />
    </div>
  );
}

export default AuthLayout;
