import react, { useEffect, useState } from 'react';
import { Button, Input, Layout, Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { Line } from '@ant-design/charts';

function Home() {
	const data = [
		{ year: '1991', value: 3 },
		{ year: '1992', value: 4 },
		{ year: '1993', value: 3.5 },
		{ year: '1994', value: 5 },
		{ year: '1995', value: 4.9 },
		{ year: '1996', value: 6 },
		{ year: '1997', value: 7 },
		{ year: '1998', value: 9 },
		{ year: '1999', value: 13 }
	];

	const config = {
		data,
		xField: 'year',
		yField: 'value',
		point: {
			size: 5,
			shape: 'diamond'
		}
	};

	const Pin = () => (
		<svg
			viewBox="0 0 16 16"
			width="1em"
			height="1em"
			focusable="false"
			role="img"
			aria-label="geo alt fill"
			xmlns="http://www.w3.org/2000/svg"
			fill="#e93f63"
		>
			<g>
				<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
			</g>
		</svg>
	);

	return (
		<Layout>
			<Layout.Header className="fixed z-10 w-full bg-[#112b64]"></Layout.Header>
			<div className="mb-16"></div>
			<Layout.Content className="bg-white">
				<Line {...config} />
			</Layout.Content>
			{/* <Layout.Footer></Layout.Footer> */}
		</Layout>
	);
}

export default Home;
