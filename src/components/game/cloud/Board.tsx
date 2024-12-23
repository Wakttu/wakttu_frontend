import {
  BlackCloud,
  Cloud,
  CloudText,
  Game,
  GoldCloud,
} from '@/styles/cloud/Cloud';

export interface Cloud {
  _id: string;
  x: string;
  y: string;
  duration: string;
  delay: string;
  clear: boolean;
  type: number;
}

interface Props {
  clouds?: Cloud[];
  pause: boolean;
  weather?: string;
}

const Board = ({ clouds, pause, weather }: Props) => {
  return (
    <Game>
      {clouds &&
        clouds.map((cloud, index) => {
          if (cloud.type === 0)
            return (
              <Cloud
                key={index}
                x={cloud.x}
                y={cloud.y}
                duration={cloud.duration}
                delay={cloud.delay}
                clear={pause ? cloud.clear : true}
                weather={weather}
              >
                <CloudText>{cloud._id}</CloudText>
              </Cloud>
            );
          else if (cloud.type === 1)
            return (
              <BlackCloud
                key={index}
                x={cloud.x}
                y={cloud.y}
                duration={cloud.duration}
                delay={cloud.delay}
                clear={pause ? cloud.clear : true}
                weather={weather}
              >
                <CloudText type={cloud.type}>{cloud._id}</CloudText>
              </BlackCloud>
            );
          else {
            if (pause)
              return (
                <GoldCloud
                  key={index}
                  x={cloud.x}
                  y={cloud.y}
                  duration={cloud.duration}
                  delay={cloud.delay}
                  clear={pause ? cloud.clear : true}
                  weather={weather}
                >
                  <CloudText type={cloud.type}>{cloud._id}</CloudText>
                </GoldCloud>
              );
          }
        })}
    </Game>
  );
};

export default Board;
