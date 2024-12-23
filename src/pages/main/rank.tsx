import { MainHeader } from '@/components';
import WakttuInfo from '@/components/main/Info';
import Rank from '@/containers/main/Ranking';
import { Container } from '@/styles/common/Layout';

const Ranking = () => {
  return (
    <Container>
      <MainHeader />
      <Rank />
      <WakttuInfo />
    </Container>
  );
};

export default Ranking;
