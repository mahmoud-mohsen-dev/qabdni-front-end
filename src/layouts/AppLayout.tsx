import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';
import Loader from '../components/Loader';
import { Suspense } from 'react';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="flex min-h-screen w-full font-Libre">
      <SideBar />
      <main className="mx-8 my-5 ml-[332px] h-fit min-h-[650px] w-full">
        {isLoading && <Loader />}
        <Suspense fallback={<Loader />}>
          {!isLoading && (
            <>
              <Navbar />
              <Outlet />
            </>
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default AppLayout;
