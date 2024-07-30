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
      // theme={{
      //   token: {
      //     // colorPrimary: '#4E1BD9'
      //     colorPrimary: '#1677ff'
      //   },
      //   components: {
      //     Input: {
      //       fontFamily: 'Mulish, sans-serif',
      //       colorTextPlaceholder: '#969DA6',
      //       colorText: '#23272C',
      //       activeBorderColor: '#465FF1',
      //       hoverBorderColor: '#1f74ec',
      //       borderRadius: 8,
      //       inputFontSize: 14,
      //       paddingBlock: 10,
      //       paddingInline: 16,
      //       lineHeight: 1,
      //       lineWidth: 1,
      //       colorBorder: '#d9d9d9'

      //       // paddingInline: 13
      //     },
      //     Form: {
      //       labelColor: '#23272C',
      //       labelFontSize: 16,
      //       labelRequiredMarkColor: '#ff4d4f'
      //       // colorError: '#FFB5B5'
      //     },

      //     Select: {
      //       // fontFamily: 'Mullish, sans-serif'
      //       fontFamily: 'Libre Franklin, sans-serif',
      //       showArrowPaddingInlineEnd: 35,
      //       borderRadius: 8,
      //       paddingInline: 55
      //       // optionPadding: '20px 30px'
      //     }
      //   }
      // }}

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
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
