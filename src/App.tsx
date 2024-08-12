import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Root from './layouts/Root.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import FormElement from './components/FormElement.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import { lazy } from 'react';
import EmployeeDetails from './features/employees/pages/EmployeeDetails.tsx';

const Login = lazy(() => import('./pages/Login.tsx'));
const Signup = lazy(() => import('./pages/Signup.tsx'));
const Overview = lazy(() => import('./pages/Dashboard/Overview.tsx'));
const Attendance = lazy(() => import('./pages/Dashboard/Attendance.tsx'));
const Employees = lazy(() => import('./pages/Dashboard/Employees.tsx'));
const CreateEmployee = lazy(() => import('./features/employees/pages/CreateEmployee.tsx'));
const Leaves = lazy(() => import('./features/employees/pages/Leaves.tsx'));
const Analytics = lazy(() => import('./pages/Dashboard/Analytics.tsx'));
const Payroll = lazy(() => import('./pages/Dashboard/Payroll.tsx'));
const Settings = lazy(() => import('./pages/Dashboard/Settings.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <PageNotFound />,
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
            // loader: async () => {
            //   // Simulate a data loading delay
            //   await new Promise((resolve) => setTimeout(resolve, 5000));
            //   return {};
            // }
          },
          { path: 'employees/:employeeId', element: <EmployeeDetails /> },
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
          // Global styles
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily: 'Libre Franklin, sans-serif',
          fontSize: 14,
          lineHeight: 1
          // controlHeight: 40
        },
        components: {
          Input: {
            fontFamily: 'Mulish, sans-serif',
            // colorTextPlaceholder: '#969DA6',
            colorText: '#23272C',
            activeBorderColor: '#465FF1',
            hoverBorderColor: '#1f74ec'
            // colorBorder: '#d9d9d9'
            // paddingBlock: 5.5,
            // paddingInline: 11
          },
          Form: {
            labelColor: '#23272C',
            labelFontSize: 13,
            labelRequiredMarkColor: '#ff4d4f'
          },
          Select: {
            fontFamily: 'Mulish, sans-serif',
            showArrowPaddingInlineEnd: 35,
            controlHeight: 34,
            optionPadding: '2px 11px'
          },
          Table: {
            stickyScrollBarBg: `background-image: -webkit-gradient(
                                  linear,
                                  left bottom,
                                  left top,
                                  color-stop(0.44, rgb(122, 153, 217)),
                                  color-stop(0.72, rgb(73, 125, 189)),
                                  color-stop(0.86, rgb(28, 58, 148))
                                )`
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
