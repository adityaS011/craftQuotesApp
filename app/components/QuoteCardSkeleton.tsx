import React from 'react';

const QuoteCardSkeleton = () => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='w-40 h-44 animate-pulse bg-[#F4F4F5]'> </div>
      <div className='flex flex-row text-xs p-1 w-28 h-5  bg-[#F4F4F5] '></div>
      <div className='flex flex-row text-xs p-1 w-28 h-5  bg-[#F4F4F5] '></div>
    </div>
  );
};

export default QuoteCardSkeleton;
