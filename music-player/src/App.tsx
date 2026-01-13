import { BrowserRouter, Route, Routes } from 'react-router'
import { Navbar } from './components/Navbar'
import { AllSongs } from './components/AllSongs'
import { MusicPlayer } from './components/MusicPlayer'
import { PlayList } from './components/PlayList'
import { MusicProvider } from './context/MusicContext'

function App() {
  return (
    <BrowserRouter>
      <MusicProvider>
        <div className='app'>
          <Navbar />
          <main className='app-main'>
            <div className='player-section'>
              <MusicPlayer />
            </div>
            <div className='content-section'>
              <Routes>
                <Route path='/' element={<AllSongs />} />
                <Route path='/playlists' element={<PlayList />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App
