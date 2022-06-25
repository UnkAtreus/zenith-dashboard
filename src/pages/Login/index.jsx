import React, { useState, useEffect } from 'react';

import { Form, Input, Button, message, Steps } from 'antd';
import { getAuth } from 'firebase/auth';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/mihalik-group-logo.png';
import firebaseApp from '@/service/firebase';
import PopulationService from '@/service/population';

const auth = getAuth(firebaseApp);

function Login() {
	// console.log(import.meta.env.VITE_USERNAME + ' ' + import.meta.env.VITE_PASSWORD);

	const [signInWithEmailAndPassword, _user, _loading, error] = useSignInWithEmailAndPassword(auth);

	const [step, setStep] = useState(0);
	const [populations, setPopulations] = useState([]);
	const navigate = useNavigate();
	const onFinish = async values => {
		await signInWithEmailAndPassword(values.email, values.password);
	};

	const getPopulation = async () => {
		try {
			const respond = await PopulationService.list();
			console.log(respond.data);
			setPopulations(respond.data);
			setStep(1);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (_user) {
			message.success('Login successful');
			getPopulation();
		}
	}, [_user]);

	useEffect(() => {
		if (error) {
			message.error('Username or password is incorrect');
		}
	}, [error]);

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
									label="email"
									name="email"
									rules={[{ required: true, message: 'Please input your email!' }]}
								>
									<Input type="email" />
								</Form.Item>

								<Form.Item
									label="Password"
									name="password"
									rules={[{ required: true, message: 'Please input your password!' }]}
								>
									<Input.Password />
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit" block loading={_loading}>
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
								{populations.map(population => (
									<div
										key={population.CHVREP_POP_NAME}
										onClick={() => {
											localStorage.setItem('population', JSON.stringify(population));
											navigate('/');
										}}
										className="cursor-pointer rounded-lg border border-gray-200 px-6 py-4 transition-colors duration-200 hover:bg-gray-100"
									>
										{population.CHVREP_POP_NAME}
									</div>
								))}
							</div>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

export default Login;
