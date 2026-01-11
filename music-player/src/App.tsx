import { BrowserRouter, Route, Routes } from 'react-router'
import { MusicPlayer } from './components/MusicPlayer'
import { AllSongs } from './components/AllSongs'
import { PlayList } from './components/PlayList'

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        {/* <Navbar /> */}
        <main className='app-main'>
          <div className='player-section'>
            <MusicPlayer />
          </div>
          <div className='content-section'>
            <Routes>
              <Route path='/' element={<AllSongs />} />
              <Route path='/playlist' element={<PlayList />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
