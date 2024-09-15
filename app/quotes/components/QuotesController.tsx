'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import QuoteList from './QuoteList';
import QuoteCardSkeleton from '@/app/components/QuoteCardSkeleton';

export type Quote = {
  createdAt: string;
  id: number;
  mediaUrl: string;
  text: string;
  updatedAt: string;
  username: string;
};

const QuotesController = () => {
  const searchParams = useSearchParams(); // To get query parameters
  const router = useRouter(); // To update the URL
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [limit] = useState(20); // Number of quotes per page
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') || '1') // Initialize from URL query
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const quotesFilter = ['Filters', 'Motivational', 'Humor', 'Religious'];

  const offset = (page - 1) * limit;

  const loadQuotes = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
        {
          headers: { Authorization: token },
        }
      );
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 500ms delay
      if (response.data.data.length === 0) {
        console.log('here');
        setHasMore(false); // Stop pagination if no more quotes
      } else {
        if (response.data.data.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setQuotes(response.data.data);
        if (!searchParams.get('page')) {
          router.push(`?page=1`);
        }
      }
    } catch (error) {
      console.error('Failed to load quotes', error);
      setLoading(false);
    }
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    // Update the URL query parameter without resetting to 0
    router.push(`?page=${newPage}`);
  };

  useEffect(() => {
    loadQuotes();
  }, [page, searchParams]);

  // Return the loading skeleton if loading is true
  if (loading) {
    return (
      <div className='flex flex-col gap-4 bg-slate-50'>
        <div className='text-2xl font-light font-serif bg-gradient-to-b from-white to-blue-50 w-full pt-3 pb-2 border-b border-slate-200 uppercase flex flex-row justify-center'>
          Image Quotes
        </div>
        <div className='flex flex-row mt-4'>
          <div className='flex flex-row gap-4 ml-6 p-2 w-28 h-8 bg-[#F4F4F5] animate-pulse rounded-lg text-slate-600 font-medium'></div>
          <div className='flex flex-row gap-4 ml-6 p-2 w-28 h-8 bg-[#F4F4F5] animate-pulse rounded-lg text-slate-600 font-medium'></div>
          <div className='flex flex-row gap-4 ml-6 p-2 w-28 h-8 bg-[#F4F4F5] animate-pulse rounded-lg text-slate-600 font-medium'></div>
        </div>
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 p-4'>
          <QuoteCardSkeleton />
          <QuoteCardSkeleton />
          <QuoteCardSkeleton />
          <QuoteCardSkeleton />
          <QuoteCardSkeleton />
          <QuoteCardSkeleton />
          <QuoteCardSkeleton />
        </div>
      </div>
    );
  }

  // If no quotes are found and not loading, show a "no quotes" message
  if (quotes.length === 0) {
    return (
      <div className='flex flex-col gap-4 bg-slate-50'>
        <div className='text-2xl font-light font-serif bg-gradient-to-b from-white to-blue-50 w-full pt-3 pb-2 border-b border-slate-200 uppercase flex flex-row justify-center'>
          Image Quotes
        </div>
        <div className='text-xl flex flex-row justify-center items-center w-full  h-screen text-gray-700'>
          Oops! No Quotes Found
        </div>
      </div>
    );
  }

  // Return the list of quotes if not loading and quotes are found
  return (
    <div className='flex flex-col gap-4 bg-slate-50'>
      <div className='text-2xl font-light font-serif bg-gradient-to-b from-white to-blue-50 w-full pt-3 pb-2 border-b border-slate-200 uppercase flex flex-row justify-center'>
        Image Quotes
      </div>

      <div className='flex flex-row gap-4 mt-2 ml-6'>
        {quotesFilter.map((element, index) => (
          <div
            key={index}
            className='p-2 bg-gradient-to-r from-blue-100 via-sky-200 to-blue-100 rounded-lg text-slate-600 font-medium'
          >
            {element}
          </div>
        ))}
      </div>

      <QuoteList
        page={page}
        hasMore={hasMore}
        changePage={changePage}
        quotes={quotes}
      />
    </div>
  );
};

export default QuotesController;
