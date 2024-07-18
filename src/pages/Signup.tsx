import { Checkbox } from 'antd';
import AntInput from '../components/AntInput';
import PasswordInput from '../features/auth/components/PasswordInput';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { signup } from '../features/auth/store/authSlice';
import { FaUser } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { RiKeyFill } from 'react-icons/ri';

function Signup() {
  const isValid = true;
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  return (
    <form className="flex max-w-[300px] flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <h2 className="mt-4 text-3xl font-bold">Sign up</h2>

      <div className="flex gap-2">
        <AntInput placeHolder="First Name" id="signup-first-name" prefix={<FaUser className="text-gray/normal" />} />
        <AntInput placeHolder="Last Name" id="signup-last-name" prefix={<FaUser className="text-gray/normal" />} />
      </div>

      <AntInput
        placeHolder="Email Address"
        id="signup-email"
        type="email"
        prefix={<MdEmail className="text-gray/normal" />}
      />

      <PasswordInput placeHolder="Password" id="signup-password" prefix={<RiKeyFill className="text-gray/normal" />} />

      <PasswordInput
        placeHolder="Confirm Password"
        id="signup-confirm-password"
        prefix={<RiKeyFill className="text-gray/normal" />}
      />

      <div className="flex items-center justify-start gap-2">
        <Checkbox defaultChecked={false} id="signup-agree-to-terms" />
        <label htmlFor="signup-agree-to-terms" className="text-sm leading-4">
          Agree to our{' '}
          <Link to="/terms-of-services" className="text-orange/light underline">
            Terms and Conditions
          </Link>
        </label>
      </div>

      <Button
        color="indigo"
        paddingSize="2xl"
        className="font-semibold ring-1 hover:bg-blue/accent focus:outline-none focus:ring-blue/light"
        onClick={() => {
          if (isValid) {
            navigate('/register');
            dispatch(
              signup({
                isAuthenticated: true,
                user: { fullName: 'Mahmoud Mohsen', email: 'mahmoud@gmail.com', password: '12345678', token: null },
                companyDetails: null
              })
            );
          }
        }}
      >
        <p>Get Started</p>
      </Button>

      <p className="self-center text-sm">
        Already a member?{' '}
        <Link to="/Login" className="font-semibold">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default Signup;
