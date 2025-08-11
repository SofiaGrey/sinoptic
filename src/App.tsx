import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { ROUTES } from './constants/constants';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import MainPage from './pages/MainPage/MainPage';
import { WeatherPage } from './pages/WeatherPage/WeatherPage';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route
						path={ROUTES.main}
						element={<MainPage />}
					/>
					<Route
						path={ROUTES.weater}
						element={<WeatherPage />}
					/>
					<Route
						path={ROUTES.error}
						element={<ErrorPage />}
					/>
					<Route
						path="*"
						element={<Navigate to={ROUTES.error} />}
					/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
