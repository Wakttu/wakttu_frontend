type Props = {
  wordLength: number;
  chainCount: number;
  timeLimit: number;
  remainingTime: number;
};

/**
 * 점수 계산 함수
 * @params wordLength 단어길이
 * @params chainCount 체인수(턴 수)
 * @params timeLimit 제한시간 (밀리 초)
 * @params remainingTime 남은 시간 (밀리 초)
 * timeTaken 소요시간 (밀리 초 단위이기 때문에 %1000을 해준다. 단위가 달라지면 나누는 단위 바꾸기)
 * @return number (소수점 첫 번째 자리 반올림)
 */
const countScore = ({
  wordLength,
  chainCount,
  timeLimit,
  remainingTime,
}: Props) => {
  const timeTaken = (timeLimit - remainingTime) / 1000;
  const calculate =
    2 *
    ((3 + 3 * wordLength) ** 0.74 + 0.88 * chainCount) *
    (1 - timeTaken / ((2 * timeLimit) / 1000));
  return parseInt(calculate.toFixed(), 10);
};

export default countScore;
