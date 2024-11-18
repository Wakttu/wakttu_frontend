import { getR2URL } from '@/services/api';
import { Room } from '@/services/socket/socket';
import {
  CCreate,
  CCreateRoom,
  CInput,
  CLabel,
  CreateIcon,
  CreateLabel,
  LabelWithIcon,
  Selected,
  Dropdown,
  DropdownItem,
  DropdownLine,
  CheckBox,
  CheckIcon,
  Modal,
  CCheck,
  CButton,
  ConfirmButton,
  CancleButton,
  ButtonText,
} from '@/styles/roomList/CreateRoom';
import { handleKeyDown } from '@/utils/keyboard';
import { RefObject } from 'react';

interface Props {
  modalRef: RefObject<HTMLDivElement>;
  isDown: boolean[];
  onDropdown: (index: number) => void;
  roomInfo: Room;
  onRoomInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (name: string, value: any) => void;
  onCancle: () => void;
  onUpdate: () => void;
}

const UpdateRoom = ({
  modalRef,
  isDown,
  onDropdown,
  roomInfo,
  onRoomInfo,
  onSelect,
  onCancle,
  onUpdate,
}: Props) => {
  return (
    <Modal>
      <CCreateRoom ref={modalRef}>
        <LabelWithIcon>
          <CreateIcon src={getR2URL('/assets/icons/plus-green.svg')} />
          <CreateLabel>방 만들기</CreateLabel>
        </LabelWithIcon>
        <CCreate>
          <CLabel>방 제목</CLabel>
          <CInput
            name="title"
            defaultValue={roomInfo.title}
            onChange={onRoomInfo}
            onKeyDown={handleKeyDown}
            maxLength={10}
          />
        </CCreate>
        <CCreate>
          <CLabel>비밀번호</CLabel>
          <CInput
            name="password"
            type="password"
            defaultValue={roomInfo.password}
            onChange={onRoomInfo}
            autoComplete="off"
            maxLength={8}
          />
        </CCreate>
        <CCreate>
          <CLabel>플레이어 수</CLabel>
          <CInput
            name="total"
            type="number"
            value={roomInfo.total}
            onChange={onRoomInfo}
            min={roomInfo.users.length > 2 ? roomInfo.users.length : '2'}
            max="8"
          />
        </CCreate>
        <CCreate>
          <CLabel>게임 유형</CLabel>
          <Dropdown onClick={() => onDropdown(0)}>
            <Selected>
              {roomInfo.type === 0
                ? '끝말잇기'
                : roomInfo.type === 1
                ? '쿵쿵따'
                : '왁타골든벨'}
            </Selected>
            <DropdownLine
              isopen={isDown[0]}
              src={getR2URL('/assets/icons/down-line.svg')}
            />
            {isDown[0] && (
              <>
                <DropdownItem onClick={() => onSelect('type', 0)}>
                  끝말잇기
                </DropdownItem>
                <DropdownItem onClick={() => onSelect('type', 1)}>
                  쿵쿵따
                </DropdownItem>
                <DropdownItem onClick={() => onSelect('type', 2)}>
                  왁타골든벨
                </DropdownItem>
              </>
            )}
          </Dropdown>
        </CCreate>
        <CCreate>
          <CLabel>라운드 수</CLabel>
          <CInput
            name="round"
            type="number"
            value={roomInfo.round}
            onChange={onRoomInfo}
            min={roomInfo.type === 2 ? '10' : '3'}
            max={roomInfo.type === 2 ? '30' : '8'}
          />
        </CCreate>
        {roomInfo.type !== 2 ? (
          <CCreate>
            <CLabel>라운드시간</CLabel>
            <Dropdown onClick={() => onDropdown(1)}>
              <Selected>{roomInfo.time! / 1000}초</Selected>
              <DropdownLine
                isopen={isDown[1]}
                src={getR2URL('/assets/icons/down-line.svg')}
              />
              {isDown[1] && (
                <>
                  <DropdownItem onClick={() => onSelect('time', 30000)}>
                    30초
                  </DropdownItem>
                  <DropdownItem onClick={() => onSelect('time', 60000)}>
                    60초
                  </DropdownItem>
                  <DropdownItem onClick={() => onSelect('time', 90000)}>
                    90초
                  </DropdownItem>
                  <DropdownItem onClick={() => onSelect('time', 120000)}>
                    120초
                  </DropdownItem>
                </>
              )}
            </Dropdown>
          </CCreate>
        ) : null}
        <CCreate>
          <CLabel>특수규칙</CLabel>
          {roomInfo.type !== 2 ? (
            <CheckBox onClick={() => onSelect('option', '팀전')}>
              <CCheck>
                {roomInfo.option!.indexOf('팀전') === -1 ? (
                  <CheckIcon src={getR2URL('/assets/icons/check-off.svg')} />
                ) : (
                  <CheckIcon src={getR2URL('/assets/icons/check-on.svg')} />
                )}
                <Selected tooltip="팀전이 가능해 집니다. 총 4팀까지 나눌 수 있습니다.">
                  팀전
                </Selected>
              </CCheck>
            </CheckBox>
          ) : null}
          {roomInfo.type !== 2 ? (
            <>
              <CheckBox onClick={() => onSelect('option', '매너')}>
                <CCheck>
                  {roomInfo.option!.indexOf('매너') === -1 ? (
                    <CheckIcon src={getR2URL('/assets/icons/check-off.svg')} />
                  ) : (
                    <CheckIcon src={getR2URL('/assets/icons/check-on.svg')} />
                  )}
                  <Selected tooltip="한방 단어를 사용 할 수 없게 됩니다.">
                    매너
                  </Selected>
                </CCheck>
              </CheckBox>
              <CheckBox onClick={() => onSelect('option', '외수')}>
                <CCheck>
                  {roomInfo.option!.indexOf('외수') === -1 ? (
                    <CheckIcon src={getR2URL('/assets/icons/check-off.svg')} />
                  ) : (
                    <CheckIcon src={getR2URL('/assets/icons/check-on.svg')} />
                  )}
                  <Selected tooltip="끄투의 어인정 단어를 사용할 수 있게 됩니다.">
                    외수
                  </Selected>
                </CCheck>
              </CheckBox>
            </>
          ) : null}
        </CCreate>

        <CButton>
          <ConfirmButton type="button" onClick={onUpdate}>
            <ButtonText>설정 끝내기</ButtonText>
          </ConfirmButton>
          <CancleButton type="button" onClick={onCancle}>
            <ButtonText $color={true}>취소</ButtonText>
          </CancleButton>
        </CButton>
      </CCreateRoom>
    </Modal>
  );
};

export default UpdateRoom;
