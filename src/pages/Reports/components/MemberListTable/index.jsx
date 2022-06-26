import React, { useEffect, useState } from 'react';

import { Button, PageHeader, Breadcrumb, Table, Row, Statistic, Col } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import dayjs from 'dayjs';

import FctmeasoutService from '@/service/fctmeasout';
import { GAPS_IN_CARE } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function MemberListTable({ setStep, ratesummaryRecord, setMemberListRecord }) {
	const [data, setData] = useState([]);
	const [column, setColumn] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const haldleExport = () => {
		const excel = new Excel();
		excel.addSheet('MemberList').addColumns(column).addDataSource(data).saveAs('Member List.xlsx');
	};

	useEffect(() => {
		setIsLoading(true);
		const popId = JSON.parse(localStorage.getItem('population')).DBLENTITY_ID;
		if (popId) {
			FctmeasoutService.list(popId, ratesummaryRecord.CHVMEASURE)
				.then(({ data, columns }) => {
					setData(data);
					const column = columns.map(col => {
						if (col.key === 'DBLENTITY_ID' || col.key === 'DBLREP_POP_ID' || col.key === 'CHVLOB') {
							return {
								...col,
								className: 'hidden'
							};
						}
						if (col.key === 'NUM1_DATE1' || col.key === 'IESD') {
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
								{JSON.parse(localStorage.getItem('population')).CHVREP_POP_NAME}
							</span>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Member List</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={[
					<Button onClick={() => haldleExport()} key="1" type="primary">
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
						scroll={{ x: 2400 }}
						rowKey={record => record.CHVMEMNBR}
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
