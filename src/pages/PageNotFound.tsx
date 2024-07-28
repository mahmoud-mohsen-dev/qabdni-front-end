import { Link, useRouteError } from 'react-router-dom';
import Btn from '../components/Btn';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page" className="flex min-h-screen items-center justify-center px-40">
      <div className="flex max-w-[620px] flex-col gap-5 font-Libre">
        <h1 className="text-7xl font-bold leading-none text-indigo/accent">OOPS!</h1>
        <h3 className="text-3xl font-semibold">The page you&apos;re looking for could not be found</h3>
        <p className="text-base font-normal">Please check the URL or navigate back to the homepage</p>
        <Link to="/" style={{ width: 'fit-content', borderRadius: '8px' }}>
          <Btn color="blue" paddingSize="sm" fontSize="sm" className="font-medium hover:bg-blue/accent">
            <p>Back to Home Page</p>
          </Btn>
        </Link>
      </div>
      <img src="/images/404 Error.svg" alt="404 error page not found" className="max-w-[500px]" />
    </div>
  );
}
