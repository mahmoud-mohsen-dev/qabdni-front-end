import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Signup from './pages/Signup.tsx';
import Root from './layouts/Root.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/PageNotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />
          },
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'signup',
            element: <Signup />
          }
        ]
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
