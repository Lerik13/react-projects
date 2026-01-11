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
  const [currentTrack, setCurrentTrack] = useState<Song>(songs[0])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)

  const handlePlaySong = (song: Song, index: number) => {
    setCurrentTrack(song)
    setCurrentTrackIndex(index)
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

  const play = () => setIsPlaying(true)
  const pause = () => setIsPlaying(false)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return {
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
  }
}
