'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import QuoteCard from '../components/QuoteCard';
import FloatingButton from '../components/FloatingButton';

export type Quote = {
  createdAt: string;
  id: number;
  mediaUrl: string;
  text: string;
  updatedAt: string;
  username: string;
};

const Quotes = () => {
  const searchParams = useSearchParams(); // To get query parameters
  const router = useRouter(); // To update the URL
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [limit] = useState(20); // Number of quotes per page
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') || '1') // Initialize from URL query
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate the offset based on the current page
  const offset = (page - 1) * limit;

  useEffect(() => {
    loadQuotes();
  }, [page]); // Trigger loadQuotes when the page changes

  const loadQuotes = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      if (response.data.data.length === 0) {
        setHasMore(false);
      } else {
        setQuotes(response.data.data);
        router.push(`?page=1`);
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

  if (loading) {
    return (
      <div>
        <div className='text-2xl font-light font-serif bg-gradient-to-b from-white to-blue-50 w-full pt-3 pb-2 border-b border-slate-200 uppercase flex flex-row justify-center'>
          Image Quotes
        </div>
        <div className='text-xl flex flex-row justify-center items-center w-full  h-screen text-gray-700'>
          Loading quotes...
        </div>
      </div>
    );
  } else if (quotes.length === 0 && !loading) {
    return (
      <div>
        <div className='text-2xl font-light font-serif bg-gradient-to-b from-white to-blue-50 w-full pt-3 pb-2 border-b border-slate-200 uppercase flex flex-row justify-center'>
          Image Quotes
        </div>
        <div className='text-xl flex flex-row justify-center items-center w-full  h-screen text-gray-700'>
          Oops! No Quotes Found
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='text-2xl font-light font-serif bg-gradient-to-b from-white to-blue-50 w-full pt-3 pb-2 border-b border-slate-200 uppercase flex flex-row justify-center'>
        Image Quotes
      </div>
      <div className='h-fit w-full flex flex-col justify-center mb-5'>
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
              {'<<'} Previous Page
            </button>
          )}
          {hasMore && (
            <button
              className='w-fit bg-yellow-200 rounded-lg px-3 py-2'
              onClick={() => changePage(page + 1)}
            >
              Next Page {'>>'}
            </button>
          )}
        </div>
        <FloatingButton onClick={() => router.push('/create-quote')} />
      </div>
    </div>
  );
};

export default Quotes;
