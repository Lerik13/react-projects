import { useState } from 'react'

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [theme, setTheme] = useState('light')

  return (
    <div
      className={`${theme} min-h-screen text-slate-900 dark:bg-slate-900 dark:text-white`}
    >
      {/* Navbar */}
      <div className='flex items-center justify-between text-slate-900 dark:bg-slate-900 dark:text-white p-4'>
        <div className='font-bold'>Logo</div>

        {/* Desktop Nav */}
        <div className='hidden sm:flex gap-2'>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <button
            className='text-xl cursor-pointer'
            onClick={() =>
              setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
            }
          >
            {theme === 'light' ? '🌙' : '🌞'}
          </button>
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
        <div className='flex flex-col items-center gap-2 p-4 sm:hidden text-slate-900 dark:bg-slate-900 dark:text-white'>
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
          <button
            className='text-xl cursor-pointer sm:hidden'
            onClick={() =>
              setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
            }
          >
            {theme === 'light' ? '🌙' : '🌞'}
          </button>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center p-6 gap-6 text-2xl sm:text-lg text-slate-900 dark:bg-slate-900 text-white'>
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
