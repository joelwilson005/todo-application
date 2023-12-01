import { useState, useEffect } from 'react';

const useLoadingState = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading((loading) => !loading);
    }, 500);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
  }, []);

  return loading;
};

export default useLoadingState;