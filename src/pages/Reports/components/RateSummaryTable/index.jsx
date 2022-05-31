import React, { useEffect, useState } from 'react';

import { Button, PageHeader, Breadcrumb, Table, Row, Statistic, Col } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

import { RATE_SUMMARY } from '@/store/table_column';
import makeColumn from '@/utilities/makeColumn';

function RateSummaryTable({ setStep, setRateSummaryRecord }) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const column = makeColumn(RATE_SUMMARY).map(col => {
		if (col.key === 'CHVMEASURE') {
			return {
				...col,
				render: (text, record) => (
					<div onClick={() => setStep(1)} className="cursor-pointer text-blue-500">
						{text}
					</div>
				)
			};
		}
		return col;
	});

	useEffect(() => {
		setIsLoading(true);
		fetch(`https://627908956ac99a91066137ab.mockapi.io/RATE_SUMMARY`)
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
				title="Rate Summary"
				onBack={() => navigate(`/`)}
				breadcrumb={
					<Breadcrumb>
						<Breadcrumb.Item>
							<a href="/">Dashboard</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{localStorage.getItem('population')}</Breadcrumb.Item>
					</Breadcrumb>
				}
				extra={[
					<Button key="1" type="primary">
						Export
					</Button>
				]}
			/>

			<div className="px-6 pb-6">
				<div className=" py-4">
					<Table
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
