import { Container } from '@/styles/modules/Layout';

interface Props {
  children: React.ReactNode;
}

const TemporaryLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default TemporaryLayout;
