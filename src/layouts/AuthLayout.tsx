import { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from '../components/Loader';

function AuthLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      {!isLoading && (
        <div className="auth-layout flex min-h-screen items-center justify-center bg-loginImage bg-cover bg-center text-white">
          <div
            className="m-4 flex flex-col items-center justify-center rounded-[28px] border-2 border-[#5882c1c7] bg-[#5882c17f] px-9 py-8"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <img src="/images/login-app-logo.svg" alt="qabdni logo" className="w-[200px]" />
            <Outlet />
          </div>
        </div>
      )}
    </Suspense>
  );
}

export default AuthLayout;
