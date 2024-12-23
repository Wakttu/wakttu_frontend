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
  LoadingSpinner,
  TimerOverlay,
} from '@/styles/music/Main';
import ChatLog from '@/containers/game/music/ChatLog';

// Props 타입 정의
interface Props {
  music: any;
  timer: any;
  handleVolumeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlayerReady: (player: ReactPlayer) => void; // 플레이어 준비 완료 시 호출될 핸들러
  volume: number; // 볼륨 값 (0-100)
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 볼륨 변경 핸들러
  playing: boolean; // 재생 상태
  systemLog: string[]; // 시스템 로그 메시지 배열
  isVideoVisible: boolean;
  setIsVideoVisible: (visible: boolean) => void;
  playerRef: React.RefObject<ReactPlayer>;
}

// Music 컴포넌트 정의
const Music: React.FC<Props> = ({
  music,
  timer,
  handleVolumeUpdate,
  handlePlayerReady,
  volume,
  handleVolumeChange,
  playing,
  systemLog,
  isVideoVisible,
  setIsVideoVisible,
  playerRef,
}) => {
  return (
    <CMain>
      <SLeft>
        <Systemlog>
          <SystemlogItem>힌트</SystemlogItem>
          {systemLog.slice(-4).map((log, index) => (
            <SystemlogItem key={index}>{log}</SystemlogItem>
          ))}
        </Systemlog>
      </SLeft>
      <Middle>
        <VideoScreen $isVisible={isVideoVisible}>
          <YoutubeWrapper>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                music?.videoId || 'EMhKeVHboiA'
              }`}
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
                    start: music?.videoStartSec || 0, // 시작 시간 설정
                  },
                },
              }}
            />
          </YoutubeWrapper>
          <VideoTime $isVisible={isVideoVisible}></VideoTime>

          <LoadingOverlay $isLoading={false}>
            <LoadingSpinner />
          </LoadingOverlay>

          <TimerOverlay $isVisible={isVideoVisible}>
            {playerRef.current?.props.url ===
              'https://www.youtube.com/watch?v=EMhKeVHboiA' ||
            !playerRef.current ? (
              <div>로딩 중</div>
            ) : (
              <div>
                남은시간 : {(timer.roundTime - timer.countTime) / 100.0}초
              </div>
            )}
          </TimerOverlay>
        </VideoScreen>

        <Song>
          <SongIcon />
          <SongText $isVisible={isVideoVisible}>
            {music?.answer[0] || ''} - {music?.tag[0] || ''}
          </SongText>
          <VolumeControl>
            <VolumeText>볼륨</VolumeText>
            <VolumeSlider
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeUpdate}
            />
            <VolumeText>{volume}%</VolumeText>
          </VolumeControl>
        </Song>
      </Middle>
      <SRight>
        <ChatLog />
      </SRight>
    </CMain>
  );
};

export default Music;
