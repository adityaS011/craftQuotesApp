'use client';
import Image from 'next/image';
import { Quote } from '../quotes/components/QuotesController';

// src/components/QuoteCard.tsx

const QuoteCard = ({ quote }: { quote: Quote }) => {
  return (
    <div className=' p-2 flex flex-col gap-1'>
      <div className='relative bg-slate-50 shadow-md rounded-md overflow-hidden '>
        <Image
          src={quote.mediaUrl as string}
          className='w-full h-44 object-cover'
          alt='Quote image'
        />
        <div className='absolute inset-0 flex items-end justify-start p-4 bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
          <h2 className='text-xs font-bold'>{quote.text}</h2>
        </div>
      </div>
      <div className='flex flex-col capitalize gap-1'>
        <div className='flex flex-row text-xs p-1 w-fit  bg-gray-200 '>
          <p className='font-medium'>Username </p> : {quote.username}
        </div>
        <div className='flex flex-row text-xs p-1 w-fit bg-gray-200'>
          <p className='font-medium'>Created At: </p>:{' '}
          {new Date(quote.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
export default QuoteCard;
