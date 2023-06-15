// Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="center">
        <h2>Processing your order...</h2>
      <h2>Loading...</h2>
      <p>Patience, it's almost there!</p>
    </div>
  );
};

export default Loader;
