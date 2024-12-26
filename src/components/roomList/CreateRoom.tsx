import { RoomInfo } from '@/containers/roomlist/CreateRoom';
import { getR2URL } from '@/services/api';
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
  roomInfo: RoomInfo;
  onRoomInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (name: string, value: any) => void;
  onCancle: () => void;
  onCreate: () => void;
}

type RoomType = Record<number, string>;
const roomType: RoomType = {
  0: '끝말잇기',
  1: '쿵쿵따',
  2: '왁타골든벨',
  3: '왁뚜레코드',
  4: '구름',
};

const haveRoundTime = (type: number) => {
  return type === 0 || type === 1;
};

const haveRoundCount = (type: number) => {
  const roundCount: Record<number, { min: string; max: string }> = {
    0: { min: '3', max: '8' },
    1: { min: '3', max: '8' },
    2: { min: '10', max: '20' },
    3: { min: '10', max: '20' },
    4: { min: '10', max: '50' },
  };

  return roundCount[type];
};

const CreateRoom = ({
  modalRef,
  isDown,
  onDropdown,
  roomInfo,
  onRoomInfo,
  onSelect,
  onCancle,
  onCreate,
}: Props) => {
  return (
    <Modal>
      <CCreateRoom ref={modalRef}>
        <LabelWithIcon>
          <CreateIcon
            src={getR2URL('/assets/icons/plus-green.svg')}
            alt="방 만들기 아이콘"
          />
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
            min="2"
            max="8"
          />
        </CCreate>
        <CCreate>
          <CLabel>게임 유형</CLabel>
          <Dropdown onClick={() => onDropdown(0)}>
            <Selected>{roomType[roomInfo.type]}</Selected>
            <DropdownLine
              isopen={isDown[0]}
              src={getR2URL('/assets/icons/down-line.svg')}
              alt="아래쪽 화살표 아이콘"
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
                <DropdownItem onClick={() => onSelect('type', 3)}>
                  왁뚜레코드
                </DropdownItem>
                <DropdownItem onClick={() => onSelect('type', 4)}>
                  구름
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
            min={haveRoundCount(roomInfo.type).min}
            max={haveRoundCount(roomInfo.type).max}
          />
        </CCreate>
        {haveRoundTime(roomInfo.type) ? (
          <CCreate>
            <CLabel>라운드시간</CLabel>
            <Dropdown onClick={() => onDropdown(1)}>
              <Selected>{roomInfo.time! / 1000}초</Selected>
              <DropdownLine
                isopen={isDown[1]}
                src={getR2URL('/assets/icons/down-line.svg')}
                alt="아래쪽 화살표 아이콘"
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
          {haveRoundTime(roomInfo.type) ? (
            <CheckBox onClick={() => onSelect('option', '팀전')}>
              <CCheck>
                {roomInfo.option!.indexOf('팀전') === -1 ? (
                  <CheckIcon
                    src={getR2URL('/assets/icons/check-off.svg')}
                    alt="체크 안됨"
                  />
                ) : (
                  <CheckIcon
                    src={getR2URL('/assets/icons/check-on.svg')}
                    alt="체크 됨"
                  />
                )}
                <Selected tooltip="팀전이 가능해 집니다. 총 4팀까지 나눌 수 있습니다.">
                  팀전
                </Selected>
              </CCheck>
            </CheckBox>
          ) : null}
          {haveRoundTime(roomInfo.type as number) ? (
            <>
              <CheckBox onClick={() => onSelect('option', '매너')}>
                <CCheck>
                  {roomInfo.option!.indexOf('매너') === -1 ? (
                    <CheckIcon
                      src={getR2URL('/assets/icons/check-off.svg')}
                      alt="체크 안됨"
                    />
                  ) : (
                    <CheckIcon
                      src={getR2URL('/assets/icons/check-on.svg')}
                      alt="체크 됨"
                    />
                  )}
                  <Selected tooltip="한방 단어를 사용 할 수 없게 됩니다.">
                    매너
                  </Selected>
                </CCheck>
              </CheckBox>
              <CheckBox onClick={() => onSelect('option', '외수')}>
                <CCheck>
                  {roomInfo.option!.indexOf('외수') === -1 ? (
                    <CheckIcon
                      src={getR2URL('/assets/icons/check-off.svg')}
                      alt="체크 안됨"
                    />
                  ) : (
                    <CheckIcon
                      src={getR2URL('/assets/icons/check-on.svg')}
                      alt="체크 됨"
                    />
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
          <ConfirmButton type="button" onClick={onCreate}>
            <ButtonText>방 만들기</ButtonText>
          </ConfirmButton>
          <CancleButton type="button" onClick={onCancle}>
            <ButtonText $color={true}>취소</ButtonText>
          </CancleButton>
        </CButton>
      </CCreateRoom>
    </Modal>
  );
};

export default CreateRoom;
