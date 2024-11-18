import styled from "styled-components";
import { FONT_SIZES } from "../theme";

const WrapRoomList = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 7.5fr;

  width: 100%;

  gap: 1rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;

const Copyright = styled.span`
  display: flex;
  justify-content: center;

  width: 25rem;

  text-align: center;
  font-size: ${FONT_SIZES["body-2"]};
`;

export { WrapRoomList, LeftWrapper, RightWrapper, Copyright };
