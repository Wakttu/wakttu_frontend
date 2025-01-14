import useEffectSound from '@/hooks/useEffectSound';
import { selectEffectVolume } from '@/redux/audio/audioSlice';
import { getR2URL } from '@/services/api';
import {
  Body,
  Content,
  CTitle,
  Overlay,
  Title,
  TitleImg,
  Weather,
  WeatherImg,
  WeatherText,
} from '@/styles/cloud/Weather';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  weather: string;
}
const weathers = [
  { weather: 'cloud', name: '구름', src: getR2URL('/assets/game/cloud.svg') },
  { weather: 'fog', name: '안개', src: getR2URL('/assets/game/fog.svg') },
  { weather: 'wind', name: '강풍', src: getR2URL('/assets/game/wind.svg') },
  { weather: 'segu', name: '세구', src: getR2URL('/assets/game/segu.svg') },
];

const titles = (weather: string) => {
  if (weather === 'segu') return ['이', '상', '기', '후', ' ', '발', '생', '!'];
  return ['오', '늘', '의', ' ', '날', '씨', '는', '?'];
};

const WeatherSlide = ({ weather }: Props) => {
  const [title, setTitle] = useState<string[]>();
  const [selectedIndex, setIndex] = useState<number>(0);
  const effectVolume = useSelector(selectEffectVolume);

  const CloudStartSound = useEffectSound(
    '/assets/sound-effects/lossy/cloud_start.webm',
    effectVolume
  );

  const CloudWarnSound = useEffectSound(
    '/assets/sound-effects/lossy/cloud_warning.webm',
    effectVolume
  );

  useEffect(() => {
    weather === 'segu' ? CloudWarnSound?.play() : CloudStartSound?.play();
    setTitle(titles(weather));
    setIndex(weathers.findIndex((item) => item.weather === weather));
  }, [CloudStartSound, CloudWarnSound, weather]);

  return (
    <Overlay>
      <Content weather={weather}>
        <CTitle>
          <TitleImg
            src={
              weather === 'segu'
                ? getR2URL('/assets/game/danger-icon.svg')
                : getR2URL('/assets/game/cloud-icon.svg')
            }
          />
          <Title weather={weather}>
            {title?.map((char, idx) => (
              <span key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </Title>
        </CTitle>
        <Body>
          <Weather key={weather}>
            <WeatherImg
              src={weathers[selectedIndex].src}
              alt={weathers[selectedIndex].name}
            />
            <WeatherText>{weathers[selectedIndex].name}</WeatherText>
          </Weather>
        </Body>
      </Content>
    </Overlay>
  );
};

export default WeatherSlide;
