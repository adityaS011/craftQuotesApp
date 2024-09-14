// src/pages/Login.tsx
'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState<string | undefined>();
  const router = useRouter();
  const handleLogin = async () => {
    if (otp !== '1234') {
      alert('Invalid OTP');
      return; // return early to avoid making unnecessary API calls if OTP is invalid
    }
    try {
      const response = await axios.post(
        'https://assignment.stage.crafto.app/login',
        { username, otp: '1234' }
      );
      localStorage.setItem('token', response.data.token);
      router.push('/quotes');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='bg-white p-8 shadow-md'>
        <h1 className='text-xl mb-4'>Login</h1>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='password'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder='OTP'
          className='border p-2 mb-4 w-full'
        />
        <button
          onClick={handleLogin}
          className='bg-blue-500 text-white p-2 w-full'
        >
          Login
        </button>
      </div>
    </div>
  );
}
