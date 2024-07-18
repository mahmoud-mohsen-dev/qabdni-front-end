import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Signup from './pages/Signup.tsx';
import Root from './layouts/Root.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/PageNotFound.tsx';
import { ConfigProvider } from 'antd';
import FormElement from './components/FormElement.tsx';

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
            path: 'singup',
            element: <Signup />
          },
          {
            path: 'forget-password',
            element: <FormElement />
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
          colorPrimary: '#4E1BD9'
        },
        components: {
          Input: {
            fontFamily: 'Dm Sans, sans-serif',
            colorTextPlaceholder: '#969DA6',
            colorText: '#23272C',
            activeBorderColor: '#465FF1',
            hoverBorderColor: '#1f74ec',
            inputFontSize: 14,
            paddingBlock: 8,
            paddingInline: 10,
            lineHeight: 1,
            lineWidth: 2,
            colorBorder: 'transparent'

            // paddingInline: 13
          },
          Form: {
            labelColor: 'white',
            labelFontSize: 16,
            labelRequiredMarkColor: '#ff4d4f'
            // colorError: '#FFB5B5'
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
