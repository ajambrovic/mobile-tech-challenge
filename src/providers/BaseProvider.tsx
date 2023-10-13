import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Tournaments from '../screens/tournaments/Tournaments';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Container from '../components/Container';
import H4 from '../components/H4';
import { AddTournament } from '../screens/tournaments/components/AddTournament';

const BaseProvider = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Container>
          <H4>Faceit Tournaments</H4>
          <Tournaments />
          <AddTournament />
        </Container>
      </SafeAreaProvider>
    </Provider>
  );
};

export default BaseProvider;
