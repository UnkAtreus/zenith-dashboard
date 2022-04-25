// http://13.78.224.192:8002/api/v1/ratesheets?userEmail=ihp@yopmail.com&projectId=18f474e0-d44d-4c32-9573-720e71d833af&population=Imperial%20Health%20Plan%20of%20California%20MAPD&measure=&pageSize=50&pageIndex=1
import react, { useEffect, useState } from 'react';
import { Button, Input, Layout, Tag, Menu, Divider, PageHeader, Breadcrumb, Select, Table, Space } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { Pie } from '@ant-design/charts';
import { UserOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import Logo from '@/assets/images/mihalik-group-logo.png';
import { Link } from 'react-router-dom';

function Reports() {
	const routes = [
		{
			path: '/',
			breadcrumbName: 'Home'
		},
		{
			breadcrumbName: 'Reports'
		}
	];

	const columns = [
		{
			title: 'MEASURE',
			dataIndex: 'MEASURE',
			key: 'MEASURE'
		},
		{
			title: 'SUB_MEASURE',
			dataIndex: 'SUB_MEASURE',
			key: 'SUB_MEASURE'
		},
		{
			title: 'ELIG_POP',
			dataIndex: 'ELIG_POP',
			key: 'ELIG_POP'
		}
	];

	const data = [
		{
			key: '1',
			MEASURE: 'John Brown',
			SUB_MEASURE: 32,
			ELIG_POP: 'New York No. 1 Lake Park'
		},
		{
			key: '2',
			MEASURE: 'Jim Green',
			SUB_MEASURE: 42,
			ELIG_POP: 'London No. 1 Lake Park'
		},
		{
			key: '3',
			MEASURE: 'Joe Black',
			SUB_MEASURE: 32,
			ELIG_POP: 'Sidney No. 1 Lake Park'
		}
	];
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
						<Menu mode="horizontal" defaultSelectedKeys={['reports']} className="flex-1 justify-end">
							<Menu.Item key="dashboard">
								<Link to="/">Dashboard</Link>
							</Menu.Item>
							<Menu.Item key="reports">
								<Link to="/reports">Reports</Link>
							</Menu.Item>
							<Menu.Item key="population">
								<Link to="/">Population</Link>
							</Menu.Item>
							<Menu.Item key="gaps-in-care">
								<Link to="/">Gaps in Care</Link>
							</Menu.Item>
							<Menu.Item key="goal-tracker">
								<Link to="/goal-tracker">Goal Tracker</Link>
							</Menu.Item>
						</Menu>
					</div>
				</div>
			</Layout.Header>
			<Layout.Content className="h-full min-h-screen bg-slate-50 pt-16">
				<div className="m-auto mt-6 max-w-screen-xl space-y-6">
					<section>
						<div className="flex space-x-6">
							<div className="w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-lg">
								<PageHeader
									title="Report"
									breadcrumb={
										<Breadcrumb>
											<Breadcrumb.Item>
												<a href="/">Home</a>
											</Breadcrumb.Item>

											<Breadcrumb.Item>Reports</Breadcrumb.Item>
										</Breadcrumb>
									}
								/>
								<div className="px-6 pb-6">
									<Select
										showSearch
										placeholder="Filter by measures"
										optionFilterProp="children"
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
									>
										<Select.Option value="AAB">AAB</Select.Option>
										<Select.Option value="AAP">AAP</Select.Option>
										<Select.Option value="ABA">ABA</Select.Option>
									</Select>
									<div className=" py-4">
										<Table columns={columns} dataSource={data} />
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

export default Reports;
