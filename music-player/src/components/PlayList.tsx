import { useState } from 'react'
import { useMusic, type Playlist, type Song } from '../context/MusicContext'

export const PlayList = () => {
  const [newPlaylistName, setNewPlaylistName] = useState<string>('')
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  )
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  const {
    playlists,
    createPlaylist,
    allSongs,
    addSongToPlaylist,
    currentTrackIndex,
    handlePlaySong,
  } = useMusic()

  const filteredSongs = allSongs.filter((song) => {
    const matches =
      song.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLocaleLowerCase())

    const isAlreadyInPlaylist = selectedPlaylist?.songs.some(
      (playlistSong) => playlistSong.id === song.id
    )

    return matches && !isAlreadyInPlaylist
  })

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName)
      setNewPlaylistName('')
    }
  }

  const handleAddSong = (song: Song) => {
    if (selectedPlaylist) {
      addSongToPlaylist(selectedPlaylist.id, song)
      setSearchQuery('')
      setShowDropDown(false)
    }
  }

  const handlePlayFromPlaylist = (song: Song) => {
    const globalIndex = allSongs.findIndex((s) => s.id === song.id)
    handlePlaySong(song, globalIndex)
  }

  return (
    <div className='playlists'>
      <h2>Playlists</h2>
      <div className='create-playlist'>
        <h3>Create New Playlist</h3>
        <div className='playlist-form'>
          <input
            type='text'
            placeholder='Playlist name...'
            className='playlist-input'
            onChange={(e) => setNewPlaylistName(e.target.value)}
            value={newPlaylistName}
          />
          <button className='create-btn' onClick={handleCreatePlaylist}>
            Create
          </button>
        </div>
      </div>

      {/* Playlists List */}
      <div className='playlist-list'>
        {playlists.length === 0 ? (
          <p className='empty-message'>No playlists created yet</p>
        ) : (
          playlists.map((playlist, key) => (
            <div className='playlist-item' key={key}>
              <div className='playlist-header'>
                <h3>{playlist.name}</h3>
                <div className='playlist-actions'>
                  <button className='delete-playlist-btn'>Delete</button>
                </div>
              </div>
              {/* Add Song Search */}
              <div className='add-song-section'>
                <div className='search-container'>
                  <input
                    type='text'
                    placeholder='Search songs to add...'
                    value={
                      selectedPlaylist?.id === playlist.id ? searchQuery : ''
                    }
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setSelectedPlaylist(playlist)
                      setShowDropDown(e.target.value.length > 0)
                    }}
                    onFocus={(e) => {
                      setSelectedPlaylist(playlist)
                      setShowDropDown(e.target.value.length > 0)
                    }}
                    className='song-search-input'
                  />

                  {selectedPlaylist?.id === playlist.id && showDropDown && (
                    <div className='song-dropdown'>
                      {filteredSongs.length === 0 ? (
                        <div className='dropdown-item no-results'>
                          No songs found
                        </div>
                      ) : (
                        filteredSongs.slice(0, 5).map((song, key) => (
                          <div
                            key={key}
                            className='dropdown-item'
                            onClick={() => handleAddSong(song)}
                          >
                            <span className='song-title'>{song.title}</span>
                            <span className='song-artist'>{song.artist}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className='playlist-songs'>
                {playlist.songs.length === 0 ? (
                  <p className='empty-playlist'>No songs in this playlist</p>
                ) : (
                  playlist.songs.map((song, key) => (
                    <div
                      key={key}
                      className={`playlist-song ${
                        currentTrackIndex ===
                        allSongs.findIndex((s) => s.id === song.id)
                          ? 'active'
                          : ''
                      }`}
                      onClick={() => handlePlayFromPlaylist(song)}
                    >
                      <div className='song-info'>
                        <span className='song-title'>{song.title}</span>
                        <span className='song-artist'>{song.artist}</span>
                      </div>
                      <span className='song-duration'>{song.duration}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
