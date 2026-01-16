import { useState } from 'react'

function App() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='bg-slate-50 min-h-screen text-slate-900'>
      {/* Navbar */}
      <div className='flex items-center justify-between bg-slate-900 text-white p-4'>
        <div className='font-bold'>Logo</div>

        {/* Desktop Nav */}
        <div className='hidden sm:flex gap-2'>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>

        <button
          className='text-xl cursor-pointer sm:hidden'
          onClick={() => setOpen((prev) => !prev)}
        >
          ≡
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className='flex flex-col items-center gap-2 bg-slate-900 text-white p-4 sm:hidden'>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-white text-center p-6 gap-6 text-2xl sm:text-lg'>
        <div className='bg-slate-500 p-4 rounded hover: bg-slate-600 hover:scale-110 transition-all duration-300'>
          Feature One
        </div>
        <div className='bg-slate-500 p-4 rounded hover: bg-slate-600 hover:scale-110 transition-all duration-300'>
          Feature Two
        </div>
        <div className='bg-slate-500 p-4 rounded hover: bg-slate-600 hover:scale-110 transition-all duration-300'>
          Feature Three
        </div>
        <div className='bg-slate-500 p-4 rounded hover: bg-slate-600 hover:scale-110 transition-all duration-300'>
          Feature Four
        </div>
        <div className='bg-slate-500 p-4 rounded hover: bg-slate-600 hover:scale-110 transition-all duration-300'>
          Feature Five
        </div>
        <div className='bg-slate-500 p-4 rounded hover: bg-slate-600 hover:scale-110 transition-all duration-300'>
          Feature Six
        </div>
      </div>
    </div>
  )
}

export default App
