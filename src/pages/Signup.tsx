import { Checkbox, Form, Input } from 'antd';
// import PasswordInput from '../features/auth/components/PasswordInput';
import Btn from '../components/Btn';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { signup } from '../features/auth/store/authSlice';
import { FaUser } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { RiKeyFill } from 'react-icons/ri';
import { capitalizeName } from '../utils/user';

interface FormValuesType {
  'First name': string;
  'Last name': string;
  Email: string;
  Password: string;
  'Confirm password': string;
  Agreement: boolean;
}

function Signup() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = (values: FormValuesType) => {
    const firstName = capitalizeName(values['First name']);
    const lastName = capitalizeName(values['Last name']);
    const { Password: password, Email: email } = values;

    navigate('/register');
    dispatch(
      signup({
        isAuthenticated: true,
        user: { fullName: `${firstName} ${lastName}`, email, password, token: null },
        companyDetails: null
      })
    );
  };

  const validateWhiteSpace = (_: unknown, value: string) => {
    if (/\s/.test(value)) {
      return Promise.reject(new Error('Please remove spaces from this field'));
    }
    return Promise.resolve();
  };

  return (
    <div className="signup flex min-w-[300px] flex-col">
      <Form className="flex flex-col gap-1 text-white" wrapperCol={{ span: 24 }} onFinish={onFinish}>
        <h2 className="my-4 text-3xl font-bold">Sign up</h2>

        <Form.Item
          name="First name"
          rules={[
            { required: true, message: 'First name is required' },
            { whitespace: true },
            { type: 'string' },
            { min: 3 },
            { max: 15 },
            { validator: validateWhiteSpace }
          ]}
          hasFeedback
        >
          <Input placeholder="First Name" prefix={<FaUser className="text-gray/normal" />} />
        </Form.Item>
        <Form.Item
          name="Last name"
          rules={[
            { required: true, message: 'Last name is required' },
            { whitespace: true },
            { type: 'string' },
            { min: 3 },
            { max: 15 },
            { validator: validateWhiteSpace }
          ]}
          hasFeedback
        >
          <Input placeholder="Last Name" prefix={<FaUser className="text-gray/normal" />} />
        </Form.Item>

        <Form.Item
          name="Email"
          rules={[
            { required: true, message: 'Email is required' },
            { whitespace: true },
            { type: 'email', message: 'Please enter a valid email' },
            { validator: validateWhiteSpace }
          ]}
          hasFeedback
        >
          <Input placeholder="Email Address" prefix={<MdEmail className="text-gray/normal" />} />
        </Form.Item>

        <Form.Item
          name="Password"
          rules={[
            { required: true, message: 'Password is required' },
            { whitespace: true },
            { min: 8 },
            { max: 24 },
            {
              validator: (_, value) => {
                if (!/(?=.*[a-zA-Z])/.test(value)) {
                  return Promise.reject(new Error('Password must contain at least one alphabet'));
                }
                if (!/(?=.*\d)/.test(value)) {
                  return Promise.reject(new Error('Password must contain at least one number'));
                }
                if (/\s/.test(value)) {
                  return Promise.reject(new Error('Please remove spaces from this field'));
                }
                return Promise.resolve();
              }
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" prefix={<RiKeyFill className="text-gray/normal" />} />
        </Form.Item>

        <Form.Item
          name="Confirm password"
          dependencies={['Password']}
          rules={[
            { required: true, message: 'Password is required' },
            { whitespace: true },
            { min: 8 },
            { max: 24 },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('Password') === value) {
                  return Promise.resolve();
                }
                if (/\s/.test(value)) {
                  return Promise.reject(new Error('Please remove spaces from this field'));
                }
                return Promise.reject('Password does not match');
              }
            })
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Confirm Password" prefix={<RiKeyFill className="text-gray/normal" />} />
        </Form.Item>

        <Form.Item
          name="Agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) => {
                return value ? Promise.resolve() : Promise.reject('To proceed, agree to our terms and conditions');
              }
            }
          ]}
        >
          <Checkbox className="text-sm leading-4 text-white">
            Agree to our{' '}
            <Link to="/terms-of-services" className="text-orange/light underline">
              Terms and Conditions
            </Link>
          </Checkbox>
        </Form.Item>

        <Form.Item className="mt-1">
          <Btn color="indigo" paddingSize="2xl" className="font-dm font-semibold" type="submit">
            <p>Get Started</p>
          </Btn>
        </Form.Item>
      </Form>

      <p className="mt-1 self-center text-sm">
        Already a member?{' '}
        <Link to="/Login" className="font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
