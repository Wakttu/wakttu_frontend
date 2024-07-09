import { FormEvent } from 'react';
import {
  FormContainer,
  FormName,
  FormSection,
  Modal,
} from '@/styles/auth/AuthForm';

interface Props {
  children: React.ReactNode;
  formTitle?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const AuthForm = ({ children, formTitle = '회원가입', onSubmit }: Props) => {
  return (
    <Modal>
      <FormContainer>
        <FormName>{formTitle}</FormName>
        <FormSection onSubmit={onSubmit}>{children}</FormSection>
      </FormContainer>
    </Modal>
  );
};

export default AuthForm;
