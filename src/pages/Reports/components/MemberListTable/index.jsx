import React, { useEffect, useState } from 'react';

import { Button, PageHeader, Breadcrumb, Table, Row, Statistic, Col } from 'antd';

import { GAPS_IN_CARE } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function MemberListTable({ setStep }) {
	const [data, setData] = useState([]);
	const column = makeColumn(GAPS_IN_CARE);
	useEffect(() => {
		fetch(`https://627908956ac99a91066137ab.mockapi.io/GAPS_IN_CARE`)
			.then(res => res.json())
			.then(data => {
				setData(data);
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
							<a
								href=""
								onClick={() => {
									setStep(0);
								}}
							>
								IDK of Thailand
							</a>
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
					<Col span={2}>
						<Statistic title="Measure" value="COCA" />
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
								onClick: event => {
									setStep(2);
								}
							};
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default MemberListTable;
