import layout from '@/styles/modules/layout.module.css';

interface Props {
  children: React.ReactNode;
}

const TemporaryLayout = ({ children }: Props) => {
  return <div className={layout.container}>{children}</div>;
};

export default TemporaryLayout;
