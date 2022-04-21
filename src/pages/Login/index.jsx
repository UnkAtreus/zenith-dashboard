import React from 'react';

import { Form, Input, Button } from 'antd';
import Logo from '@/assets/images/mihalik-group-logo.png';

const onFinish = values => {
	console.log('Success:', values);
};

function Login() {
	return (
		<div className="m-auto max-w-lg p-16">
			{/* <h1 className="text-center text-2xl">Sign in to ZEMIT</h1> */}
			<img src={Logo} alt="ZEMIT" className="mx-auto mb-8 w-64" />
			<Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
				<Form.Item
					label="username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" block>
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Login;
