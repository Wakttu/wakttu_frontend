import { getR2URL } from '@/services/api';
import {
  Modal,
  COption,
  CVolume,
  VoulmeText,
  Title,
  Setting,
  TitleText,
  VInput,
  CButton,
  Cancle,
  SetButton,
  VolumeContainer,
} from '@/styles/common/Option';
import { ChangeEvent, MouseEvent } from 'react';

interface Props {
  audio: { bgmVolume: number; effectVolume: number; voiceVolume: number };
  onClick: () => void;
  offModal: () => void;
  onBgmChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEffectChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onVoiceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const OptionBox = ({
  audio,
  onClick,
  offModal,
  onBgmChange,
  onEffectChange,
  onVoiceChange,
}: Props) => {
  return (
    <Modal onClick={offModal}>
      <COption onClick={(e) => e.stopPropagation()}>
        <Title>
          <Setting src={getR2URL('/assets/icons/setting.svg')} />
          <TitleText>환경설정</TitleText>
        </Title>
        <CVolume>
          <VoulmeText>배경음 볼륨</VoulmeText>
          <VolumeContainer range={audio.bgmVolume}>
            <VInput
              type="range"
              min={0}
              max={1}
              step={0.01}
              defaultValue={audio.bgmVolume}
              onChange={onBgmChange}
            />
          </VolumeContainer>
        </CVolume>
        <CVolume>
          <VoulmeText>효과음 볼륨</VoulmeText>
          <VolumeContainer range={audio.effectVolume}>
            <VInput
              type="range"
              min={0}
              max={1}
              step={0.01}
              defaultValue={audio.effectVolume}
              onChange={onEffectChange}
            />
          </VolumeContainer>
        </CVolume>
        <CVolume>
          <VoulmeText>음성 볼륨</VoulmeText>
          <VolumeContainer range={audio.voiceVolume}>
            <VInput
              type="range"
              min={0}
              max={1}
              step={0.01}
              defaultValue={audio.voiceVolume}
              onChange={onVoiceChange}
            />
          </VolumeContainer>
        </CVolume>
        <CButton>
          <SetButton onClick={onClick}>적용하기</SetButton>
          <Cancle onClick={offModal}>취소</Cancle>
        </CButton>
      </COption>
    </Modal>
  );
};

export default OptionBox;
