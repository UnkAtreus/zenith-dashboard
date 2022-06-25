import React, { useEffect, useState } from 'react';

import { Button, Divider, PageHeader, Breadcrumb, Table, Row, Statistic, Tabs, Descriptions, Col } from 'antd';
import dayjs from 'dayjs';

import MemberDetailService from '@/service/memberDetail';
import { FCTMEASOUT } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function MemberDetailTable({ setStep, memberListRecord, ratesummaryRecord }) {
	const [data, setData] = useState([]);
	const [column, setColumn] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const { TabPane } = Tabs;

	const fetchData = type => {
		setIsLoading(true);
		const userId = memberListRecord.CHVMEMNBR;
		if (userId) {
			MemberDetailService.list(userId, type ?? 'claim')
				.then(({ data, columns }) => {
					setData(data);
					const column = columns.map(col => {
						if (
							col.key === 'DTMSERVICE_DT' ||
							col.key === 'DTMFROMDT' ||
							col.key === 'DTMTHRUDT' ||
							col.key === 'DTMPRES_FILL_DT'
						) {
							return {
								...col,
								render: (text, record) => {
									if (text) {
										return <div>{dayjs(text).format('MMM DD,YYYY')}</div>;
									}
								}
							};
						}
						return col;
					});
					setColumn(column);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	useEffect(() => {
		fetchData();
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
								{JSON.parse(localStorage.getItem('population')).CHVREP_POP_NAME}
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
					<Tabs defaultActiveKey="claim" size="small" type="card" onChange={type => fetchData(type)}>
						<TabPane tab="Claim" key="claim" />
						<TabPane tab="Lab" key="lab" />
						<TabPane tab="Rx" key="rx" />
						<TabPane tab="Supply" key="supply" />
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
					<Table
						rowKey={record => record.CHVCLAIMID + record.DBLLINENBR}
						columns={column}
						dataSource={data}
						scroll={{ x: 1200 }}
						loading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}

export default MemberDetailTable;
