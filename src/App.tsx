import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components';
import MainPage from './pages/MainPage/MainPage';

function App() {

	const queryClient = new QueryClient();

	return (
		// <ReactColorA11y  flipBlackAndWhite={true}>
			<QueryClientProvider client={queryClient}>
			<Header />
				<MainPage />
			</QueryClientProvider>
		// </ReactColorA11y>
	);
}

export default App;
