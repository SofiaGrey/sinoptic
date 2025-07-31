import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components';
import MainPage from './pages/MainPage/MainPage';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<MainPage />
		</QueryClientProvider>
	);
}

export default App;
