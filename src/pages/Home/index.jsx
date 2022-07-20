import React, { useEffect, useMemo, useState } from 'react';

import { Pie } from '@ant-design/charts';
import { DownOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, Divider, Dropdown, Space, Button, Row, Col, Statistic } from 'antd';
import dayjs from 'dayjs';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/mihalik-group-logo.png';
import firebaseApp from '@/service/firebase';
import PopulationService from '@/service/population';
import { MENUITEMS } from '@/store/menu_title';

const auth = getAuth(firebaseApp);

function Home() {
	const [user, loading] = useAuthState(auth);

	const [populations, setPopulations] = useState({ populationName: '', populationList: [], dropdownPop: [] });

	const navigate = useNavigate();
	const data = [
		{
			type: 'ABC',
			value: 27
		},
		{
			type: 'ACB',
			value: 25
		},
		{
			type: 'BAC',
			value: 18
		},
		{
			type: 'BCA',
			value: 15
		},
		{
			type: 'CBA',
			value: 10
		},
		{
			type: 'CAB',
			value: 5
		}
	];

	const config = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9,
		label: {
			type: 'inner',
			offset: '-30%',
			content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
			style: {
				fontSize: 14,
				textAlign: 'center'
			}
		},
		interactions: [
			{
				type: 'element-active'
			}
		]
	};

	const getPopulation = async name => {
		try {
			const respond = await PopulationService.list();

			const column = [];
			respond.data.map(item => {
				column.push({ label: item.CHVREP_POP_NAME, key: item.CHVREP_POP_NAME });
			});

			setPopulations({ populationName: name, populationList: respond.data, dropdownPop: column });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const population = JSON.parse(localStorage.getItem('population'));
				if (!user && !population) {
					navigate('/login');
				}
				const respond = await PopulationService.list();
				const column = [];
				respond.data.map(item => {
					column.push({ label: item.CHVREP_POP_NAME, key: item.CHVREP_POP_NAME });
				});
				console.log(`render`);
				setPopulations({
					populationName: population.CHVREP_POP_NAME,
					populationList: respond.data,
					dropdownPop: column
				});
			} catch (error) {
				console.log(error);
				navigate('/login');
			}
		})();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<Layout>
			<Layout.Header className="fixed z-10 flex w-full items-center bg-white shadow">
				<div className="flex flex-1 items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="relative flex h-14 w-14">
							<img src={Logo} alt="" />
						</div>
						<div className="flex items-center text-2xl">ZENITH</div>
					</div>
					<div className="flex flex-1 justify-end">
						<Menu
							mode="horizontal"
							defaultSelectedKeys={['dashboard']}
							className="flex-1 justify-end"
							items={MENUITEMS}
						/>
					</div>
				</div>
			</Layout.Header>
			<Layout.Content className="h-full min-h-screen bg-slate-50 pt-16">
				<div className="m-auto mt-6 max-w-screen-xl space-y-6">
					{/* <section className="Card">
						<div className=" flex overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
							<div className="relative">
								<img src={Logo} alt="" />
							</div>
							<div className="flex flex-col">
								<div className="text-xl">ZENITH Healthcare</div>
								<div className="flex items-center">
									<UserOutlined />
									<div className="ml-2 text-base">John Doe</div>
								</div>
							</div>
						</div>
					</section> */}
					<section>
						<div className="flex w-full justify-between rounded-2xl bg-gradient-to-r from-indigo-400 to-violet-300 px-6 py-6 shadow">
							<h1 className="mb-0 text-xl text-white">{populations.populationName}</h1>
							<div className="flex items-center space-x-4">
								<Dropdown
									overlay={
										<Menu
											onClick={e => {
												// localStorage.setItem('population', e.key);
												// setPopulation(e.key);

												populations.map(item => {
													if (item.CHVREP_POP_NAME === e.key) {
														localStorage.setItem('population', JSON.stringify(item));
														setPopulations(prev => ({
															...prev,
															populationName: e.key
														}));
													}
												});
											}}
											items={populations.dropdownPop}
										/>
									}
									trigger={['click']}
								>
									<Button>
										<Space>
											Select Population
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
								<Button
									danger
									onClick={() => {
										localStorage.removeItem('token');
										localStorage.removeItem('population');
										signOut(auth);
										navigate('/login');
									}}
								>
									<Space>Logout</Space>
								</Button>
							</div>
						</div>
					</section>
					<section id="dashboard-content">
						<Row gutter={[24, 24]}>
							<Col span={8}>
								<div className="w-full  rounded-2xl bg-gradient-to-br from-orange-400 to-orange-200 px-6 py-10 shadow-lg">
									<Statistic title="Number of Measures" value={175} />
								</div>
							</Col>
							<Col span={8}>
								<div className="w-full rounded-2xl bg-gradient-to-br from-green-400 to-green-200 px-6 py-10 shadow-lg">
									<Statistic
										title="Last Update"
										value={new Date().toLocaleString()}
										formatter={value => {
											return dayjs(value).format('MM/DD/YYYY');
										}}
									/>
								</div>
							</Col>
							<Col span={8}>
								<div className="w-full rounded-2xl bg-gradient-to-br from-rose-400 to-rose-200 px-6 py-10 shadow-lg">
									<Statistic title="Total Population" value={122} />
								</div>
							</Col>

							<Col span={12}>
								<div className="h-[28rem] w-full rounded-2xl bg-white px-6 py-10 shadow-lg">
									<div className="mb-4 text-xl font-medium">Project List</div>
									<div className="h-80 space-y-2 overflow-auto">
										{Array(8)
											.fill(0)
											.map((_, index) => (
												<div key={`project-card__` + index}>
													<div className="flex cursor-pointer items-center space-x-3 ">
														<TeamOutlined style={{ fontSize: `32px` }} />

														<div className="overflow-hidden">
															<div className="overflow-hidden text-ellipsis whitespace-nowrap">
																ZENITHRUN - MAY2021
															</div>
															<div className="text-gray-400">
																Last updated: 04/06/2022
															</div>
														</div>
													</div>
													<Divider />
												</div>
											))}
									</div>
								</div>
							</Col>
							<Col span={12}>
								<div className="h-fit w-full rounded-2xl bg-white px-6 py-10 shadow-lg">
									<div className="text-xl font-medium">Navigational Items</div>
									<div className="mb-4 text-xs font-medium">{populations.populationName}</div>
									<div className="space-y-4">
										<div
											onClick={() => navigate('/reports')}
											className="w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-300 to-indigo-200 p-4  text-sm font-medium text-white transition-all duration-200 hover:bg-opacity-80"
										>
											Rate Sheet by Population
										</div>
										<div className="w-full cursor-not-allowed overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-300 to-indigo-200 p-4 text-sm font-medium text-white grayscale transition-all duration-200 hover:bg-opacity-80">
											Rate Sheet by Provider
										</div>
										<div className="w-full cursor-not-allowed overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-300 to-indigo-200 p-4 text-sm font-medium text-white grayscale transition-all duration-200 hover:bg-opacity-80">
											Gaps in Care
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</section>
				</div>
			</Layout.Content>
			{/* <Layout.Footer></Layout.Footer> */}
		</Layout>
	);
}

export default Home;
