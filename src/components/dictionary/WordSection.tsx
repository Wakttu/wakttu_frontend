import { Container } from '@/components/dictionary/Container';
import { Word, Word_, WordProps } from '@/components/dictionary/Word';
import { client } from '@/services/api';
import { processWordData } from '@/utils/processWordData';
import { useEffect, useState } from 'react';

interface ApiResponse<T> {
  data: T;
}

const WordSection: React.FC = () => {
  const [todayWord, setTodayWord] = useState<WordProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodayWord = async () => {
      if (!todayWord) {  // todayWord가 null일 때만 요청
        try {
          const todayWord_: ApiResponse<Word_> = await client.get(`/dictionary/today`);
          const processedWord = processWordData(todayWord_.data);
          setTodayWord(processedWord);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTodayWord();
  }, [todayWord]); // todayWord 상태를 의존성 배열에 추가

  return (
    <Container type='bottom'>
      <Container type='content'>
        <h3>오늘의 단어</h3>
        {loading ? (
          <p>검색 중...</p>
        ) : error ? (
          <p>Error loading word of the day.</p>
        ) : todayWord ? (
          <Word {...todayWord} />
        ) : null}
      </Container>
    </Container>
  );
};

export default WordSection;
