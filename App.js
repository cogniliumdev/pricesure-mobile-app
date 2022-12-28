import Navigation from './src/navigation/Navigation';
import { store } from './src/store/store.js'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}