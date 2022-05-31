import React, { useEffect, useState } from 'react';

import { Button, PageHeader, Breadcrumb, Table, Row, Statistic, Col } from 'antd';

import { GAPS_IN_CARE } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function MemberListTable({ setStep, ratesummaryRecord, setMemberListRecord }) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const column = makeColumn(GAPS_IN_CARE);

	useEffect(() => {
		setIsLoading(true);
		fetch(`https://627908956ac99a91066137ab.mockapi.io/GAPS_IN_CARE`)
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
				title="Member List"
				onBack={() => setStep(0)}
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
						<Breadcrumb.Item>Member List</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={[
					<Button key="1" type="primary">
						Export
					</Button>
				]}
			>
				<Row>
					<Col span={4}>
						<Statistic title="Measure" value={ratesummaryRecord.CHVMEASURE} />
					</Col>
				</Row>
			</PageHeader>
			<div className="px-6 pb-6">
				<div className=" py-4">
					<Table
						columns={column}
						dataSource={data}
						scroll={{ x: 1200 }}
						onRow={(record, rowIndex) => {
							return {
								onDoubleClick: event => {
									setMemberListRecord(record);
									setStep(2);
								}
							};
						}}
						loading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}

export default MemberListTable;
