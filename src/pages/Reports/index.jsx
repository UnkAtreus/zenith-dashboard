// http://13.78.224.192:8002/api/v1/ratesheets?userEmail=ihp@yopmail.com&projectId=18f474e0-d44d-4c32-9573-720e71d833af&population=Imperial%20Health%20Plan%20of%20California%20MAPD&measure=&pageSize=50&pageIndex=1
import React, { useEffect, useState } from 'react';

import {
	Button,
	Layout,
	Menu,
	Divider,
	PageHeader,
	Breadcrumb,
	Table,
	Row,
	Statistic,
	Tabs,
	Descriptions,
	Col
} from 'antd';
import { Link } from 'react-router-dom';

import Logo from '@/assets/images/mihalik-group-logo.png';
import { FCTMEASOUT } from '@/store/table_column';

function Reports() {
	const [data, setData] = useState([]);

	const { TabPane } = Tabs;

	const columns = [
		{
			title: 'DBLREP_POP_ID',
			dataIndex: 'DBLREP_POP_ID',
			key: 'DBLREP_POP_ID'
		},
		{
			title: 'DBLENTITY_ID',
			dataIndex: 'DBLENTITY_ID',
			key: 'DBLENTITY_ID'
		},
		{
			title: 'CHVLOB',
			dataIndex: 'CHVLOB',
			key: 'CHVLOB'
		},
		{
			title: 'CHVMEMNBR',
			dataIndex: 'CHVMEMNBR',
			key: 'CHVMEMNBR'
		},
		{
			title: 'DBLAGE_MO',
			dataIndex: 'DBLAGE_MO',
			key: 'DBLAGE_MO'
		},
		{
			title: 'DBLAGE',
			dataIndex: 'DBLAGE',
			key: 'DBLAGE'
		},
		{
			title: 'DBLSTRAT_ID',
			dataIndex: 'DBLSTRAT_ID',
			key: 'DBLSTRAT_ID'
		},
		{
			title: 'CE',
			dataIndex: 'CE',
			key: 'CE'
		},
		{
			title: 'BE',
			dataIndex: 'BE',
			key: 'BE'
		},
		{
			title: 'AD',
			dataIndex: 'AD',
			key: 'AD'
		},
		{
			title: 'IESD',
			dataIndex: 'IESD',
			key: 'IESD'
		},
		{
			title: 'DEN1',
			dataIndex: 'DEN1',
			key: 'DEN1'
		},
		{
			title: 'EXCL_OPT',
			dataIndex: 'EXCL_OPT',
			key: 'EXCL_OPT'
		},
		{
			title: 'EXCL_OPT_DATE',
			dataIndex: 'EXCL_OPT_DATE',
			key: 'EXCL_OPT_DATE'
		},
		{
			title: 'EXCL_REQ',
			dataIndex: 'EXCL_REQ',
			key: 'EXCL_REQ'
		},
		{
			title: 'EXCL_REQ_DATE',
			dataIndex: 'EXCL_REQ_DATE',
			key: 'EXCL_REQ_DATE'
		},
		{
			title: 'EXCL_HOSP',
			dataIndex: 'EXCL_HOSP',
			key: 'EXCL_HOSP'
		},
		{
			title: 'EXCL_DECEASED',
			dataIndex: 'EXCL_DECEASED',
			key: 'EXCL_DECEASED'
		},
		{
			title: 'NUM1',
			dataIndex: 'NUM1',
			key: 'NUM1'
		},
		{
			title: 'SNUM1',
			dataIndex: 'SNUM1',
			key: 'SNUM1'
		},
		{
			title: 'NUM1_DATE1',
			dataIndex: 'NUM1_DATE1',
			key: 'NUM1_DATE1'
		},
		{
			title: 'AGE',
			dataIndex: 'AGE',
			key: 'AGE'
		},
		{
			title: 'CHVGENDER',
			dataIndex: 'CHVGENDER',
			key: 'CHVGENDER'
		}
	];

	useEffect(() => {
		const col_tmp = [];
		const col = [];
		FCTMEASOUT[0].split(',').map(item => {
			col_tmp.push(item.trim());
			// col.push({
			// 	title: item,
			// 	dataIndex: item,
			// 	key: item
			// });
			// console.log(item);
		});

		col_tmp.map(item => {
			col.push({
				title: item,
				dataIndex: item,
				key: item
			});
		});

		fetch(`https://627908956ac99a91066137ab.mockapi.io/FCTMEASOUT`)
			.then(res => res.json())
			.then(data => {
				setData(data);
			});
	}, []);

	// const data = [
	// 	{
	// 		key: '1',
	// 		MEASURE: 'John Brown',
	// 		SUB_MEASURE: 32,
	// 		ELIG_POP: 'New York No. 1 Lake Park'
	// 	},
	// 	{
	// 		key: '2',
	// 		MEASURE: 'Jim Green',
	// 		SUB_MEASURE: 42,
	// 		ELIG_POP: 'London No. 1 Lake Park'
	// 	},
	// 	{
	// 		key: '3',
	// 		MEASURE: 'Joe Black',
	// 		SUB_MEASURE: 32,
	// 		ELIG_POP: 'Sidney No. 1 Lake Park'
	// 	}
	// ];

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
					<section>
						<div className="flex space-x-6">
							<div className="w-full flex-1 overflow-hidden rounded bg-white shadow-lg">
								<PageHeader
									title="Member Details"
									onBack={() => null}
									breadcrumb={
										<Breadcrumb>
											<Breadcrumb.Item>
												<a href="/">Dashboard</a>
											</Breadcrumb.Item>
											<Breadcrumb.Item>
												<a href="/">IDK of Thailand</a>
											</Breadcrumb.Item>
											<Breadcrumb.Item>
												<a href="/">Member List</a>
											</Breadcrumb.Item>

											<Breadcrumb.Item>Member Details</Breadcrumb.Item>
										</Breadcrumb>
									}
									extra={[
										<Button key="1" type="primary">
											Export
										</Button>
									]}
									footer={
										<Tabs defaultActiveKey="1" size="small" type="card">
											<TabPane tab="Claim" key="1" />
											<TabPane tab="Lab" key="2" />
											<TabPane tab="Rx" key="3" />
											<TabPane tab="Supply" key="4" />
										</Tabs>
									}
								>
									<Row>
										<Col span={2}>
											<Statistic title="Measure" value="COCA" />
										</Col>
										<Col span={2}>
											<Statistic title="Sub Measure" value="COLA" />
										</Col>
										<Divider type="vertical" className="h-auto" />

										<Col span={7}>
											<Descriptions size="small" column={2}>
												<Descriptions.Item label="Firstname">Jone</Descriptions.Item>
												<Descriptions.Item label="Lastname">Doe</Descriptions.Item>
												<Descriptions.Item label="Gender">Male</Descriptions.Item>
												<Descriptions.Item label="BirthDate">25/02/2077</Descriptions.Item>
											</Descriptions>
										</Col>
									</Row>
								</PageHeader>
								<div className="px-6 pb-6">
									<div className=" py-4">
										<Table columns={columns} dataSource={data} scroll={{ x: 1200 }} />
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
