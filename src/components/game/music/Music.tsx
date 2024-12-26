import ReactPlayer from 'react-player';
import {
  CMain,
  Middle,
  YoutubeWrapper,
  Song,
  SongIcon,
  SongText,
  VolumeControl,
  VolumeSlider,
  SLeft,
  SRight,
  Systemlog,
  SystemlogItem,
  VideoScreen,
  TimerOverlay,
  VolumeImg,
  TimerImg,
  Tag,
  CTimer,
  GameImg,
} from '@/styles/music/Main';
import ChatLog from '@/containers/game/music/ChatLog';
import { getR2URL } from '@/services/api';

// Props 타입 정의
interface Props {
  round: number;
  music: any;
  hint: string;
  singer: string[];
  timer: any;
  handleVolumeUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlayerReady: (player: ReactPlayer) => void; // 플레이어 준비 완료 시 호출될 핸들러
  volume: number; // 볼륨 값 (0-100)
  playing: boolean; // 재생 상태
  isVideoVisible: boolean;
  playerRef: React.RefObject<ReactPlayer>;
}

// Music 컴포넌트 정의
const Music: React.FC<Props> = ({
  round,
  music,
  timer,
  handleVolumeUpdate,
  handlePlayerReady,
  volume,
  playing,
  hint,
  singer,
  isVideoVisible,
  playerRef,
}) => {
  return (
    <CMain>
      <SLeft>
        <Systemlog>
          <SystemlogItem>Round {round ? round : 0}</SystemlogItem>
          {singer.length > 0 && (
            <SystemlogItem>
              {singer.map((item) => {
                return (
                  <Tag key={item} tag={item}>
                    {item}
                  </Tag>
                );
              })}
            </SystemlogItem>
          )}

          {hint !== '' && <SystemlogItem>{hint}</SystemlogItem>}
        </Systemlog>
      </SLeft>
      <Middle>
        <VideoScreen $isVisible={isVideoVisible}>
          <YoutubeWrapper>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                music?.videoId || 'EMhKeVHboiA'
              }`}
              width="40rem"
              height="22.5rem"
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
                    start: music?.start_time || 0, // 시작 시간 설정
                  },
                },
              }}
            />
          </YoutubeWrapper>

          <TimerOverlay $isVisible={isVideoVisible}>
            {playerRef.current ? (
              playerRef.current.props.url ===
              'https://www.youtube.com/watch?v=EMhKeVHboiA' ? (
                <div>로딩 중</div>
              ) : (
                <CTimer>
                  {playing ? (
                    <>
                      <TimerImg
                        src={getR2URL('/assets/game/timer-white.svg')}
                      />
                      {(timer.roundTime - timer.countTime) / 1000}
                    </>
                  ) : (
                    <GameImg src={getR2URL('/assets/channel/wakttu.svg')} />
                  )}
                </CTimer>
              )
            ) : (
              <div>로딩 중</div>
            )}
          </TimerOverlay>
        </VideoScreen>

        <Song>
          <SongIcon
            src={
              music?.img && isVideoVisible
                ? getR2URL(music.img)
                : getR2URL('/assets/channel/wakttu.svg')
            }
          />
          <SongText $isVisible={isVideoVisible}>{music?.title}</SongText>
          <VolumeControl>
            <VolumeImg src={getR2URL('/assets/game/music-volume.svg')} />
            <VolumeSlider
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeUpdate}
            />
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
