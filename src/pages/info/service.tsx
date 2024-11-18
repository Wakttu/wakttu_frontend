import styled from 'styled-components';
import React from 'react';

const ServiceContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem;
  line-height: 1.6;
  height: 100%;
  max-height: calc(100vh - 4rem);
  overflow-y: scroll;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #333;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Article = styled.article`
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const MainHeader = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Service: React.FC = () => {
  return (
    <ServiceContainer>
      <MainHeader>왁뚜 서비스 이용약관</MainHeader>
      <Section>
        <Title>제 1조. 목적 및 기타내용</Title>
        <Article>
          <p>
            이 통합 약관은, 이용자가 본 서비스를 편리하게 이용할 수 있도록 하기
            위해 만들어진 약관 입니다.
          </p>
          <p>
            &quot;왁뚜 서비스&quot; (이하 &quot;서비스&quot;라 합니다.) 사용시
            사용자는 모든 약관을 반드시 확인하고 준수해야 합니다.
          </p>
          <p>
            서비스에 가입 하시고 이용하실 경우 다음의 이용 약관을 모두 확인,
            동의함으로 간주되며, 동의하지 않는 경우 약관 동의를 거부하거나
            철회할 수 있습니다.
          </p>
          <p>이용약관을 숙지하지 않아 발생한 모든 피해는 책임지지 않습니다.</p>
        </Article>
      </Section>

      <Section>
        <Title>제 2조. 이용자의 의무</Title>
        <Article>
          <p>
            모든 이용자는 이 서비스의 전체 서비스에서 각 호에 해당하는 행위를
            해서는 안 됩니다.
          </p>
          <List>
            <ListItem>
              악성코드, 바이러스 등의 프로그램을 설치·유포하여 고의로 서비스
              이용을 저하하는 행위
            </ListItem>
            <ListItem>
              지역·장애·인종·출신국가·성별·나이·직업·종교 등을 차별하거나 이에
              대한 편견을 조장하는 내용을 작성하는 행위
            </ListItem>
            <ListItem>
              타인에게 성적 수치심이나 불쾌감·혐오감을 유발할 수 있는 내용을
              게시하는 행위
            </ListItem>
            <ListItem>
              청소년에게 유해한 과도한 신체 노출이나 음란한 행위를 묘사하는 행위
            </ListItem>
            <ListItem>관리자의 정당한 지시를 불이행하는 행위</ListItem>
            <ListItem>
              허가되지 않은 방법을 이용하여 서비스와 타 이용자에게 피해를 입히는
              행위
            </ListItem>
            <ListItem>
              본 서비스를 사전 동의 없이 리버스 엔지니어링, 크롤링 하거나
              모방하여 제3의 서비스를 제작하는데 활용하는 행위
            </ListItem>
            <ListItem>
              특정 사용자에게 제한적으로 배포된 소프트웨어를 재배포하는 행위
            </ListItem>
            <ListItem>
              관리자의 허가 없이 서비스의 데이터를 크롤링, 기타 다른 서비스를
              제작하는데 활용하는 행위
            </ListItem>
            <ListItem>기타 관계 법령이 규정한 불법적인 행위</ListItem>
          </List>
        </Article>
      </Section>

      <Section>
        <Title>제 3조. 서비스 이용제한</Title>
        <Article>
          <p>
            서비스 제공자는 &quot;왁뚜 이용약관&quot; (이하
            &quot;이용약관&quot;이라 합니다.) 에 명시되어 있는 각 호에 대해서
            위반할 시 서비스 이용 제한 조치를 취할 수 있습니다. (단, 관계 법령이
            규정한 불법적인 행위, 혹은 서비스 유지에 큰 지장을 초래한 운영 약관
            위반일 경우, 대한민국 경찰에게 신고 혹은 왁물원 카페 스태프에게
            공유할 수 있으며, 스태프의 판단 하에 카페 이용 차단과 같은 불리한
            상황이 적용될 수 있습니다.)
          </p>
        </Article>
      </Section>

      <Section>
        <Title>제 4조. 서비스 이용</Title>
        <Article>
          <p>
            서비스는 24시간 운영을 원칙으로 하나, 이는 언제나 일시 중지될 수
            있으며 일시 중지가 될 시 사유와 기간을 표기하여 일시 중지할 수
            있습니다.
          </p>
          <p>
            단, 사전에 공지를 할 수 없는 긴급 상황의 경우 확인 즉시 공지하며
            서비스가 정지된 지 1시간 이하일 경우 공지를 하지 않을 수 있습니다.
          </p>
          <p>다음 각 항은 서비스가 불가능할 때를 말합니다.</p>
          <List>
            <ListItem>
              전시, 사변, 천재지변 또는 이에 준하는 국가비상사태 등 단체가
              통제할 수 없는 상황이 발생한 경우
            </ListItem>
            <ListItem>
              일시적인 서버 장애와 같은 상황이 발생하여 부득이하게 서비스가
              작동을 못하는 경우
            </ListItem>
            <ListItem>
              설비 보수 또는 점검 등으로 인하여 정상적인 서비스 제공이 불가능한
              경우
            </ListItem>
          </List>
        </Article>
      </Section>

      <Section>
        <Title>제 5조. 약관의 효력 범위</Title>
        <Article>
          <p>
            약관은 서비스를 이용하는 모든 이용자에 대하여 효력이 있습니다. 다만,
            비회원의 경우 약관이 정한 바에 따라 일부 조항의 적용이 배제될 수
            있습니다.
          </p>
          <p>
            이 약관은 이용자가 회사로부터 약관에 동의하여 회사와 이용 계약을
            체결한 날로부터 이용 계약을 해지하는 시점까지 적용되는 것을 원칙으로
            합니다.
          </p>
        </Article>
      </Section>

      <Section>
        <Title>제 6조. 서비스 중단</Title>
        <Article>
          <p>
            원활한 서비스 제공을 위해 운영상 또는 기술상의 필요에 따라 서비스를
            변경할 수 있으며, 변경 전에 해당 내용을 서비스 내에 공지합니다.
          </p>
          <p>
            왁뚜는 스트리머 우왁굳, 아이네, 징버거, 릴파, 주르르, 고세구, 비챤
            의 팬 사이트이며, 이에 따라 우왁굳 및 관계자의 요청이 있는 경우를
            포함한 운영상의 중대한 사유가 있어 서비스를 지속하기 어려운 경우에는
            서비스의 일부 혹은 전부를 중단할 수 있습니다.
          </p>
        </Article>
      </Section>

      <Section>
        <Title>제 7조. 시스템 문제 및 오류 신고</Title>
        <Article>
          <p>
            허가되지 아니한 방법으로 서비스에 피해를 가할 경우 법적 조치가
            가능하며 이를 통해 민/형사적인 처벌을 받을 수 있습니다.
          </p>
        </Article>
      </Section>

      <Section>
        <Title>제 8조. 서비스 이용약관의 변경</Title>
        <Article>
          <p>
            본 약관은 2024년 11월 9일부터 시행되는 약관이며, 약관은 언제든지
            변경될 수 있습니다.
          </p>
          <p>
            이전 이용약관은 본 문서 상단에 있는 버튼을 통해 확인하실 수
            있습니다.
          </p>
        </Article>
      </Section>
    </ServiceContainer>
  );
};

export default Service;
