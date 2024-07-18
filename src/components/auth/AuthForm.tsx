import { FormEvent, MouseEvent } from "react";
import {
  FormContainer,
  FormName,
  FormSection,
  Modal,
  InputContainer,
  SubmitContainer,
  WrapButton,
  SubmitButton,
  SnsContainer,
  SnsText,
  SnsIcon,
  FormFooter,
  LinkText,
  ModalContainer,
} from "@/styles/auth/AuthForm";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/modal/modalSlice";

interface Props {
  children: React.ReactNode;
  formTitle?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onToggle?: (e: MouseEvent<HTMLElement>) => void;
  onAuth?: (e: MouseEvent<HTMLElement>) => void;
}

const AuthForm = ({
  children,
  formTitle = "로그인",
  onSubmit,
  onToggle,
  onAuth,
}: Props) => {
  const dispatch = useDispatch();

  const offModal = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  return (
    <ModalContainer onClick={offModal}>
      <Modal onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}>
        <FormContainer>
          <FormSection onSubmit={onSubmit}>
            <FormName>{formTitle}</FormName>
            <InputContainer>{children}</InputContainer>
            <WrapButton>
              <SubmitContainer>
                <SubmitButton>{formTitle}</SubmitButton>
              </SubmitContainer>
              <SnsContainer>
                <SnsText>sns로 간편하게 {formTitle}</SnsText>
                <SnsIcon src="/assets/wakgames-icon.svg" onClick={onAuth} />
              </SnsContainer>
            </WrapButton>
            <FormFooter>
              <SnsText>
                {formTitle === "로그인"
                  ? "가입 하시겠어요?"
                  : "이미 가입하셨나요?"}
              </SnsText>
              <LinkText onClick={onToggle}>
                {formTitle === "로그인" ? "회원가입" : "로그인"}
              </LinkText>
            </FormFooter>
          </FormSection>
        </FormContainer>
      </Modal>
    </ModalContainer>
  );
};

export default AuthForm;
