import * as React from 'react';
import { useState, createContext, useContext, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import useStyles from './audio-player.styles';
import { useTheme } from 'react-jss';
import {
  assignPrevNextDisable,
  hideVolumeOnSmallScreens,
  mapTrackAttributes,
  allTracks,
} from './utils.js';

const Playlists = ({
  playlist,
  setPlaylist,
  handleTabClick,
  activeTab,
  setActiveTab,
  handleTogglePlay,
  handlePlayListClick,
  props,
  currentTrack,
}) => {
  const classes = useStyles(props);

  const tabs = [
    { label: 'Tracks' },
    { label: 'Mixes' },
    { label: 'Favorites' },
  ];

  useEffect(() => {}, [playlist]);
  return (
    <>
      <div>
        {tabs.map((tab, index) => {
          return (
            <button
              key={`tab-button-${index}`}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {playlist.map((track, index) => {
        return (
          <div
            className={classes.listItemWrapper}
            tabIndex={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handlePlayListClick(track.id, activeTab);
              }
            }}
            onMouseLeave={() => {
              setPlaylist(
                mapTrackAttributes(playlist, currentTrack, 'hoverExit', index),
              );
            }}
            onMouseOver={() => {
              setPlaylist(
                mapTrackAttributes(playlist, currentTrack, 'hoverEnter', index),
              );
            }}
            onClick={() => handlePlayListClick(track.id, activeTab)}
            key={index}
            //ADD ARIA LABEL TO COCCPOND WITH NEW LOGIC
          >
            <div
              style={{ backgroundImage: `url(${track.thumbnail})` }}
              className={classes.playlistThumbnail}
            >
              {/* TABS => tracks versus DJ */}
              <div
                className={
                  track.hovered && !track.active
                    ? classes.listItemIcon
                    : undefined
                }
              >
                {track.active ? (
                  <span className='material-icons pause'>pause</span>
                ) : track.paused ? (
                  <span className='material-icons playing'>play_circle</span>
                ) : track.hovered && !track.active ? (
                  <span className='material-icons play'>play_arrow</span>
                ) : null}
              </div>
            </div>

            <div className={classes.listItemDetails}>
              <span className={classes.listItemText}>
                <span className={track.active ? 'active' : undefined}>
                  {track.name}
                </span>
                <span>{track.text}</span>
              </span>
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
                    handleFavorite(e, track.id)
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
      })}
    </>
  );
};

export default Playlists;
