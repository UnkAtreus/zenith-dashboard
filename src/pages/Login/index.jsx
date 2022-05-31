import React, { useState, useEffect } from 'react';

import { Form, Input, Button, message, Steps } from 'antd';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/mihalik-group-logo.png';

function Login() {
	// console.log(import.meta.env.VITE_USERNAME + ' ' + import.meta.env.VITE_PASSWORD);
	const [step, setStep] = useState(0);
	const navigate = useNavigate();
	const onFinish = values => {
		console.log('Success:', values);
		if (values.username === import.meta.env.VITE_USERNAME && values.password === import.meta.env.VITE_PASSWORD) {
			localStorage.setItem('token', 'TEST_TOKEN');
			message.success('Login successful');
			// navigate('/');
			setStep(1);
		} else {
			message.error('Username or password is incorrect');
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			// setStep(1);
		}
	}, []);

	return (
		<div className="min-h-screen bg-slate-50 p-16">
			<div className="m-auto max-w-xl ">
				<div className="mb-6">
					<Steps current={step}>
						<Steps.Step title="Login" />
						<Steps.Step title="Select Population" />
					</Steps>
				</div>
				{/* <h1 className="text-center text-2xl">Sign in to ZENITH</h1> */}
				{step === 0 && (
					<section>
						<div className="m-auto max-w-sm">
							<img src={Logo} alt="ZENITH" className="mx-auto mb-8 w-64" />
							<Form
								layout="vertical"
								initialValues={{ remember: true }}
								onFinish={onFinish}
								autoComplete="off"
							>
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
					</section>
				)}
				{step === 1 && (
					<section>
						<div className="m-auto mt-16 max-w-lg rounded-lg bg-white p-6 shadow-lg">
							<h1 className="mb-6 text-center text-2xl">Select Population</h1>
							<div className="space-y-2">
								<div
									onClick={() => {
										localStorage.setItem('population', 'Imperial Health Plan of California MAPD');
										navigate('/');
									}}
									className="cursor-pointer rounded-lg border border-gray-200 px-6 py-4 transition-colors duration-200 hover:bg-gray-100"
								>
									Imperial Health Plan of California MAPD
								</div>
								<div
									onClick={() => {
										localStorage.setItem('population', 'Imperial Health Plan of California NSP');
										navigate('/');
									}}
									className="cursor-pointer rounded-lg border border-gray-200 px-6 py-4 transition-colors duration-200 hover:bg-gray-100"
								>
									Imperial Health Plan of California NSP
								</div>
								<div
									onClick={() => {
										localStorage.setItem('population', 'Imperial Health Plan of Taxas MAPD');
										navigate('/');
									}}
									className="cursor-pointer rounded-lg border border-gray-200 px-6 py-4 transition-colors duration-200 hover:bg-gray-100"
								>
									Imperial Health Plan of Taxas MAPD
								</div>
								<div
									onClick={() => {
										localStorage.setItem('population', 'Imperial Health Plan of Taxas CSNP');
										navigate('/');
									}}
									className="cursor-pointer rounded-lg border border-gray-200 px-6 py-4 transition-colors duration-200 hover:bg-gray-100"
								>
									Imperial Health Plan of Taxas CSNP
								</div>
							</div>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

export default Login;
