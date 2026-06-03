import * as React from 'react';
import { useState, createContext, useContext, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';

import useStyles from './audio-player.styles';
import { useTheme } from 'react-jss';
import Playlists from './playlists.jsx';
import {
  assignPrevNextDisable,
  hideVolumeOnSmallScreens,
  mapTrackAttributes,
  allTracks,
} from './utils.js';
import 'react-h5-audio-player/lib/styles.css';

const Controls = AudioPlayer;

const Player = (props) => {
  //we want the tracks/singles play list to show on load, then visttors are click through from there, so
  const list = allTracks.filter((item) => item.list == 'Tracks');

  const [playlist, setPlaylist] = useState(list);
  const [currentTrack, setCurrentTrack] = useState(
    list.find((t, i) => i == 0).id,
  );
  const [thumbnailMain, setThumbnailMain] = useState(
    list.find((t, i) => i == 0).src,
  );

  const [activeTab, setActiveTab] = useState('Tracks');
  const [autoPlayOnSrcChange, setAutoPlayOnSrcChange] = useState(true);
  const classes = useStyles(props || {});

  hideVolumeOnSmallScreens();

  const handleClickNext = () => {
    setCurrentTrack((currentTrack) => {
      const index = playlist.findIndex((track) => track.id === currentTrack);
      const nextTrackId = playlist[index + 1].id;
      return nextTrackId;
    });
  };

  const handleClickPrevious = () => {
    setCurrentTrack((currentTrack) => {
      const index = playlist.findIndex((track) => track.id === currentTrack);
      const prevTrackId = playlist[index - 1].id;
      return prevTrackId;
    });
  };

  const handleEnd = () => {
    setCurrentTrack((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0,
    );
  };

  const handleTogglePlay = (action) => {
    if (action == 'paused') {
      setPlaylist(mapTrackAttributes(playlist, currentTrack, 'paused'));
    } else {
      console.log(
        'HARD PLAY',
        mapTrackAttributes(playlist, currentTrack, 'play'),
      );
      setPlaylist(mapTrackAttributes(playlist, currentTrack, 'play'));
    }
    if (!autoPlayOnSrcChange) {
      setAutoPlayOnSrcChange(true);
    }
  };

  const handlePlayListClick = (id) => {
    //we need to force a click here on the player when the a playlist item is clicked
    let playPause = document.querySelector('.rhap_play-pause-button');
    playPause.click();
    if (id !== currentTrack) {
      setCurrentTrack(id);
      setPlaylist(mapTrackAttributes(playlist, currentTrack, 'play'));
    }

    if (!autoPlayOnSrcChange) {
      setAutoPlayOnSrcChange(true);
    }
  };

  const handleTabClick = (tab) => {
    setAutoPlayOnSrcChange(false);
    setPlaylist(
      mapTrackAttributes(
        allTracks.filter((item) => item.list == tab),
        currentTrack,
        'play',
      ),
    );
    setActiveTab(tab);
  };

  const handleFavorite = (e, id) => {
    console.log('CLICK', id);
  };

  const getTrackASrc = () => {
    const foundIndex = myArray.findIndex((object) => object.id === idToFind);
  };

  useEffect(() => {
    // const newThumnail = playlist.find(
    //   (track) => track.id == currentTrack,
    // ).thumbnail;
    // console.log('new thumb', newThumnail);

    assignPrevNextDisable(currentTrack, playlist);
    const trackObj = playlist.find((track) => track.id == currentTrack);
    setThumbnailMain(trackObj.thumbnail);
  }, [currentTrack]);

  useEffect(() => {}, [playlist, thumbnailMain]);

  //   nice to have => fix auto play on source change lets leave it for now

  return (
    <div className={classes.root}>
      <div className={classes.player}>
        <div
          //why are background images failing when. passed through props via useStyles. lifecycle?
          style={{ backgroundImage: `URL(${thumbnailMain})` }}
          className={classes.thumbnailMain}
        ></div>
        <div className={classes.controls}>
          <Controls
            showFilledVolume={false}
            loop={false}
            autoPlayAfterSrcChange={autoPlayOnSrcChange}
            volume='0.5'
            src={allTracks.find((track) => track.id == currentTrack).src}
            showSkipControls
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            onEnded={handleEnd}
            onPlay={(e) => {
              handleTogglePlay('playing');
            }}
            onPause={(e) => {
              handleTogglePlay('paused');
            }}
            onError={() => {
              //   console.log('play error');
            }}
          />
        </div>
      </div>

      {/* need a download button, play/pause icon and to connect the play click to the main play click handler via a util,
the current click handler below will move to the icon */}

      {/* if playing, on hover if item, switch icon to pause */}

      <div className={classes.player}>
        <Playlists
          playlist={playlist || []}
          setPlaylist={setPlaylist}
          handleTabClick={handleTabClick}
          tab={activeTab}
          setActiveTab={setActiveTab}
          handleTogglePlay={handleTogglePlay}
          handlePlayListClick={handlePlayListClick}
          currentTrack={currentTrack}
        />

        {/* {activeTab == 'Favorites' ? (
          <div>
            You haven't added any favorites yet. Trying favoriting a track or
            mix and it will appear here.
          </div>
        ) : (
          playlist
            .filter((item) => item.list == activeTab)
            .map((track, index) => {
              return (
                <div
                  className={classes.listItemWrapper}
                  tabIndex={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePlayListClick(index);
                    }
                  }}
                  onMouseLeave={() => {
                    setPlaylist(
                      mapTrackAttributes(playlist, index, 'hoverExit'),
                    );
                  }}
                  onMouseOver={() => {
                    setPlaylist(
                      mapTrackAttributes(playlist, index, 'hoverEnter'),
                    );
                  }}
                  onClick={() => handlePlayListClick(index)}
                  key={index}
                >
                  <div
                    style={{ backgroundImage: `url(${track.thumbnail})` }}
                    className={classes.playlistThumbnail}
                  >
                    <div
                      className={
                        track.hovered ? classes.listItemIcon : undefined
                      }
                    >
                      {track.active ? (
                        <span className='material-icons pause'>pause</span>
                      ) : track.paused ? (
                        <span className='material-icons playing'>
                          play_circle
                        </span>
                      ) : track.hovered && !track.active ? (
                        <span className='material-icons play'>play_arrow</span>
                      ) : null}
                    </div>
                  </div>

                  <div className={classes.listItemDetails}>
                    <span>{track.name}</span>
                    <div className={classes.actions}>
                      <a
                        onClick={(e) => handleTogglePlay('paused')}
                        href={track.src}
                        download={`Block Control - ${track.name}`}
                        target='_blank'
                      >
                        <span className='material-icons action-buttons'>
                          download
                        </span>
                      </a>

                      <span
                        role='button'
                        onClick={(e) => (
                          e.stopPropagation(),
                          handleFavorite(e, index)
                        )}
                        aria-label={`Add ${track.name} to favorites`}
                        className='material-icons action-buttons favorite'
                      >
                        favorite
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
        )} */}
      </div>
    </div>
  );
};

export default Player;
