import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadTournamentsDataAction } from '../../../domain/tournaments/tournamentsActions';

export const Search = () => {
  // just use from redux
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

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
    dispatch(loadTournamentsDataAction(1, updatedSearch));
  }
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});
