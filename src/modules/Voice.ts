import data from '@/modules/Voice.json';
import { R2_URL } from '@/services/api';

const { woo, gomem, ine, jingburger, lilpa, jururu, gosegu, viichan } = data;

const Read = () =>
  console.log(woo, ine, jingburger, lilpa, jururu, gosegu, viichan);

const createVoiceArray = (
  characterData: { id: string; src?: string }[],
  characterName: string
) => {
  return characterData.map((item) => ({
    id: item.id,
    src: item.src
      ? item.src
      : `${R2_URL!}/assets/voice/${characterName}/${item.id}.webm`,
  }));
};

const List = () => {
  const arr = [
    ...createVoiceArray(woo, 'woo'),
    ...createVoiceArray(gomem, 'gomem'),
    ...createVoiceArray(ine, 'ine'),
    ...createVoiceArray(jingburger, 'jingburger'),
    ...createVoiceArray(lilpa, 'lilpa'),
    ...createVoiceArray(jururu, 'jururu'),
    ...createVoiceArray(gosegu, 'gosegu'),
    ...createVoiceArray(viichan, 'viichan'),
  ];
  return arr;
};

const GetKey = (type: string, meta?: { [x: string]: any }) => {
  return meta ? (meta.bgm ? meta.bgm : getDefault(type)) : getDefault(type);
};

const getDefault = (type: string) => {
  switch (type) {
    case 'INE': {
      return 'i-1';
    }
    case 'JINGBURGER': {
      return 'ji-3';
    }
    case 'LILPA': {
      return 'l-3';
    }
    case 'JURURU': {
      return 'ju-2';
    }
    case 'GOSEGU': {
      return 'g-4';
    }
    case 'VIICHAN': {
      return 'v-7';
    }
    default: {
      return 'woo-2';
    }
  }
};

export { List, Read, GetKey };
