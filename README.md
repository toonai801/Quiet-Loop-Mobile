# QuietLoop Web

A standalone, local-first browser sound mixer and installable PWA. The interface and Web Audio engine are new web implementations; only QuietLoop media assets and sound names are reused from the existing library.

## Run locally

Serve this folder over HTTP or HTTPS. For example, run py -m http.server 8080 and open http://localhost:8080. Web Audio starts after a user gesture. A secure origin (HTTPS or localhost) is required for installation and service-worker offline support.

## Features

- Mood-based listening, a stereo live mixer, per-sound volume, timer, favorites, recents, and saved mixes.
- The 49 recorded library sounds plus procedural noise and environmental textures.
- 50 full-screen slideshow images. Exiting the slideshow does not stop playback.
- Favorites, recents, preferences, and mixes stay in browser storage on this device.
- The shell is cached after the first visit. Use Settings → Cache media for offline to cache the full sound and artwork library.

## Audio playback

Recorded sources enter independent Web Audio gain and stereo-pan nodes. The stereo mix feeds a peak-control compressor and the browser output. Procedural noise uses generated stereo audio buffers and per-sound filters. Add **Binaural beat** from **Soundboard → Frequencies** and adjust its 1–40 Hz beat in Your mix; it plays separate 174 Hz and offset tones to the left and right channels, so headphones are recommended.

## Browser constraints

Playback requires a user gesture. Browsers may suspend audio when the page is backgrounded, the device locks, or power saving is active. A PWA does not bypass those browser limits. Offline media use requires the cache operation to finish successfully and the browser to retain its cache.

## Privacy

There is no account, analytics, or preferences service. Saved mixes, favorites, and recents are stored locally in this browser. Sound and image files are served from the site and can be cached by this device.

The app intentionally omits Journey and Results.
