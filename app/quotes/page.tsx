import React, { Suspense } from 'react';
import Quotes from './Quotes';

const page = () => {
  return (
    <Suspense>
      <Quotes />
    </Suspense>
  );
};

export default page;
