// src/pages/Login.tsx
'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const handleLogin = async () => {
    setIsLoading(true);
    if (otp !== '1234') {
      setIsLoading(false);

      alert('Invalid OTP');
      return; // return early to avoid making unnecessary API calls if OTP is invalid
    }
    try {
      const response = await axios.post(
        'https://assignment.stage.crafto.app/login',
        { username, otp: '1234' }
      );
      setIsLoading(false);
      localStorage.setItem('token', response.data.token);
      router.push('/quotes');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='h-screen bg-slate-50 flex items-center justify-center'>
      <div className='bg-gradient-to-r from-slate-100 to to-slate-200 p-8 shadow-md'>
        <h1 className='text-xl font-medium mb-4 uppercase text-center'>
          Welcome to Craft Quotes
        </h1>
        <input
          type='text'
          value={username}
          disabled={isLoading}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='USERNAME'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='password'
          value={otp}
          disabled={isLoading}
          onChange={(e) => setOtp(e.target.value)}
          placeholder='OTP'
          className='border p-2 mb-4 w-full'
        />
        <div className='flex flex-row w-full items-center justify-center'>
          {isLoading ? (
            <p className='bg-blue-400 text-white py-2 px-8 w-fit rounded-md'>
              Loading...
            </p>
          ) : (
            <button
              onClick={handleLogin}
              className='bg-blue-500 text-white py-2 px-8 w-fit rounded-md'
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
