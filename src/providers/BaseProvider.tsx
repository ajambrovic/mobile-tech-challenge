import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Tournaments from '../screens/tournaments/Tournaments';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const BaseProvider = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Tournaments />
      </SafeAreaProvider>
    </Provider>
  );
};

export default BaseProvider;
