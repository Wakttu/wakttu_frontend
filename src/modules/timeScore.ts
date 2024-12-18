type Props = {
  timeLimit: number;
  remainingTime: number;
};

/**
 * 시간 기반 점수 계산 함수
 * @params timeLimit 제한시간 (밀리 초)
 * @params remainingTime 남은 시간 (밀리 초)
 * timeTaken 소요시간 (밀리 초 단위이기 때문에 %1000을 해준다. 단위가 달라지면 나누는 단위 바꾸기)
 * @return number (소수점 첫 번째 자리 반올림)
 */
const timeScore = ({
  timeLimit,
  remainingTime,
}: Props) => {
  const timeTaken = (timeLimit - remainingTime) / 1000; // 소요 시간 계산 (초 단위)
  const remainingTimeRatio = 1 - timeTaken / ((2 * timeLimit) / 1000); // 남은 시간 비율 (0~1)

  // 남은 시간 비율에 가중치를 적용
  const weightedRatio = Math.pow(remainingTimeRatio, 3); // 비율을 세제곱하여 가중치 강화

  const calculate =
    2 * ((3 + 3) ** 1.74 + 0.88) * weightedRatio; // 점수 계산
  return parseInt(calculate.toFixed(), 10); // 정수로 변환 후 반환
};

export default timeScore;
