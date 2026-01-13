import { createContext, ReactNode, useContext, useState } from 'react'

export type Song = {
  id: number
  title: string
  artist: string
  url: string
  duration: string
}

const songs: Song[] = [
  {
    id: 1,
    title: 'Keep You Away',
    artist: 'EchoBR',
    url: '/songs/Keep You Away.wav',
    duration: '4:32',
  },
  {
    id: 2,
    title: 'Breaching',
    artist: 'EchoBR',
    url: '/songs/Breaching.wav',
    duration: '3:45',
  },
  {
    id: 3,
    title: 'Forgotten Memories',
    artist: 'EchoBR',
    url: '/songs/Forgotten Memories.wav',
    duration: '3:12',
  },
  {
    id: 4,
    title: 'Nothing You Really Want',
    artist: 'EchoBR',
    url: '/songs/nothing you really want.wav',
    duration: '2:58',
  },
  {
    id: 5,
    title: 'Glacier Blue',
    artist: 'EchoBR',
    url: '/songs/Glacier Blue.wav',
    duration: '3:28',
  },
  {
    id: 6,
    title: 'In Love',
    artist: 'EchoBR',
    url: '/songs/In Love.wav',
    duration: '3:15',
  },
  {
    id: 7,
    title: 'Lemon Balm',
    artist: 'EchoBR',
    url: '/songs/Lemon Balm.wav',
    duration: '3:42',
  },
  {
    id: 8,
    title: 'Momentary Bliss',
    artist: 'EchoBR',
    url: '/songs/Momentary Bliss.wav',
    duration: '2:45',
  },
]

export type Playlist = {
  id: number
  name: string
  songs: Song[]
}
interface MusicContextValue {
  allSongs: Song[]
  setAllSongs: React.Dispatch<React.SetStateAction<Song[]>>
  handlePlaySong: (song: Song, index: number) => void
  currentTrack: Song
  currentTrackIndex: number
  formatTime: (time: number) => string
  currentTime: number
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
  nextTrack: () => void
  prevTrack: () => void
  isPlaying: boolean
  play: () => void
  pause: () => void
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
  playlists: Playlist[]
  createPlaylist: (name: string) => void
  addSongToPlaylist: (playlistId: number, song: Song) => void
  deletePlaylist: (playlistId: number) => void
}

const MusicContext = createContext<MusicContextValue | undefined>(undefined)

interface MusicProviderProps {
  children: ReactNode
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [allSongs, setAllSongs] = useState<Song[]>(songs)
  const [currentTrack, setCurrentTrack] = useState<Song>(songs[0])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  const handlePlaySong = (song: Song, index: number) => {
    setCurrentTrack(song)
    setCurrentTrackIndex(index)
    setIsPlaying(false)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length // if prev===allSongs.length => 1
      setCurrentTrack(allSongs[nextIndex])
      return nextIndex
    })
    setIsPlaying(false)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1
      setCurrentTrack(allSongs[nextIndex])
      return nextIndex
    })
    setIsPlaying(false)
  }

  const createPlaylist = (name: string) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    }

    setPlaylists((prev) => [...prev, newPlaylist])
  }

  const deletePlaylist = (playlistId: number) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId)
    )
  }

  const addSongToPlaylist = (playlistId: number, song: Song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] }
        } else {
          return playlist
        }
      })
    )
  }

  const play = () => setIsPlaying(true)
  const pause = () => setIsPlaying(false)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentTrack,
        currentTrackIndex,
        currentTime,
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        isPlaying,
        play,
        pause,
        volume,
        setVolume,
        playlists,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const contextValue = useContext(MusicContext)
  if (!contextValue) {
    throw new Error('useMusic must be udes inside of MusicProvider')
  }

  return contextValue
}
