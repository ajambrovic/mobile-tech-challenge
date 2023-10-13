import React from 'react';
import { ActivityIndicator } from 'react-native';
import H6 from 'src/components/H6';

export const TournamentsInitialLoader = () => {
  return (
    <>
      <ActivityIndicator size={'large'} />
      <H6>Loading tournaments ...</H6>
    </>
  );
};
