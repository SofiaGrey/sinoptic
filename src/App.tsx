import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components';
import MainPage from './pages/MainPage/MainPage';
import { WeatherPage } from './pages/WeatherPage/WeatherPage';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage/>}/>
				<Route path='/weather' element={<WeatherPage/>}/>
			</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
