import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Reports from '@/pages/Reports';
import GoalTracker from './pages/GoalTracker';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/goal-tracker" element={<GoalTracker />} />
				<Route path="/reports" element={<Reports />} />
				<Route path="/dashboard" element={<Home />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
