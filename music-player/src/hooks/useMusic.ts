import { useState } from 'react'

interface Song {
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

export const useMusic = () => {
  const [allSongs, setAllSongs] = useState<Song[]>(songs)
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  )

  const handlePlaySong = (song: Song, index: number) => {
    setCurrentTrack(song)
    setCurrentTrackIndex(index)
  }

  return { allSongs, handlePlaySong, currentTrack, currentTrackIndex }
}
