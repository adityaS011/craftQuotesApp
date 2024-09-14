// src/pages/CreateQuote.tsx
'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Ensure you are importing the CSS

export default function CreateQuote() {
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);

        const mediaResponse = await axios.post(
          'https://crafto.app/crafto/v1.0/media/assignment/upload',
          formData
        );
        const mediaUrl = mediaResponse.data.mediaUrl;

        const res = await axios.post(
          'https://assignment.stage.crafto.app/postQuote',
          { text, mediaUrl },
          { headers: { Authorization: token } }
        );
        setIsLoading(false);
        if (res.status === 200) {
          setIsSuccess(true);
        }
        router.push('/quotes');
      }
    } catch (error) {
      console.error('Quote creation failed', error);
    }
  };

  return (
    <>
      <div className='text-2xl font-light font-serif bg-gradient-to-b from-white to-blue-50 w-full pt-3 pb-2 border-b border-slate-200 uppercase flex flex-row justify-center'>
        Image Quotes
      </div>
      <div className='flex flex-col h-screen w-full items-center mt-10 px-4 '>
        <div className='w-fit'>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Quote text'
            className='border p-2 w-full mb-4'
          />
          <input
            type='file'
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className='mb-4'
          />
          <button
            onClick={handleSubmit}
            className={
              isLoading
                ? 'bg-green-500 text-white p-2 w-full'
                : 'bg-blue-500 text-white p-2 w-full'
            }
            data-tooltip-id='submit-tooltip' // Attach the tooltip ID
          >
            {isLoading ? 'Submitting...' : 'Submit Quote'}
          </button>

          {isSuccess && (
            <div data-tooltip-id='submit-tooltip' className='text-green-500'>
              Quote submitted!
            </div>
          )}
          <Tooltip id='submit-tooltip' place='top'>
            Quote submitted successfully!
          </Tooltip>
        </div>
      </div>
    </>
  );
}
