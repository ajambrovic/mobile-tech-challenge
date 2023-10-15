import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Container from 'src/components/Container';
import H2 from 'src/components/H2';
import Tournaments from 'src/screens/tournaments/Tournaments';
import { AddTournament } from 'src/screens/tournaments/components/AddTournament';
import { Search } from 'src/screens/tournaments/components/Search';
import store from 'src/store';

const BaseProvider = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Container>
          <Search />
          <H2>Faceit Tournaments</H2>
          <Tournaments />
          <AddTournament />
        </Container>
      </SafeAreaProvider>
    </Provider>
  );
};

export default BaseProvider;
