import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';

export const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Search tournaments"
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );

  function updateSearch(updatedSearch: string) {
    setSearch(updatedSearch);
  }
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});
