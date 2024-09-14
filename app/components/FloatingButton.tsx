// src/components/FloatingButton.tsx
export default function FloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='fixed bottom-8 right-10 bg-green-500 text-white p-2 rounded-full'
    >
      + Create Quote
    </button>
  );
}
