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
}

const Character = ({ character }: Props) => {
  const src = getCharacter(character);

  return (
    <>
      <CharacterImage>
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