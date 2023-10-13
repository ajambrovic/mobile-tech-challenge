import React from 'react';
import Button from 'src/components/Button';
import H6 from 'src/components/H6';

export const TournamentsLoadingFailed = ({
  retryFetchData,
}: {
  retryFetchData: () => void;
}) => {
  return (
    <>
      <H6>Something went wrong.</H6>
      <Button onPress={retryFetchData}>Retry</Button>
    </>
  );
};
