import { SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadTournamentsDataAction } from '../../../domain/tournaments/tournamentsActions';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Search tournaments"
        onChangeText={updateSearch}
        value={searchQuery}
      />
    </View>
  );

  function updateSearch(updatedSearch: string) {
    setSearchQuery(updatedSearch);
    dispatch(loadTournamentsDataAction(1, updatedSearch));
  }
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});
