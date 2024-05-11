import authForm from '@/styles/modules/authForm.module.css';

interface Props {
  placeholderText?: string;
}

const AuthInput = ({ placeholderText }: Props) => {
  return <input className={authForm.formItem} placeholder={placeholderText} />;
};

export default AuthInput;
