import { useState, useEffect } from 'react';

export const ErrorButton = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) throw new Error('Something went wrong...');
  }, [error]);

  return (
    <button onClick={() => setError(true)} type="button">
      Error Button
    </button>
  );
};
