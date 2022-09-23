import '../styles/globals.css';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import { theme } from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import store from '../app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const clientSideEmotionCache = createEmotionCache();
function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}) {
	return (
		<CacheProvider value={emotionCache}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		</CacheProvider>
	);
}

export default MyApp;
