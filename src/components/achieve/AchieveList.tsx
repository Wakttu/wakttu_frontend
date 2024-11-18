import { Item } from '@/containers/achieve/Achieve';
import { getAchieveURL } from '@/services/api';
import { Badge, BadgeBox, Hidden, List } from '@/styles/achieve/AchieveList';
import { RightWrapper } from '@/styles/achieve/Layout';

interface Props {
  achieves: Item[];
  onClick: (e: any) => void;
}

const AchieveList = ({ achieves, onClick }: Props) => {
  return (
    <RightWrapper>
      <List>
        {achieves.map((achieve: Item) => {
          return (
            <BadgeBox key={achieve.id} data-id={achieve.id} onClick={onClick}>
              {achieve.hidden && !achieve.got ? (
                <Hidden />
              ) : (
                <Badge got={achieve.got} src={getAchieveURL(achieve.id)} />
              )}
            </BadgeBox>
          );
        })}
      </List>
    </RightWrapper>
  );
};

export default AchieveList;
