import { Container } from '@/components/dictionary/Container';
import { Word, WordProps, Words_ } from '@/components/dictionary/Word';
import SearchBar from '@/components/dictionary/SearchBar';
import { ListWrapper } from '@/styles/dictionary/Word';
import { useRouter } from 'next/router';
import { client } from '@/services/api';
import { useEffect, useState } from 'react';
import { processWordsData } from '@/utils/processWordData';

const SearchSection = () => {
  const router = useRouter();
  const { keyword } = router.query;  // URL에서 keyword를 추출
  const [words, setWords] = useState<WordProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  // 에러 상태 추가
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const getWords = async () => {
      if (!keyword) {
        setWords([])
        setLoading(false);
        setError(false);
        return;
      };  // keyword가 없으면 요청하지 않음
      setLoading(true);
      setError(false);  // 요청 시작 시 에러 상태 초기화
      try {
        const response = await client.get(`/dictionary/search?keyword=${keyword}&take=20&skip=0`);
        const words_: Words_ = response.data;
        const processedWords = processWordsData(words_);
        setWords(processedWords);
      } catch {
        setError(true);  // 에러 발생 시 에러 상태 업데이트
      } finally {
        setLoading(false);
      }
    };

    getWords();
    setInputValue(Array.isArray(keyword) ? keyword[0] : keyword || '');
  }, [keyword]);

  return (
    <Container>
      <SearchBar inputValue={inputValue} setInputValue={setInputValue} />
      {loading ? (
        <p>검색 중...</p>  // 로딩 중일 때 보여줄 텍스트
      ) : error ? (
        <p>Error loading words. Please try again later.</p>  // 에러 발생 시
      ) : words.length === 0 ? (
        <p>검색결과가 없습니다</p>
      ) : (
        <ListWrapper>
          {words.map((wordProps, index) => (
            <Word key={index} {...wordProps} />
          ))}
        </ListWrapper>
      )}
    </Container>
  );
};

export default SearchSection;
