import { useEffect } from 'react';

const useDataFetching = (url, actionCreator) => {
  useEffect(() => {
    // Fetch data from API and dispatch action to add it to Redux store
    fetch(url)
      .then((response) => response.json())
      .then((data) => actionCreator(data));
  }, [url, actionCreator]);
};

export default useDataFetching;