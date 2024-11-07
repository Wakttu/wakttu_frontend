import { useState } from 'react';
import { AchieveState } from '@/redux/achieve/achieveSlice';
import { getAchieveURL } from '@/services/api';
import {
  Badge,
  Box,
  CAchieve,
  Content,
  Desc,
  Info,
  Left,
  Name,
} from '@/styles/common/Achieve';

interface Props {
  achieves: AchieveState[];
}

const Achieve = ({ achieves }: Props) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <>
      {achieves.map((achieve: AchieveState, idx: number) => {
        return (
          <Box key={achieve.id} idx={idx}>
            <Left />
            <CAchieve>
              <Content>
                <Badge
                  src={getAchieveURL(achieve.id)}
                  onLoad={() => handleImageLoad(achieve.id)}
                />
                <Info>
                  <Name>{achieve.name}</Name>
                  <Desc>{achieve.desc}</Desc>
                </Info>
              </Content>
            </CAchieve>
          </Box>
        );
      })}
    </>
  );
};

export default Achieve;
