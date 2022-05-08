import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Reports from '@/pages/Reports';
import GoalTracker from './pages/GoalTracker';

const GuestRoute = ({ element }) => {
	return <Route {...element} />;
};

function App() {
	const ProtectedRoute = ({ children }) => {
		const token = localStorage.getItem('token');

		if (!token) {
			return <Navigate to="/login" replace />;
		}

		return children;
	};

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/goal-tracker"
					element={
						<ProtectedRoute>
							<GoalTracker />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/reports"
					element={
						<ProtectedRoute>
							<Reports />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					index
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="*"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
