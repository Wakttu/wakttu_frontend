// 필요한 리액트 훅과 컴포넌트 임포트
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { selectMusic } from '@/redux/music/musicSlice';
// 스타일 컴포넌트 임포트
import {
  CMain,
  Middle,
  YoutubeWrapper,
  Song,
  SongIcon,
  SongText,
  VolumeControl,
  VolumeSlider,
  VolumeText,
  SLeft,
  SRight,
  Systemlog,
  SystemlogItem,
  VideoScreen,
  VideoTime,
  LoadingOverlay,
  LoadingSpinner
} from '@/styles/music/Main';

// Props 타입 정의
interface Props {
  handlePlayerReady: (player: ReactPlayer) => void; // 플레이어 준비 완료 시 호출될 핸들러
  volume: number; // 볼륨 값 (0-100)
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 볼륨 변경 핸들러
  playing: boolean; // 재생 상태
  handleNextRound: () => void; // 다음 라운드 진행 핸들러
  systemLog: string[]; // 시스템 로그 메시지 배열
}

// Music 컴포넌트 정의
const Music: React.FC<Props> = ({ handlePlayerReady, volume, handleVolumeChange, playing, handleNextRound, systemLog }) => {
  // Refs
  const playerRef = useRef<ReactPlayer | null>(null); // ReactPlayer 인스턴스 참조
  const timeoutRef = useRef<NodeJS.Timeout>(); // 볼륨 디바운스 타이머 참조

  // Redux
  const music = useSelector(selectMusic); // 현재 음악 정보
  const dispatch = useDispatch();

  // State
  const [localVolume, setLocalVolume] = useState(volume); // 로컬 볼륨 상태
  const [isVideoVisible, setIsVideoVisible] = useState(false); // 비디오 표시 여부
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [duration, setDuration] = useState(0); // 전체 재생 시간
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 디바운스된 볼륨 업데이트 함수
  const handleVolumeUpdate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setLocalVolume(newVolume); // 로컬 상태 즉시 업데이트

    // 이전 타이머 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 80ms 후에 실제 볼륨 업데이트
    timeoutRef.current = setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.getInternalPlayer()?.setVolume(newVolume / 100);
      }
      handleVolumeChange(event);
    }, 80);
  }, [handleVolumeChange]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 음악이 변경될 때 로딩 상태 처리
  useEffect(() => {
    if (music) {
      setIsLoading(true);
      // 1초 후에 로딩 상태 해제
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [music]);

  // 시간 포맷팅 함수 (초 -> MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <CMain>
      <SLeft>
        <Systemlog>
          <SystemlogItem>시스템 로그</SystemlogItem>
          {systemLog.map((log, index) => (
            <SystemlogItem key={index}>{log}</SystemlogItem>
          ))}
        </Systemlog>
      </SLeft>
      <Middle>
        {music && (
          <>
            <VideoScreen $isVisible={isVideoVisible}>
              <YoutubeWrapper>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${music.videoId}`}
                  width="560px"
                  height="315px"
                  controls={false}
                  playing={playing}
                  volume={volume / 100}
                  onReady={handlePlayerReady}
                  config={{
                    youtube: {
                      playerVars: {
                        disablekb: 1, // 키보드 컨트롤 비활성화
                        modestbranding: 1, // YouTube 로고 최소화
                        rel: 0, // 관련 동영상 표시 안함
                        start: music.videoStartSec // 시작 시간 설정
                      },
                    },
                  }}
                  onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
                  onDuration={(duration) => setDuration(duration)}
                />
              </YoutubeWrapper>
              <VideoTime $isVisible={isVideoVisible}>
                {formatTime(currentTime+1)} / {formatTime(duration)}
              </VideoTime>
              <LoadingOverlay $isLoading={isLoading}>
                <LoadingSpinner />
              </LoadingOverlay>
            </VideoScreen>

            <Song>
              <SongIcon />
              <SongText $isVisible={isVideoVisible}>{music.answer[0]} - {music.tag[0]}</SongText>
              <VolumeControl>
                <VolumeText>볼륨</VolumeText>
                <VolumeSlider
                  type="range"
                  min="0"
                  max="100"
                  value={localVolume}
                  onChange={handleVolumeUpdate}
                />
                <VolumeText>{localVolume}%</VolumeText>
              </VolumeControl>
              <button onClick={handleNextRound}>next</button>
              <button onClick={() => setIsVideoVisible(!isVideoVisible)}>
                {isVideoVisible ? 'hidden' : 'show'}
              </button>
            </Song>
          </>
        )}
      </Middle>
      <SRight>
      </SRight>
    </CMain>
  );
};

export default Music;
