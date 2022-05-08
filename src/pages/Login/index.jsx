import React from 'react';

import { Form, Input, Button, message } from 'antd';
import Logo from '@/assets/images/mihalik-group-logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
	// console.log(import.meta.env.VITE_USERNAME + ' ' + import.meta.env.VITE_PASSWORD);
	const navigate = useNavigate();
	const onFinish = values => {
		console.log('Success:', values);
		if (values.username === import.meta.env.VITE_USERNAME && values.password === import.meta.env.VITE_PASSWORD) {
			localStorage.setItem('token', 'TEST_TOKEN');
			message.success('Login successful');
			navigate('/');
		} else {
			message.error('Username or password is incorrect');
		}
	};

	return (
		<div className="m-auto max-w-lg p-16">
			{/* <h1 className="text-center text-2xl">Sign in to ZENITH</h1> */}
			<img src={Logo} alt="ZENITH" className="mx-auto mb-8 w-64" />
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
