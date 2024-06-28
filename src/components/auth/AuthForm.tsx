import { FormEvent } from 'react';
import { FormContainer, FormSection } from '@/styles/modules/AuthForm';

interface Props {
  children: React.ReactNode;
  formTitle?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ children, formTitle = '회원가입', onSubmit }: Props) => {
  return (
    <FormContainer>
      <h1>{formTitle}</h1>
      <FormSection onSubmit={onSubmit}>{children}</FormSection>
    </FormContainer>
  );
};

export default AuthForm;
