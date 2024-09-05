import { useEffect, useState } from 'react';
import { Howl } from 'howler';

function useSound(
  src: string,
  volume: number = 1,
  fadeoutTime: number = 0,
  loop: boolean = false
): Howl | undefined {
  const [sound, setSound] = useState<Howl>();

  useEffect(() => {
    const newSound = new Howl({
      src: process.env.NEXT_PUBLIC_R2_URL + src,
      loop,
    });
    newSound.volume(volume);
    newSound.load();

    setSound(newSound);

    newSound.on('play', () => {
      const fadeouttime = fadeoutTime;

      if (!loop) {
        setTimeout(
          () => newSound.fade(volume, 0, fadeouttime),
          (newSound.duration() - newSound.seek()) * 1000 - fadeouttime
        );
      }
    });

    return () => {
      newSound.stop();
      newSound.unload();
      setSound(undefined);
    };
  }, [src, volume, fadeoutTime, loop]);

  return sound;
}

export default useSound;