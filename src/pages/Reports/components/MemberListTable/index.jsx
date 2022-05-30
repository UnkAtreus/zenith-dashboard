import React from 'react';

import { Button, PageHeader, Breadcrumb, Table, Row, Statistic, Col } from 'antd';

import { GAPS_IN_CARE } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function MemberListTable() {
	const column = makeColumn(GAPS_IN_CARE);

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
					<Col span={2}>
						<Statistic title="Sub Measure" value="COLA" />
					</Col>
				</Row>
			</PageHeader>
			<div className="px-6 pb-6">
				<div className=" py-4">
					<Table columns={column} dataSource={null} scroll={{ x: 1200 }} />
				</div>
			</div>
		</div>
	);
}

export default MemberListTable;
