import React, { Suspense } from 'react';
import CreateQuote from './CreateQuote';

const page = () => {
  return (
    <Suspense>
      <CreateQuote />
    </Suspense>
  );
};

export default page;
