import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  SkipBack, SkipForward, Settings, Download, Bookmark
} from 'lucide-react';

const VideoPlayer = ({
  videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
  title = "Course Video",
  onProgress,
  onComplete,
  bookmarks = [],
  onBookmarkAdd,
  allowDownload = false,
  subtitles = []
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('auto');

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const qualities = ['auto', '1080p', '720p', '480p', '360p'];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress) onProgress(video.currentTime, video.duration);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const skipForward = () => {
    const video = videoRef.current;
    video.currentTime = Math.min(video.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const addBookmark = () => {
    if (onBookmarkAdd) {
      onBookmarkAdd({
        time: currentTime,
        title: `Bookmark at ${formatTime(currentTime)}`
      });
    }
  };

  const jumpToBookmark = (time) => {
    videoRef.current.currentTime = time;
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto max-h-96 lg:max-h-[500px]"
        poster="https://via.placeholder.com/800x450?text=Video+Thumbnail"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(true)}
      >
        {subtitles.map((sub, idx) => (
          <track
            key={idx}
            kind="subtitles"
            srcLang={sub.lang}
            label={sub.label}
            src={sub.src}
            default={sub.default}
          />
        ))}
      </video>

      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="mb-4 relative">
            <div
              className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-blue-600 rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>

            {/* Bookmarks */}
            {bookmarks.map((bookmark, index) => (
              <div
                key={index}
                className="absolute top-0 w-2 h-2 bg-yellow-400 rounded-full cursor-pointer transform -translate-y-1/2"
                style={{ left: `${(bookmark.time / duration) * 100}%` }}
                onClick={() => jumpToBookmark(bookmark.time)}
                title={bookmark.title}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button onClick={skipBackward} className="hover:text-blue-400">
                <SkipBack className="h-6 w-6" />
              </button>

              <button onClick={togglePlay} className="hover:text-blue-400">
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </button>

              <button onClick={skipForward} className="hover:text-blue-400">
                <SkipForward className="h-6 w-6" />
              </button>

              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="hover:text-blue-400">
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={addBookmark} className="hover:text-blue-400" title="Add Bookmark">
                <Bookmark className="h-5 w-5" />
              </button>

              {allowDownload && (
                <a
                  href={videoUrl}
                  download
                  className="hover:text-blue-400"
                  title="Download Video"
                >
                  <Download className="h-5 w-5" />
                </a>
              )}

              <div className="relative">
                <button onClick={() => setShowSettings(!showSettings)} className="hover:text-blue-400">
                  <Settings className="h-5 w-5" />
                </button>
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg p-3 min-w-[200px] z-50">
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Playback Speed</p>
                      <div className="space-y-1">
                        {playbackRates.map((rate) => (
                          <button
                            key={rate}
                            onClick={() => changePlaybackRate(rate)}
                            className={`block w-full text-left text-sm px-2 py-1 rounded ${
                              playbackRate === rate ? 'bg-blue-600' : 'hover:bg-gray-700'
                            }`}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Quality</p>
                      <div className="space-y-1">
                        {qualities.map((q) => (
                          <button
                            key={q}
                            onClick={() => setQuality(q)}
                            className={`block w-full text-left text-sm px-2 py-1 rounded ${
                              quality === q ? 'bg-blue-600' : 'hover:bg-gray-700'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={toggleFullscreen} className="hover:text-blue-400">
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {bookmarks.length > 0 && (
        <div className="absolute top-4 right-4 bg-black/70 rounded-lg p-3 max-w-xs">
          <h4 className="text-white text-sm font-medium mb-2">Bookmarks</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {bookmarks.map((bookmark, index) => (
              <button
                key={index}
                onClick={() => jumpToBookmark(bookmark.time)}
                className="block w-full text-left text-xs text-gray-300 hover:text-white p-1 rounded hover:bg-white/10"
              >
                {formatTime(bookmark.time)} - {bookmark.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
