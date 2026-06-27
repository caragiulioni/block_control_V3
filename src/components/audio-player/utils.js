import keak from '../../images/KEAK.jpg';
import riot from '../../images/RIOT.jpg';

const allTracks = [
  {
    src: 'https://storage.googleapis.com/webaudio/blockctrl_superhyphyrmx_full.mp3',
    thumbnail: `${keak}`,
    name: 'Super Hyphy RMX',
    active: false,
    hovered: false,
    paused: false,
    list: 'Mixes',
    id: 100,
    text: 'Some burlib about a song that sounds cool to fill space.',
  },
  {
    src: 'https://storage.googleapis.com/webaudio/blockctrl_brokenbottles.mp3',
    thumbnail: `${riot}`,
    name: 'Broeken Bottles',
    active: false,
    hovered: false,
    paused: false,
    mix: false,
    list: 'Mixes',
    id: 101,
    text: 'Some burlib about a song that sounds cool to fill space.',
  },
  {
    src: 'https://storage.googleapis.com/webaudio/blockctrl_brokenbottles.mp3',
    thumbnail: `${riot}`,
    name: 'Broeken Bottles',
    active: false,
    hovered: false,
    paused: false,
    mix: false,
    list: 'Tracks',
    id: 102,
    text: 'Some burlib about a song that sounds cool to fill space.',
  },
  {
    src: 'https://storage.googleapis.com/webaudio/blockctrl_superhyphyrmx_full.mp3',
    thumbnail: `${keak}`,
    name: 'Super Hyphy RMX',
    active: false,
    hovered: false,
    paused: false,
    list: 'Tracks',
    id: 103,
    text: 'Some burlib about a song that sounds cool to fill space.',
  },
  {
    src: 'https://storage.googleapis.com/webaudio/blockctrl_brokenbottles.mp3',
    thumbnail: `${riot}`,
    name: 'Broeken Bottles',
    active: false,
    hovered: false,
    paused: false,
    mix: false,
    list: 'Tracks',
    id: 119,
    text: 'Some burlib about a song that sounds cool to fill space.',
  },
  {
    src: 'https://storage.googleapis.com/webaudio/blockctrl_brokenbottles.mp3',
    thumbnail: `${riot}`,
    name: 'Broeken Bottles',
    active: false,
    hovered: false,
    paused: false,
    mix: false,
    list: 'Favorites',
    id: 104,
    text: 'Some burlib about a song that sounds cool to fill space.',
  },
  {
    src: 'https://storage.googleapis.com/webaudio/blockctrl_superhyphyrmx_full.mp3',
    thumbnail: `${keak}`,
    name: 'Super Hyphy RMX',
    active: false,
    hovered: false,
    paused: false,
    list: 'Favorites',
    id: 105,
    text: 'Some burlib about a song that sounds cool to fill space.',
  },
];

//play is built out to work as a play list. if the first trakc is loaded, you can go back in the list so prev
//should be disabled. same for skip when on the last track. a crude but reliable fix for now.
const assignPrevNextDisable = (currentTrack, playlist) => {
  const Previous = document.querySelector('[aria-label="Previous"]');
  const Skip = document.querySelector('[aria-label="Skip"]');

  const index = playlist.findIndex((track) => track.id === currentTrack);

  if (index == 0) {
    //disable the previous button we are at the start of the playlist, we cant go back
    (Previous.setAttribute('disabled', 'true'),
      (Previous.style.color = '#cccccc'),
      (Skip.removeAttribute('disabled'), (Skip.style.color = '#828282')));

    return;
  }

  if (index == playlist.length - 1) {
    //disabled the next button, we are at the end of the playlist, we cant go forward
    (Previous.removeAttribute('disabled'),
      (Previous.style.color = '#828282'),
      Skip.setAttribute('disabled', 'true'),
      (Skip.style.color = '#cccccc'));

    return;
  }

  //were in the middle of the playlist, enable both buttons
  Skip.removeAttribute('disabled');
  Skip.style.color = '#828282';
  Previous.removeAttribute('disabled');
  Previous.style.color = '#828282';
};

//as per the player docs, the volume doesnt work on mobile, and it takes up space so lets just hide it on small screens
const hideVolumeOnSmallScreens = () => {
  window.addEventListener('resize', (e) => {
    const isSmallScreen = e?.target?.innerWidth < 768 || e?.screen?.width < 768;
    const volume = document.querySelector('.rhap_volume-controls');
    isSmallScreen
      ? (volume.style.visibility = 'hidden')
      : (volume.style.visibility = 'visible');
  });
};

const mapTrackAttributes = (playlist, currentTrack, action, index) => {
  if (action == 'paused') {
    return playlist.map((track, i) => {
      if (track.id == currentTrack) {
        return {
          ...track,
          active: false,
          paused: true,
          hovered: false,
        };
      }
      return {
        ...track,
        active: false,
        paused: false,
        hovered: false,
      };
    });
  }

  if (action == 'play') {
    return playlist.map((track, i) => {
      if (track.id == currentTrack) {
        return {
          ...track,
          active: true,
          paused: false,
          hovered: false,
        };
      }
      return {
        ...track,
        active: false,
        paused: false,
        hovered: false,
      };
    });
  }

  if (action == 'hoverEnter') {
    return playlist.map((track, i) => {
      if (i == index) {
        console.log('TRACK');
        return {
          ...track,
          hovered: true,
        };
      }
      return {
        ...track,
        hovered: false,
      };
    });
  }

  if (action == 'hoverExit') {
    return playlist.map((track) => {
      return {
        ...track,
        hovered: false,
      };
    });
  }
};

export {
  assignPrevNextDisable,
  hideVolumeOnSmallScreens,
  mapTrackAttributes,
  allTracks,
};
