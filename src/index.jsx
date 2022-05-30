import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './utilities/App';
import './service/firebase.js';
import './index.css';

import 'antd/dist/antd.less';
import '@ant-design/flowchart/dist/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
