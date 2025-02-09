import  { useState, useEffect } from 'react';

export const ErrorButton = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      console.error('Error state changed to true');
    }
  }, [error]);

  const onClick = () => setError(true);

  if (error) throw new Error('Something went wrong...');

  return (
    <button onClick={onClick} type="button">
      Error Button
    </button>
  );
};