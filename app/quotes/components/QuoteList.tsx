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

  // Function to handle page change
  return (
    <div className='h-fit w-full flex flex-col justify-center mb-10'>
      <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 p-4'>
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
      <div className='w-full gap-3 flex flex-row justify-center'>
        {page > 1 && (
          <button
            className='w-fit bg-yellow-200 rounded-lg px-3 py-2'
            onClick={() => changePage(page - 1)}
          >
            {'<<'} Previous
          </button>
        )}
        {hasMore && (
          <button
            className='w-fit bg-yellow-200 rounded-lg px-3 py-2'
            onClick={() => changePage(page + 1)}
          >
            Next {'>>'}
          </button>
        )}
      </div>
      <FloatingButton onClick={() => router.push('/create-quote')} />
    </div>
  );
};

export default QuoteList;
