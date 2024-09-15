import React from 'react';
import QuoteCard from '@/app/components/QuoteCard';
import FloatingButton from '@/app/components/FloatingButton';
import { useRouter } from 'next/navigation';
import { Quote } from './QuotesController';

const QuoteList = ({
  quotes,
  changePage,
  page,
  hasMore,
}: {
  quotes: Quote[];
  changePage: (val: number) => void;
  page: number;
  hasMore: boolean;
}) => {
  const router = useRouter(); // To update the URL

  return (
    <div className='h-fit w-full flex flex-col justify-center mb-10'>
      <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 p-4'>
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>

      <div className='w-full gap-3 flex flex-row justify-center mt-6'>
        {page > 1 && (
          <button
            className='w-fit flex items-center bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-300'
            onClick={() => changePage(page - 1)}
            aria-label='Go to previous page'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-5 h-5 mr-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Previous
          </button>
        )}

        {hasMore && (
          <button
            className='w-fit flex items-center bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition duration-300'
            onClick={() => changePage(page + 1)}
            aria-label='Go to next page'
          >
            Next
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-5 h-5 ml-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        )}
      </div>

      <FloatingButton onClick={() => router.push('/create-quote')} />
    </div>
  );
};

export default QuoteList;
