// import { setToLocalStorage } from '../utils/localStorage';
// import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../features/auth/components/PasswordInput';
import AntInput from '../components/AntInput';
import { Checkbox, Form } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../store/index';
import { RootState } from '../store/index';
// import { login } from '../features/auth/store/authSlice';
import { MdEmail } from 'react-icons/md';
import { RiKeyFill } from 'react-icons/ri';
import Btn from '../components/Btn';

const Login: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const naviagte = useNavigate();
  const handlerFinish = (value: object) => {
    console.log(value);
  };

  return (
    <Form
      className="flex flex-col gap-5 text-base text-white"
      layout="vertical"
      onFinish={handlerFinish}
      requiredMark={false}
      colon={false}
    >
      <h2 className="mt-5 text-3xl font-bold">Log in</h2>

      <div>
        {/* Email Input */}
        <Form.Item
          label="Email"
          name="login-email"
          rules={[
            { required: true, message: 'Please input your email address!' },
            { type: 'email', message: 'The input is not valid E-mail!' }
          ]}
        >
          <AntInput placeHolder="Enter your email" type="email" prefix={<MdEmail className="text-gray/normal" />} />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          label="Password"
          name="login-password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <PasswordInput
            id="login-password"
            placeHolder="Enter your password"
            prefix={<RiKeyFill className="text-gray/normal" />}
          />
        </Form.Item>

        {/* Checkbox Section */}
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center justify-center gap-2">
            <Checkbox defaultChecked={false} id="login-agree-to-terms"></Checkbox>
            <label htmlFor="login-agree-to-terms" className="leading-4">
              Remember me
            </label>
          </div>
          <Link to="/forget-password" className="font-semibold leading-4">
            Forget Password?
          </Link>
        </div>
      </div>

      {/* Sign in Button */}
      <Btn
        color="indigo"
        size="full"
        className="font-dm font-semibold"
        type="submit"
        onClick={() => {
          if (isAuthenticated) {
            naviagte('/dashboard/overview');
            //   dispatch(login({ userName: 'mahmoud@gmail.com', password: '12345678', token: 'lajflafajladjsf' }));
            // }
            // console.log(e);
          }
        }}
      >
        <p>Sign in</p>
      </Btn>

      {/* Sign up Section */}
      <p className="self-center text-sm">
        Don&apos;t have an account yet?{' '}
        <Link to="/singup" className="font-semibold">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default Login;
