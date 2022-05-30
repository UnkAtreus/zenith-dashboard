import React, { useEffect, useState } from 'react';

import { Button, Divider, PageHeader, Breadcrumb, Table, Row, Statistic, Tabs, Descriptions, Col } from 'antd';

import { FCTMEASOUT } from '@/store/table_column';

function MemberDetailTable() {
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
	return (
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
	);
}

export default MemberDetailTable;
