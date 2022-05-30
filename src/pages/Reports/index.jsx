// http://13.78.224.192:8002/api/v1/ratesheets?userEmail=ihp@yopmail.com&projectId=18f474e0-d44d-4c32-9573-720e71d833af&population=Imperial%20Health%20Plan%20of%20California%20MAPD&measure=&pageSize=50&pageIndex=1
import React, { useState } from 'react';

import { Layout, Menu } from 'antd';

import MemberDetailTable from './components/MemberDetailTable';
import MemberListTable from './components/MemberListTable';
import RateSummaryTable from './components/RateSummaryTable';

import Logo from '@/assets/images/mihalik-group-logo.png';
import { MENUITEMS } from '@/store/menu_title';

function Reports() {
	const [step, setStep] = useState(0);
	// const data = [
	// 	{
	// 		key: '1',
	// 		MEASURE: 'John Brown',
	// 		SUB_MEASURE: 32,
	// 		ELIG_POP: 'New York No. 1 Lake Park'
	// 	},
	// 	{
	// 		key: '2',
	// 		MEASURE: 'Jim Green',
	// 		SUB_MEASURE: 42,
	// 		ELIG_POP: 'London No. 1 Lake Park'
	// 	},
	// 	{
	// 		key: '3',
	// 		MEASURE: 'Joe Black',
	// 		SUB_MEASURE: 32,
	// 		ELIG_POP: 'Sidney No. 1 Lake Park'
	// 	}
	// ];

	return (
		<Layout>
			<Layout.Header className="fixed z-10 flex w-full items-center bg-white shadow">
				<div className="flex flex-1 items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="relative flex h-14 w-14">
							<img src={Logo} alt="" />
						</div>
						<div className="flex items-center text-2xl">ZENITH</div>
					</div>
					<div className="flex flex-1 justify-end">
						<Menu
							mode="horizontal"
							defaultSelectedKeys={['reports']}
							className="flex-1 justify-end"
							items={MENUITEMS}
						/>
					</div>
				</div>
			</Layout.Header>
			<Layout.Content className="h-full min-h-screen bg-slate-50 pt-16">
				<div className="m-auto mt-6 max-w-screen-xl space-y-6">
					<section>
						<div className="flex space-x-6">
							{step === 0 && <RateSummaryTable setStep={setStep} />}
							{step === 1 && <MemberListTable setStep={setStep} />}
							{step === 2 && <MemberDetailTable setStep={setStep} />}
						</div>
					</section>
				</div>
			</Layout.Content>
			{/* <Layout.Footer></Layout.Footer> */}
		</Layout>
	);
}

export default Reports;
