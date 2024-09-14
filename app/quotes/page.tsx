import React, { Suspense } from 'react';
import QuotesController from './components/QuotesController';

const page = () => {
  return (
    <Suspense>
      <QuotesController />
    </Suspense>
  );
};

export default page;
