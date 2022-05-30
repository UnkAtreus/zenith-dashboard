import React from 'react';

import { Link } from 'react-router-dom';

export const MENUITEMS = [
	{
		label: [
			<Link to="/" key="dashboard">
				Dashboard
			</Link>
		],
		key: 'dashboard'
	},
	{
		label: [
			<Link to="/reports" key="reports">
				Reports
			</Link>
		],
		key: 'reports'
	},
	{
		label: [
			<Link to="/goal-tracker" key="goal-tracker">
				Goal Tracker
			</Link>
		],
		key: 'goal-tracker'
	},
	{
		label: [
			<Link to="/" key="population">
				Population
			</Link>
		],
		key: 'population'
	},
	{
		label: [
			<Link to="/" key="gaps-in-care">
				Gaps in Care
			</Link>
		],
		key: 'gaps-in-care'
	}
];
