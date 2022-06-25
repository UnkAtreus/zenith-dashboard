import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import GoalTracker from './pages/GoalTracker';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Reports from '@/pages/Reports';

function App() {
	const ProtectedRoute = ({ children }) => {
		// const token = localStorage.getItem('token');

		// if (!token) {
		// 	return <Navigate to="/login" replace />;
		// }
		// if (!userRecoil.isAuthenticated) {
		// 	const [user] = useAuthState(getAuth(firebaseApp));
		// 	setUserRecoil({
		// 		isAuthenticated: user !== null,
		// 		user: user
		// 	});
		// }
		// console.log(userRecoil);

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
