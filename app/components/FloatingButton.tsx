// src/components/FloatingButton.tsx
export default function FloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='fixed bottom-8 right-5 lg:right-10 bg-green-500 text-white p-4 rounded-full shadow-lg
                  hover:bg-green-600 active:bg-green-700 transition-all duration-300 transform active:scale-95
                  flex items-center justify-center'
      aria-label='Create'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        className='w-6 h-6'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 4.75v14.5M19.25 12H4.75'
        />
      </svg>
    </button>
  );
}
