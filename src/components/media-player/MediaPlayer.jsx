import { useState, useRef, useEffect, useCallback } from 'react';
import { TRACKS } from './trackData.js';
import styles from './MediaPlayer.module.css';

const MediaPlayer = () => {
  const audioRef = useRef(null);
  const [currentTrackId, setCurrentTrackId] = useState(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const currentTrack = TRACKS.find((t) => t.id === currentTrackId);
  const currentList = TRACKS.filter((t) => t.list === currentTrack.list);
  const currentIndex = currentList.findIndex((t) => t.id === currentTrackId);

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

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

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

  // Auto-play on track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentTrackId]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const time = pct * duration;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(pct);
  };

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
      <audio ref={audioRef} src={currentTrack.src} preload="metadata" />

      {/* Art */}
      <div className={styles.art}>
        <div className={styles.disc} />
        <div className={styles.artTag}>BLK // CTRL</div>
      </div>

      {/* Meta + Controls */}
      <div className={styles.main}>
        <div className={styles.meta}>
          <div className={styles.nowPlaying}>
            {isPlaying ? '▶ NOW PLAYING' : '⏸ PAUSED'}
          </div>
          <h3 className={styles.title}>{currentTrack.name}</h3>
          <p className={styles.subtitle}>{currentTrack.description}</p>
        </div>

        {/* Scrubber */}
        <div className={styles.scrub}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <div className={styles.scrubBar} onClick={handleSeek}>
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
            onClick={handleNext}
            aria-label="Next"
            disabled={currentIndex === currentList.length - 1}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6.5v11a1 1 0 001.5.87l9-5.5a1 1 0 000-1.74l-9-5.5A1 1 0 004 6.5z"/><rect x="15.6" y="6" width="2.4" height="12" rx="1"/></svg>
          </button>

          {/* Volume — inline on desktop, below on mobile */}
          <div className={styles.volume}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 8.5a5 5 0 010 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <div className={styles.volBar} onClick={handleVolumeChange}>
              <div className={styles.volFill} style={{ width: `${volume * 100}%` }} />
              <div className={styles.volKnob} style={{ left: `${volume * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
