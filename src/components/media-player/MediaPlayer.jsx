import { useState, useRef, useEffect, useCallback } from 'react';
import { TRACKS } from './trackData.js';
import Button from '../shared/Button.jsx';
import Brackets from '../shared/Brackets.jsx';
import styles from './MediaPlayer.module.css';

const TABS = ['Mixes', 'Tracks', 'Favorites'];

// Load favorites from localStorage
const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('blockcontrol_favorites')) || [];
  } catch { return []; }
};

const MediaPlayer = ({ pauseRef, onPlay }) => {
  const audioRef = useRef(null);
  const [currentTrackId, setCurrentTrackId] = useState(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [activeTab, setActiveTab] = useState('Mixes');
  const [favorites, setFavorites] = useState(loadFavorites);
  const [confirmRemove, setConfirmRemove] = useState(null); // track id pending removal

  const currentTrack = TRACKS.find((t) => t.id === currentTrackId);
  const currentList = TRACKS.filter((t) => t.list === currentTrack.list);
  const currentIndex = currentList.findIndex((t) => t.id === currentTrackId);
  const displayedTracks = activeTab === 'Favorites'
    ? TRACKS.filter((t) => favorites.includes(t.id))
    : TRACKS.filter((t) => t.list === activeTab);

  // Sync audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => handleNext();

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentTrackId]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Expose pause function for external callers (e.g., video play)
  useEffect(() => {
    if (pauseRef) {
      pauseRef.current = () => {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      };
    }
  });

  // Prevent browser from showing native media controls overlay
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      if (onPlay) onPlay();
    }
  }, [isPlaying, onPlay]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentTrackId(currentList[currentIndex - 1].id);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentList.length - 1) {
      setCurrentTrackId(currentList[currentIndex + 1].id);
      setIsPlaying(true);
    }
  };

  const handleRewind = () => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const handleFastForward = () => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  };

  const handleTrackClick = (trackId) => {
    if (trackId === currentTrackId) {
      // Clicked the same track — toggle play/pause
      togglePlay();
    } else {
      setCurrentTrackId(trackId);
      setIsPlaying(true);
      if (onPlay) onPlay();
    }
  };

  // Favorites
  const saveFavorites = (newFavs) => {
    setFavorites(newFavs);
    localStorage.setItem('blockcontrol_favorites', JSON.stringify(newFavs));
  };

  const toggleFavorite = (trackId) => {
    if (favorites.includes(trackId)) {
      setConfirmRemove(trackId);
    } else {
      saveFavorites([...favorites, trackId]);
    }
  };

  const confirmRemoveFavorite = () => {
    saveFavorites(favorites.filter((id) => id !== confirmRemove));
    setConfirmRemove(null);
  };

  const cancelRemove = () => setConfirmRemove(null);
  // Auto-play on track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrackId]);

  // Drag helpers
  const startDrag = (handler, barRef) => (e) => {
    e.preventDefault();
    const bar = barRef.current || e.currentTarget;
    const update = (ev) => {
      const rect = bar.getBoundingClientRect();
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      handler(pct);
    };
    update(e);
    const onMove = (ev) => update(ev);
    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  const scrubBarRef = useRef(null);
  const volBarRef = useRef(null);

  const onScrubDrag = startDrag((pct) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const time = pct * duration;
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, scrubBarRef);

  const onVolDrag = startDrag((pct) => {
    setVolume(pct);
  }, volBarRef);

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.player}>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentTrack.src} preload="metadata" style={{ display: 'none' }} />

      {/* Top row: Art + Meta + Signal/Bus */}
      <div className={styles.playerTop}>
        <div className={styles.playerLeft}>
          <div className={styles.art} style={{ backgroundImage: `url(${currentTrack.thumbnail})` }}>
            <Brackets size={14} opacity={0.8} offset={5} />
            <div className={styles.artTag}>BLK // CTRL</div>
          </div>

          <div className={styles.meta}>
            <div className={styles.nowPlaying} aria-live="polite">
              <span aria-hidden="true" style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '6px' }}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="var(--neon)"><path d="M8 5.5v13a1 1 0 001.54.84l10-6.5a1 1 0 000-1.68l-10-6.5A1 1 0 008 5.5z"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="var(--neon)"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                )}
              </span>
              {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
            </div>
            <h3 className={styles.title}>{currentTrack.name}</h3>
            <p className={styles.subtitle}>{currentTrack.description}</p>
          </div>
        </div>

        {/* Signal + Audio Bus */}
        <div aria-hidden='true' className={`${styles.signalPanel} ${isPlaying ? styles.signalActive : ''}`}>
          <div className={styles.meter}>
            <div className={styles.meterLab}>
              <span>SIGNAL</span>
              <b style={!isPlaying ? { color: 'var(--neon)' } : undefined}>{isPlaying ? '100%' : 'OFF'}</b>
            </div>
            <div className={styles.meterTrack}>
              <div className={styles.meterFill} />
            </div>
          </div>
          <div className={styles.eqLabel}>AUDIO BUS // <span style={{ color: isPlaying ? 'var(--cyan)' : 'var(--neon)' }}>{isPlaying ? 'LIVE' : 'STANDBY'}</span></div>
          <div className={styles.eq}>
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                className={styles.eqBar}
                style={{
                  '--anim': `eq${['A', 'B', 'C'][i % 3]}`,
                  '--d': `${(2.2 + Math.random() * 1.8).toFixed(2)}s`,
                  '--dl': `${(-Math.random() * 3.2).toFixed(2)}s`,
                  '--s': (0.4 + Math.random() * 0.6).toFixed(2),
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls area */}
      <div className={styles.main}>

        {/* Scrubber */}
        <div className={styles.scrub}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <div className={styles.scrubBar} ref={scrubBarRef} onMouseDown={onScrubDrag} onTouchStart={onScrubDrag}>
            <div className={styles.scrubFill} style={{ width: `${progress}%` }} />
            <div className={styles.scrubKnob} style={{ left: `${progress}%` }} />
          </div>
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>

        {/* Transport */}
        <div className={styles.transport}>
          <button
            className={styles.tbtn}
            onClick={handlePrev}
            aria-label="Previous"
            disabled={currentIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="2.4" height="12" rx="1"/><path d="M20 6.5v11a1 1 0 01-1.5.87l-9-5.5a1 1 0 010-1.74l9-5.5A1 1 0 0120 6.5z"/></svg>
          </button>
          <button
            className={styles.tbtn}
            onClick={handleRewind}
            aria-label="Rewind 10 seconds"
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 7v10l-7-5z"/><path d="M21 7v10l-7-5z"/></svg>
          </button>
          <button
            className={`${styles.tbtn} ${styles.tbtnPlay}`}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 001.54.84l10-6.5a1 1 0 000-1.68l-10-6.5A1 1 0 008 5.5z"/></svg>
            )}
          </button>
          <button
            className={styles.tbtn}
            onClick={handleFastForward}
            aria-label="Fast forward 10 seconds"
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 7v10l7-5z"/><path d="M13 7v10l7-5z"/></svg>
          </button>
          <button
            className={styles.tbtn}
            onClick={handleNext}
            aria-label="Next"
            disabled={currentIndex === currentList.length - 1}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6.5v11a1 1 0 001.5.87l9-5.5a1 1 0 000-1.74l-9-5.5A1 1 0 004 6.5z"/><rect x="15.6" y="6" width="2.4" height="12" rx="1"/></svg>
          </button>

          {/* Volume — inline on desktop, below on mobile */}
          <div className={styles.volume}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 8.5a5 5 0 010 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <div className={styles.volBar} ref={volBarRef} onMouseDown={onVolDrag} onTouchStart={onVolDrag}>
              <div className={styles.volFill} style={{ width: `${volume * 100}%` }} />
              <div className={styles.volKnob} style={{ left: `${volume * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Tracklist */}
      <div className={styles.tabPanel}>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabOn : ''}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab.toUpperCase()} <span className={styles.tabCount}>
                {tab === 'Favorites'
                  ? favorites.length.toString().padStart(2, '0')
                  : TRACKS.filter((t) => t.list === tab).length.toString().padStart(2, '0')
                }
              </span>
            </button>
          ))}
        </div>

        <div className={styles.tracklist}>
          {displayedTracks.length === 0 && activeTab === 'Favorites' && (
            <p className={styles.emptyState}><span className={styles.storageSlash} aria-hidden="true">//</span> You don't have favorites yet!</p>
          )}
          {displayedTracks.length === 0 && activeTab === 'Favorites' && (
            <p className={styles.storageNote}>
              <span className={styles.storageSlash} aria-hidden="true">//</span> This player uses local device storage to maintain your Favorites. Block Control does not store your personal data. 
            </p>
          )}
		            {displayedTracks.length === 0 && activeTab === 'Favorites' && (
            <p className={styles.storageNote}>
              <span className={styles.storageSlash} aria-hidden="true">//</span> Any stored data can be cleared via your browser settings at anytime.
            </p>
          )}
          {displayedTracks.map((track, i) => {
            const isActive = track.id === currentTrackId;
            return (
              <div
                key={track.id}
                className={`${styles.trk} ${isActive ? styles.trkOn : ''}`}
                onClick={() => handleTrackClick(track.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTrackClick(track.id); }}
                tabIndex={0}
                role="button"
                aria-label={`Play ${track.name}`}
              >
                {isActive && isPlaying ? (
                  <span className={styles.npeq}><i /><i /><i /></span>
                ) : (
                  <span className={styles.trkNum}>{(i + 1).toString().padStart(2, '0')}</span>
                )}
                <div className={styles.trkInfo}>
                  <div className={styles.trkName}>{track.name}</div>
                  <div className={styles.trkDesc}>{track.description}</div>
                </div>
                <a
                  className={styles.trkDownload}
                  href={track.src}
                  download={`Block Control - ${track.name}`}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Download ${track.name}`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14m0 0l-4-4m4 4l4-4"/><path d="M5 19h14"/></svg>
                </a>
                <button
                  className={`${styles.trkFav} ${favorites.includes(track.id) ? styles.trkFavOn : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(track.id); }}
                  aria-label={favorites.includes(track.id) ? `Remove ${track.name} from favorites` : `Add ${track.name} to favorites`}
                  type="button"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill={favorites.includes(track.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
                {confirmRemove === track.id && (
                  <div className={styles.confirmDialog}>
                    <span>Remove?</span>
                    <Button variant="outlined" color="cyan" onClick={(e) => { e.stopPropagation(); confirmRemoveFavorite(); }}>Y</Button>
                    <Button variant="outlined" color="neon" onClick={(e) => { e.stopPropagation(); cancelRemove(); }}>N</Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
