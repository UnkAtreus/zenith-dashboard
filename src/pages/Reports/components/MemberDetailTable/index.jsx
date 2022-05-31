import React, { useEffect, useState } from 'react';

import { Button, Divider, PageHeader, Breadcrumb, Table, Row, Statistic, Tabs, Descriptions, Col } from 'antd';
import dayjs from 'dayjs';

import { FCTMEASOUT } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function MemberDetailTable({ setStep, memberListRecord, ratesummaryRecord }) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const { TabPane } = Tabs;
	const columns = makeColumn(FCTMEASOUT);

	useEffect(() => {
		setIsLoading(true);
		fetch(`https://627908956ac99a91066137ab.mockapi.io/FCTMEASOUT`)
			.then(res => res.json())
			.then(data => {
				setData(data);
			})
			.finally(() => {
				setIsLoading(false);
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
							<span
								className="cursor-pointer"
								onClick={() => {
									setStep(0);
								}}
							>
								{localStorage.getItem('population')}
							</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<span
								className="cursor-pointer"
								onClick={() => {
									setStep(1);
								}}
							>
								Member List
							</span>
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
					<Col span={4}>
						<Statistic title="Measure" value={ratesummaryRecord.CHVMEASURE} />
					</Col>

					<Divider type="vertical" className="h-auto" />

					<Col span={8}>
						<Descriptions size="small" column={2}>
							<Descriptions.Item label="Firstname">{memberListRecord.PROV_FIRST_NAME}</Descriptions.Item>
							<Descriptions.Item label="Lastname">{memberListRecord.PROV_LAST_NAME}</Descriptions.Item>
							<Descriptions.Item label="Gender">{memberListRecord.GENDER}</Descriptions.Item>
							<Descriptions.Item label="BirthDate">
								{dayjs(memberListRecord.DOB).format('DD/MM/YYYY')}
							</Descriptions.Item>
						</Descriptions>
					</Col>
				</Row>
			</PageHeader>
			<div className="px-6 pb-6">
				<div className=" py-4">
					<Table columns={columns} dataSource={data} scroll={{ x: 1200 }} loading={isLoading} />
				</div>
			</div>
		</div>
	);
}

export default MemberDetailTable;
