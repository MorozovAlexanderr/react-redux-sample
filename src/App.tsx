import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyles from './assets/styles/Global';
import { store } from './app/store';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
