import { getCharacter, getCharacterUrl } from '@/modules/UserInfo';
import {
  CharacterImage,
  EyeItem,
  HandItem,
  HeadItem,
  SkinItem,
} from '@/styles/common/CharacterItems';

interface Props {
  character: any;
  style?: React.CSSProperties; // style 속성 추가
  transform?: React.CSSProperties; // transform
}

const Character = ({ character, style, transform }: Props) => {
  const src = getCharacter(character);

  return (
    <>
      <CharacterImage
        style={{
          ...style,
          ...transform, // transform 적용
        }}
      >
        <SkinItem
          skin={character.skin ? character.skin : 'S-1'}
          src={src.skin ? src.skin : getCharacterUrl('S-1')}
        />
        <HeadItem skin={character.skin} src={src.head} />
        <HandItem skin={character.skin} item={character.hand} src={src.hand} />
        <EyeItem skin={character.skin} src={src.eye} />
      </CharacterImage>
    </>
  );
};

export default Character;
