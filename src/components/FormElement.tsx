import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';

function FormElement() {
  return (
    <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} labelAlign="left" className="mt-4" colon={false}>
      <Form.Item name="email" label="email" required={true}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item name="name" label="name">
        <Input placeholder="Enter your name" />
      </Form.Item>
      <Form.Item name="password" label="password">
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
      <Form.Item name="confirm-password" label="password">
        <Input.Password placeholder="Confirm your password" />
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Select placeholder="Select your gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="birth" label="Date of Birth">
        <DatePicker picker="date" placeholder="Choose your birth date" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="website" label="website">
        <Input placeholder="Add your website url" />
      </Form.Item>

      <Form.Item name="agreement" wrapperCol={{ span: 24 }}>
        <Checkbox className="text-white">
          Agree to our <a href="google.com">Terms and Condition</a>
        </Checkbox>
      </Form.Item>

      <Form.Item name="submit" wrapperCol={{ span: 24 }}>
        <Button block type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormElement;
