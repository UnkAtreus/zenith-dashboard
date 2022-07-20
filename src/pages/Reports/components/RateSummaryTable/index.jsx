import React, { useCallback, useEffect, useState } from 'react';

import { Button, PageHeader, Breadcrumb, Table, Row, Statistic, Col } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { Navigate, useNavigate } from 'react-router-dom';

import RateSummaryService from '@/service/rateSummary';
import { MEASURE_ID, RATE_SUMMARY } from '@/store/table_column';
import makeDropdown from '@/utilities/makeDropdown';

function RateSummaryTable({ setStep, setRateSummaryRecord }) {
	const [data, setData] = useState([]);
	const [column, setColumn] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const filter_meature = makeDropdown(MEASURE_ID);

	const navigate = useNavigate();

	const haldleExport = () => {
		const excel = new Excel();
		excel.addSheet('Rate Summary').addColumns(column).addDataSource(data).saveAs('Rate Summary.xlsx');
	};

	useEffect(() => {
		setIsLoading(true);
		const popId = JSON.parse(localStorage.getItem('population')).DBLENTITY_ID;
		if (popId) {
			RateSummaryService.list(popId)
				.then(({ data, columns }) => {
					setData(data);
					const column = columns.map(col => {
						if (col.key === 'CHVMEASURE') {
							return {
								...col,
								filters: filter_meature,
								filterMode: 'tree',
								filterSearch: true,
								onFilter: (value, record) => record.CHVMEASURE.startsWith(value),
								render: (text, record) => (
									<div key={text} onClick={() => setStep(1)} className="cursor-pointer text-blue-500">
										{text}
									</div>
								)
							};
						}
						if (col.key === 'DBLENTITY_ID' || col.key === 'DBLMASTER_POP_ID' || col.key === 'CHVLOB') {
							return {
								...col,
								className: 'hidden'
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
				title="Rate Summary"
				onBack={() => navigate(`/`)}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>
							<a href="/">Dashboard</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							{JSON.parse(localStorage.getItem('population')).CHVREP_POP_NAME}
						</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={[
					<Button
						key="1"
						type="primary"
						onClick={() => {
							haldleExport();
						}}
					>
						Export
					</Button>
				]}
			/>

			<div className="px-6 pb-6 ">
				<div className=" py-4 bg-white">
					<Table
						rowKey={record => record.CHVSUMMARY_TAG}
						columns={column}
						dataSource={data}
						scroll={{ x: 1200 }}
						onRow={(record, rowIndex) => {
							return {
								onClick: event => {
									console.log(record);
									setRateSummaryRecord(record);
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

export default RateSummaryTable;
