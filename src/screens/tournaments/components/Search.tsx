import { SearchBar } from '@rneui/themed';
import debounce from 'lodash.debounce';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { INITIAL_TOURNAMENTS_PAGE } from 'src/constants/api';
import { loadTournamentsDataAction } from 'src/domain/tournaments/tournamentsActions';

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const debounceSearching = useMemo(
    () =>
      debounce((searchItem: string) => {
        dispatch(
          loadTournamentsDataAction(INITIAL_TOURNAMENTS_PAGE, searchItem)
        );
      }, 500),
    [dispatch]
  );

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
    debounceSearching(updatedSearch);
  }
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});
