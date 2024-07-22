import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Signup from './pages/Signup.tsx';
import Root from './layouts/Root.tsx';
import ErrorPage from './pages/PageNotFound.tsx';
import { ConfigProvider } from 'antd';
import FormElement from './components/FormElement.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Overview from './pages/Dashboard/Overview.tsx';
import Employees from './pages/Dashboard/Employees.tsx';
import Attendance from './pages/Dashboard/Attendance.tsx';
import Analytics from './pages/Dashboard/Analytics.tsx';
import Payroll from './pages/Dashboard/Payroll.tsx';
import Settings from './pages/Dashboard/Settings.tsx';
import CreateEmployee from './features/employees/pages/CreateEmployee.tsx';
import Leaves from './features/employees/pages/Leaves.tsx';

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
        element: <Dashboard />,
        children: [
          {
            path: 'overview',
            element: <Overview />
          },
          {
            path: 'attendance',
            element: <Attendance />
          },
          {
            path: 'employees',
            element: <Employees />
          },
          { path: 'create-employee', element: <CreateEmployee /> },
          { path: 'leaves', element: <Leaves /> },
          {
            path: 'analytics',
            element: <Analytics />
          },
          {
            path: 'payroll',
            element: <Payroll />
          },
          {
            path: 'settings',
            element: <Settings />
          }
        ]
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
