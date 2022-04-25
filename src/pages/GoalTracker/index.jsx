import react, { useEffect, useState } from 'react';
import { Button, Input, Layout, Tag, Menu, Divider, PageHeader, Breadcrumb, Select, Table, Space } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { Column, Heatmap, Area } from '@ant-design/charts';
import { UserOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import Logo from '@/assets/images/mihalik-group-logo.png';
import { HeatMapData } from './constant';
import { Link } from 'react-router-dom';

function GoalTracker() {
	const [dataHeatmap, setDataHeatmap] = useState([]);
	const [dataAres, setDataAtea] = useState([]);

	const asyncFetch = () => {
		fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
			.then(response => response.json())
			.then(json => setDataAtea(json))
			.catch(error => {
				console.log('fetch data failed', error);
			});
		fetch('https://gw.alipayobjects.com/os/basement_prod/a719cd4e-bd40-4878-a4b4-df8a6b531dfe.json')
			.then(response => response.json())
			.then(json => setDataHeatmap(json))
			.catch(error => {
				console.log('fetch data failed', error);
			});
	};
	useEffect(() => {
		asyncFetch();
	}, []);

	const data = [
		{
			type: 'ABC',
			sales: 38
		},
		{
			type: 'ACB',
			sales: 52
		},
		{
			type: 'CAB',
			sales: 61
		},
		{
			type: 'CBA',
			sales: 145
		},
		{
			type: 'BAC',
			sales: 48
		},
		{
			type: 'BCA',
			sales: 38
		},
		{
			type: 'DBA',
			sales: 38
		},
		{
			type: 'BDA',
			sales: 38
		}
	];

	const configAreaData = {
		height: 500,
		data: dataAres,
		xField: 'timePeriod',
		yField: 'value',
		xAxis: {
			range: [0, 1]
		}
	};
	const configHeatMap = {
		width: 600,
		height: 500,
		autoFit: false,
		data: dataHeatmap,
		xField: 'Month of Year',
		yField: 'District',
		colorField: 'AQHI',
		color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
		meta: {
			'Month of Year': {
				type: 'cat'
			}
		}
	};

	const config = {
		data,
		xField: 'type',
		yField: 'sales',
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6
			}
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false
			}
		},
		meta: {
			type: {
				alias: 'type'
			},
			sales: {
				alias: 'number'
			}
		}
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
						<Menu mode="horizontal" defaultSelectedKeys={['goal-tracker']} className="flex-1 justify-end">
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
						<div className="mb-6 w-full flex-1 overflow-hidden rounded-2xl bg-white shadow-lg">
							<PageHeader
								title="Goal Tracker"
								breadcrumb={
									<Breadcrumb>
										<Breadcrumb.Item>
											<a href="/">Home</a>
										</Breadcrumb.Item>

										<Breadcrumb.Item>Goal Tracker</Breadcrumb.Item>
									</Breadcrumb>
								}
							/>
							<div className="px-6 pb-6">
								<Column {...config} />
							</div>
						</div>
						<div className="mb-6 w-full flex-1 overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
							<div className="flex space-x-6">
								<div className="flex-1">
									<Heatmap {...configHeatMap} />
								</div>
								<div className="flex-1">
									<Area {...configAreaData} />
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

export default GoalTracker;
