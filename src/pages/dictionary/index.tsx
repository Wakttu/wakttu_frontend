import Header from "@/containers/common/Header";
import MainSection from "@/components/dictionary/MainSection";
import WordSection from "@/components/dictionary/WordSection";
import { Word_, WordProps } from "@/components/dictionary/Word";
import { Container } from "@/components/dictionary/Container";
import { client } from "@/services/api";
import { processWordData } from "@/utils/processWordData";

interface ApiResponse<T> {
  data: T;
}

interface DictionaryProps {
  todayWord: WordProps;
}

const Dictionary: React.FC<DictionaryProps> = ({ todayWord }) => {
  return (
    <Container>
      <Header />
      <MainSection />
      <WordSection {...todayWord} />
    </Container>
  );
};

export async function getStaticProps() {
  const todayWord_: ApiResponse<Word_> = await client.get(`/dictionary/today`);
  const todayWord = processWordData(todayWord_.data);
  return {
    props: {
      todayWord,
    },
  };
}

export default Dictionary;
