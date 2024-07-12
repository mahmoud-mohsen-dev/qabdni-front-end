// import { setToLocalStorage } from '../utils/localStorage';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../features/auth/components/PasswordInput';
import AntInput from '../components/AntInput';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/index';
import { login } from '../features/auth/store/authSlice';

const Login: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const naviagte = useNavigate();

  return (
    <form className="flex w-[250px] flex-col gap-5 text-[13px]" onSubmit={(e) => e.preventDefault()}>
      <h2 className="mt-5 text-[28px] font-bold">Log in</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="login-email">Email</label>
        <AntInput placeHolder="Enter your email" id="login-email" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="login-password">Password</label>
        <PasswordInput id="login-password" placeHolder="Enter your password" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Checkbox defaultChecked={false} id="login-agree-to-terms"></Checkbox>
          <label htmlFor="login-agree-to-terms" className="leading-3">
            Remember me
          </label>
        </div>
        <Link to="/forget-password" style={{ lineHeight: '12px' }}>
          Forget Password?
        </Link>
      </div>
      <Button
        color="purple"
        paddingSize="2xl"
        styles="hover:bg-blue/accent focus:outline-none ring-1 focus:ring-blue/light"
        onClick={() => {
          if (isAuthenticated) {
            naviagte('/dashboard');
            dispatch(login({ userName: 'mahmoud@gmail.com', password: '12345678', token: 'lajflafajladjsf' }));
          }
        }}
      >
        <p>Sign in</p>
      </Button>

      <p className="self-center text-[12px]">
        Don&apos;t have an account yet?{' '}
        <Link to="/singup" className="font-bold">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default Login;
