import { useState } from 'react';

export function ZipCode({ setZipCode }: any) {
  const [zip, setZip] = useState<string>('');

  return (
    <div className='text-center my-2'>
      <input
        type='text'
        placeholder='Zip Code'
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        className='outline outline-1 outline-stone-200 rounded-xl px-2 py-1 w-20'
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setZipCode(zip);
        }}
        className='outline outline-1 outline-stone-700 text-stone-700 rounded-xl px-2 py-1 ml-3 transition-all hover:bg-stone-700 hover:text-white'>
        Submit
      </button>
    </div>
  );
}
