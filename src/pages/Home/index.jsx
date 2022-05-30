import React from 'react';

import { Pie } from '@ant-design/charts';
import { TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, Divider } from 'antd';
import { Link } from 'react-router-dom';

import Logo from '@/assets/images/mihalik-group-logo.png';

function Home() {
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
						<Menu mode="horizontal" defaultSelectedKeys={['dashboard']} className="flex-1 justify-end">
							<Menu.Item key="dashboard">
								<Link to="/">Dashboard</Link>
							</Menu.Item>
							<Menu.Item key="reports">
								<Link to="/reports">Reports</Link>
							</Menu.Item>
							<Menu.Item key="goal-tracker">
								<Link to="/goal-tracker">Goal Tracker</Link>
							</Menu.Item>
							<Menu.Item key="population">
								<Link to="/">Population</Link>
							</Menu.Item>
							<Menu.Item key="gaps-in-care">
								<Link to="/">Gaps in Care</Link>
							</Menu.Item>
						</Menu>
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
						<div className="flex space-x-6">
							<div className="h-[28rem] w-full max-w-xs rounded-2xl bg-white px-6 py-10 shadow-lg">
								<div className="mb-4 text-xl font-medium">Project List</div>
								<div className="h-80 space-y-2 overflow-auto">
									{Array(8)
										.fill(0)
										.map((_, index) => (
											<div key={`projecy-card__` + index}>
												<div className="flex items-center space-x-3">
													<TeamOutlined style={{ fontSize: `32px` }} />

													<div className="overflow-hidden">
														<div className="overflow-hidden text-ellipsis whitespace-nowrap">
															ZENITHRUN - MAY2021
														</div>
														<div className="text-gray-400">Last updated: 04/06/2022</div>
													</div>
												</div>
												<Divider />
											</div>
										))}
								</div>
							</div>
							<div className="w-full flex-1 rounded-2xl bg-white px-6 py-10 shadow-lg">
								<div className="mb-4 text-xl font-medium">Cumulative Gap Opportunities</div>
								<Pie {...config} />
							</div>
							<div className="h-fit w-full max-w-xs rounded-2xl bg-white px-6 py-10 shadow-lg">
								<div className="text-xl font-medium">Navigational Items</div>
								<div className="mb-4 text-xs font-medium">Imperial Health Plan of California MAPD</div>
								<div className="space-y-4">
									<div className="w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-purple-200 p-4 text-sm font-medium transition-all duration-200 hover:bg-opacity-80">
										Rate Sheet by Population
									</div>
									<div className="w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-purple-200 p-4 text-sm font-medium transition-all duration-200 hover:bg-opacity-80">
										Rate Sheet by Provider
									</div>
									<div className="w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-purple-200 p-4 text-sm font-medium transition-all duration-200 hover:bg-opacity-80">
										Gaps in Care
									</div>
									<div className="w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-purple-200 p-4 text-sm font-medium transition-all duration-200 hover:bg-opacity-80">
										Goal Tracker
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Layout.Content>
			{/* <Layout.Footer></Layout.Footer> */}
		</Layout>
	);
}

export default Home;
