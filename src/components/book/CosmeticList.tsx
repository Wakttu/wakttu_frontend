import { getR2URL, R2_URL } from '@/services/api';
import {
  SelectOption,
  Wrap,
  DropdownSelect,
  DropdownOption,
  DropdownWrapper,
  Item,
  Leave,
  ListContainer,
  TopBar,
  DropdownText,
  DropdownImage,
  LeaveIcon,
  LeaveText,
  ItemImage,
  WrapFlex,
} from '@/styles/book/CosmeticList';
import {
  CosmeticBackground,
  CosmeticStyles,
  CosmeticType,
  CosmeticVariant,
} from '@/styles/book/CosmeticType';
import { RightWrapper } from '@/styles/book/BookForm';
import { RefObject } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { selectVoiceVolume } from '@/redux/audio/audioSlice';
import useWaktaSound from '@/hooks/useWaktaSound';
import { useCallback } from 'react';

interface Props {
  dataset: any;
  isOpen: boolean;
  dropDownRef: RefObject<HTMLDivElement>;
  selectedOption: { category: string; name: string };
  toggleDropdown: () => void;
  handleOptionClick: ({
    category,
    name,
  }: {
    category: string;
    name: string;
  }) => void;
  handleLeaveClick: () => void;
  handleInfoClick: (e: any) => void;
}

const CosmeticList = ({
  dataset,
  isOpen,
  dropDownRef,
  toggleDropdown,
  selectedOption,
  handleInfoClick,
  handleOptionClick,
  handleLeaveClick,
}: Props) => {
  const voiceVolume = useSelector(selectVoiceVolume);
  const sound = useWaktaSound(voiceVolume);

  const handleMouseEnter = useCallback(() => {
    if (sound) sound['l-2'].play();
  }, [sound]);

  return (
    <RightWrapper>
      <TopBar>
        <Wrap>
          <WrapFlex>
            <DropdownSelect ref={dropDownRef} isOpen={isOpen}>
              <SelectOption onClick={toggleDropdown}>
                <DropdownText>{selectedOption.name}</DropdownText>
                <DropdownImage
                  isOpen={isOpen}
                  src={R2_URL + '/assets/icons/down-line.svg'}
                />
              </SelectOption>
              <DropdownWrapper>
                {Object.entries(CosmeticStyles).map(([key, values]) => (
                  <DropdownOption
                    key={key}
                    onClick={() =>
                      handleOptionClick({ category: key, name: values.name })
                    }
                  >
                    {values.name}
                  </DropdownOption>
                ))}
              </DropdownWrapper>
            </DropdownSelect>

            <Leave onClick={handleLeaveClick}>
              <LeaveText onClick={() => Router.push('/roomlist')}>
                나가기
              </LeaveText>
              <LeaveIcon src={R2_URL + '/assets/icons/right-line.svg'} />
            </Leave>
          </WrapFlex>
        </Wrap>
      </TopBar>

      <ListContainer>
        {dataset
          .filter((data: any) =>
            selectedOption.category === 'all'
              ? true
              : data.category === selectedOption.category
          )
          .map(
            (data: { id: string; category: CosmeticVariant; url: string }) => (
              <Item
                key={data.id}
                data-id={data.id}
                onClick={handleInfoClick}
                onMouseEnter={handleMouseEnter}
              >
                <CosmeticBackground
                  $itemType={data.category}
                ></CosmeticBackground>
                <ItemImage
                  item={data.category}
                  id={data.id}
                  src={getR2URL(data.url)}
                />
              </Item>
            )
          )}
      </ListContainer>
    </RightWrapper>
  );
};

export default CosmeticList;
