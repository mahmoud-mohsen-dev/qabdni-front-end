import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Signup from './pages/Signup.tsx';
import Root from './layouts/Root.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/PageNotFound.tsx';
import { ConfigProvider } from 'antd';

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
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#465FF1'
        },
        components: {
          Input: {
            colorTextPlaceholder: '#969DA6',
            colorText: '#23272C',
            activeBorderColor: '#465FF1',
            hoverBorderColor: '#1f74ec',
            inputFontSize: 13,
            paddingBlock: 8,
            paddingInline: 10,
            lineWidth: 2,
            colorBorder: 'transparent'
            // paddingInline: 13
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
