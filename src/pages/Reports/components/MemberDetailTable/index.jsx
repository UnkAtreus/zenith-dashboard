import React, { useEffect, useState } from 'react';

import { Button, Divider, PageHeader, Breadcrumb, Table, Row, Statistic, Tabs, Descriptions, Col } from 'antd';

import { FCTMEASOUT } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function MemberDetailTable({ setStep }) {
	const [data, setData] = useState([]);

	const { TabPane } = Tabs;
	const columns = makeColumn(FCTMEASOUT);

	useEffect(() => {
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
				onBack={() => setStep(1)}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>
							<a href="/">Dashboard</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a
								href=""
								onClick={() => {
									setStep(0);
								}}
							>
								IDK of Thailand
							</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a
								href=""
								onClick={() => {
									setStep(1);
								}}
							>
								Member List
							</a>
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
