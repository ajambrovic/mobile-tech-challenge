import React from 'react';
import { ActivityIndicator } from 'react-native';
import Input from '../../../components/Input';

export const TournamentsInitialLoader = () => {
  return (
    <>
      <ActivityIndicator size={'large'} />
      <Input>Loading tournaments ...</Input>
    </>
  );
};
