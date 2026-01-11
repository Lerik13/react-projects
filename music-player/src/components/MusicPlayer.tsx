import { useEffect, useRef } from 'react'
import { useMusic } from '../hooks/useMusic'

export const MusicPlayer = () => {
  const {
    currentTrack,
    formatTime,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    nextTrack,
    prevTrack,
    isPlaying,
    play,
    pause,
  } = useMusic()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((err) => console.error(err))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {}

    const handleEnded = () => {}

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [setDuration, setCurrentTime, currentTrack])

  return (
    <div className='music-player'>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload='metadata'
        crossOrigin='anonymous'
      />

      <div className='track-info'>
        <h3 className='track-title'>{currentTrack.title}</h3>
        <p className='track-artist'>{currentTrack.artist}</p>
      </div>

      <div className='progress-container'>
        <span className='time'>{formatTime(currentTime)}</span>
        <input
          type='range'
          min='0'
          max={duration || 0}
          step='0.1'
          value={currentTime || 0}
          className='progress-bar'
          style={{}}
        />
        <span className='time'>{formatTime(duration)}</span>
      </div>

      <div className='controls'>
        <button className='control-btn' onClick={prevTrack}>
          ⏮
        </button>
        <button
          className='control-btn play-btn'
          onClick={() => (isPlaying ? pause() : play())}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className='control-btn' onClick={nextTrack}>
          ⏭
        </button>
      </div>
    </div>
  )
}
