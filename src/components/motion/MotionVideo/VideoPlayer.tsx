import { VideoMedia } from "@/data/imagesAndVimeoVideos";
import { CSSProperties, ChangeEvent, MouseEvent, useState } from "react";
import ReactPlayer from "react-player/lazy";

import { Play } from "./icons/Play";
import { Pause } from "./icons/Pause";
import { Volume } from "./icons/Volume";
import { Mute } from "./icons/Mute";
import { FullscreenOpen } from "./icons/FullscreenOpen";
import { FullscreenClose } from "./icons/FullscreenClose";
import styled from "styled-components";
import { OnProgressProps } from "react-player/base";

const Wrapper = styled.div<{ active: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: ${({ active }) => (active ? 1 : 0)} !important;
`;

const Controls = styled.div`
  color: var(--white);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  padding: 34px 12px 12px;
  column-gap: 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
`;

const ProgressBar = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
`;

const Seeker = styled.input`
  background: 0 0;
  border-radius: 0;
  color: white;
  appearance: none;
  grid-row: 1;
  z-index: 1;
  grid-column: 1;
  margin: 0;
  padding: 0;
  color: white;
  &::-webkit-slider-runnable-track {
    background: 0 0;
    border: 0;
    border-radius: 0;
    height: 5px;
    -webkit-user-select: none;
    user-select: none;
    background-image: linear-gradient(
      to right,
      currentColor var(--value, 0),
      transparent var(--value, 0)
    );
  }
  &::-webkit-slider-thumb {
    background: var(--white);
    border: 0;
    border-radius: 100%;
    height: 13px;
    position: relative;
    transition: all 0.2s ease;
    width: 13px;
    -webkit-appearance: none;
    margin-top: -4px;
  }
  &::-moz-range-track {
    background: 0 0;
    border: 0;
    border-radius: 0;
    height: 5px;
    -moz-user-select: none;
    user-select: none;
  }
  &::-moz-range-thumb {
    background: var(--white);
    border: 0;
    border-radius: 100%;
    height: 13px;
    position: relative;
    transition: all 0.2s ease;
    width: 13px;
  }
  &::-moz-range-progress {
    background: currentColor;
    border-radius: 0;
    height: 5px;
  }
  &::-ms-track {
    background: 0 0;
    border: 0;
    border-radius: 0;
    height: 5px;
    -ms-user-select: none;
    user-select: none;
    color: transparent;
  }
  &::-ms-fill-upper {
    background: 0 0;
    border: 0;
    border-radius: 0;
    height: 5px;
    -ms-user-select: none;
    user-select: none;
  }
  &::-ms-fill-lower {
    background: 0 0;
    border: 0;
    border-radius: 0;
    height: 5px;
    -ms-user-select: none;
    user-select: none;
    background: currentColor;
  }
  &::-ms-thumb {
    background: var(--white);
    border: 0;
    border-radius: 100%;
    height: 13px;
    position: relative;
    transition: all 0.2s ease;
    width: 13px;
    margin-top: 0;
  }
  &:focus {
    outline: 0;
  }
  &::-moz-focus-outer {
    border: 0;
  }
  &::-webkit-slider-runnable-track {
    background-color: rgba(255, 255, 255, 0.25);
  }
  &::-moz-range-track {
    background-color: rgba(255, 255, 255, 0.25);
  }
  &::-ms-track {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const Progress = styled.progress`
  color: hsla(0, 0%, 100%, 0.25);
  background-repeat: repeat-x;
  background-size: 25px 25px;
  appearance: none;
  border: none;
  width: 100%;
  grid-row: 1;
  grid-column: 1;
  pointer-events: none;
  height: 5px;
  &::-webkit-progress-bar {
    background: 0 0;
  }
  &::-webkit-progress-value {
    background: currentColor;
    border-radius: 0;
    min-width: 5px;
    transition: width 0.2s ease;
  }
  &::-moz-progress-bar {
    background: currentColor;
    border-radius: 0;
    min-width: 5px;
    transition: width 0.2s ease;
  }
  &::-ms-fill {
    border-radius: 0;
    transition: width 0.2s ease;
  }
`;

const UnstyledButton = styled.button`
  all: unset;
`;

export interface VideoPlayerProps {
  playerRef: React.MutableRefObject<any>;
  media: VideoMedia["media"];
}

export const VideoPlayer = ({
  playerRef,
  media,
  ...props
}: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(0);
  const [played, setPlayed] = useState(0);
  const [showTeaser, setShowTeaser] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState(false);

  const toggleFullscreen = () => {
    // screenfull.toggle(wrapperRef.current);
    setFullscreen(!fullscreen);
  };

  function handleProgress(state: OnProgressProps) {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  }

  function handleSeekMouseDown() {
    setSeeking(true);
  }

  function handleSeekChange(e: ChangeEvent<HTMLInputElement>) {
    setPlayed(parseFloat(e.target.value));
  }

  function handleSeekMouseUp(e: MouseEvent<HTMLInputElement>) {
    if (!playerRef.current) return;
    const target = e.target as HTMLInputElement;
    playerRef.current.seekTo(parseFloat(target.value));
    setSeeking(false);
  }

  function handleEnded() {
    setShowTeaser(true);
    playerRef.current.seekTo(0);
  }

  function handleError() {
    setPlaying(false);
    setError(true);
  }

  return (
    <Wrapper active={true}>
      <ReactPlayer
        ref={playerRef}
        url={media.vimeoUrl}
        playing={playing}
        muted={muted}
        onError={handleError}
        onProgress={handleProgress}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
        onEnded={handleEnded}
        {...props}
      />
      <Controls>
        <UnstyledButton type="button" onClick={() => setPlaying(!playing)}>
          {playing ? <Pause /> : <Play />}
        </UnstyledButton>
        <ProgressBar>
          <Seeker
            style={{ "--value": `${played * 100}%` } as CSSProperties}
            type="range"
            onMouseDown={() => handleSeekMouseDown()}
            onChange={(e) => handleSeekChange(e)}
            min={0}
            max={0.999999}
            step="any"
            onMouseUp={(e) => handleSeekMouseUp(e)}
            value={played}
          />
          <Progress max={1} value={loaded} />
        </ProgressBar>
        <UnstyledButton type="button" onClick={() => setMuted(!muted)}>
          {muted ? <Mute /> : <Volume />}
        </UnstyledButton>
        <UnstyledButton type="button" onClick={() => toggleFullscreen()}>
          {fullscreen ? <FullscreenOpen /> : <FullscreenClose />}
        </UnstyledButton>
      </Controls>
    </Wrapper>
  );
};
