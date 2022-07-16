import React, { useEffect, useState } from 'react';

import { Column, Heatmap, Area, Progress, Pie, Line } from '@ant-design/charts';
import { TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, PageHeader, Breadcrumb, Row, Col, Statistic, Divider } from 'antd';
import { Link } from 'react-router-dom';

import Logo from '@/assets/images/mihalik-group-logo.png';
import { MENUITEMS } from '@/store/menu_title';

function GoalTracker() {
	const [dataHeatmap, setDataHeatmap] = useState([]);
	const [dataAres, setDataAtea] = useState([]);
	const [dataLine, setDataLine] = useState([]);

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
		fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
			.then(response => response.json())
			.then(json => setDataLine(json))
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
	const configLine = {
		data: dataLine,
		xField: 'year',
		yField: 'value',
		seriesField: 'category',
		xAxis: {
			type: 'time'
		},
		yAxis: {
			label: {
				// 数值格式化为千分位
				formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`)
			}
		}
	};
	const configPie = {
		appendPadding: 10,
		data,
		angleField: 'sales',
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
						<Menu
							mode="horizontal"
							defaultSelectedKeys={['goal-tracker']}
							className="flex-1 justify-end"
							items={MENUITEMS}
						/>
					</div>
				</div>
			</Layout.Header>
			<Layout.Content className="h-full min-h-screen bg-slate-50 pt-16">
				<div className="m-auto my-6 max-w-screen-xl">
					<section>
						<Row gutter={[24, 24]}>
							<Col span={6}>
								<div className="w-full  rounded-2xl bg-white p-6 shadow-lg">
									<Statistic title="Total Population" value={684} />
									<Progress autoFit={false} height={24} color={'#384ad7'} percent={1} />
								</div>
							</Col>
							<Col span={6}>
								<div className="w-full rounded-2xl bg-white p-6 shadow-lg">
									<Statistic title="Male Population" value={445} />
									<Progress autoFit={false} height={24} color={'#384ad7'} percent={0.65} />
								</div>
							</Col>
							<Col span={6}>
								<div className="w-full rounded-2xl bg-white p-6 shadow-lg">
									<Statistic title="Female Population" value={171} />
									<Progress autoFit={false} height={24} color={'#384ad7'} percent={0.25} />
								</div>
							</Col>
							<Col span={6}>
								<div className="w-full rounded-2xl bg-white p-6 shadow-lg">
									<Statistic title="Special Population" value={68} />
									<Progress autoFit={false} height={24} color={'#384ad7'} percent={0.1} />
								</div>
							</Col>
							<Col span={6}>
								<div className="h-full w-full rounded-2xl bg-white px-6 py-10 shadow-lg">
									<div className="mb-4 text-xl font-medium">Recent Update</div>
									<div className=" space-y-2 overflow-auto">
										{Array(3)
											.fill(0)
											.map((_, index) => (
												<div key={`project-card__` + index}>
													<div className="flex items-center space-x-3">
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
							<Col span={18}>
								<div className="w-full rounded-2xl bg-white p-6 shadow-lg">
									<div className="mb-4 text-xl font-medium">Total Population</div>
									<Column {...config} />
								</div>
							</Col>

							<Col span={24}>
								<div className="w-full rounded-2xl bg-white px-6 py-10 shadow-lg">
									<div className="mb-4 text-xl font-medium">Rate (Lowest 8)</div>
									<Pie {...configPie} />
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

export default GoalTracker;
