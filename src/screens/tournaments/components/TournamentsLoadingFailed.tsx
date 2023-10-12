import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const TournamentsLoadingFailed = ({
  retryFetchData,
}: {
  retryFetchData: () => void;
}) => {
  return (
    <>
      <Input>Something went wrong.</Input>
      <Button onPress={retryFetchData}>Retry</Button>
    </>
  );
};
