import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import 'antd/dist/antd.less';
import '@ant-design/flowchart/dist/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
