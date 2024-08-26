import styled, { css } from "styled-components";
import { COLORS } from "@/styles/theme";
import { BackgroundImage, CosmeticType, CosmeticVariant } from "./CosmeticType";

export type InfoVariant = 'title' | 'content';

const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3.5rem;
  padding: 1rem 0.625rem;
  gap: 0.5rem;

  border-radius: 1rem;
  border: 1px solid ${COLORS['gray-4']};
  box-sizing: border-box;
`;

const Tag = styled.div<{ $itemType?: CosmeticVariant }>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;

  font-size: 0.875rem;
  font-weight: 600;

  ${CosmeticType}
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.text};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  border: 1px solid ${COLORS['gray-4']};
  border-radius: 1rem;
  overflow: hidden;
`;

const InfoTop = styled.div<{ $itemType?: CosmeticVariant }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  height: 21rem;
  ${BackgroundImage};
`;

const CosmeticImage = styled.img`
  position: absolute;
  z-index: 2;
  
  width: 13.5rem;
  height: 13.5rem;
  object-fit: fill;
`;

const InfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 21rem;
  padding: 1.5rem;
  gap: 0.5rem;
`;


const Wrap = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
`;

const Info = styled.li<{ $variant?: InfoVariant }>`
  display: flex;
  justify-content: start;
  align-items: flex-start;

  ${({ $variant }) => {
    switch ($variant) {
      case "title":
        return css`
          flex-shrink: 0;
          min-width: 6rem;

          color: ${COLORS["gray-2"]};
          font-weight: 500;
        `;

      case "content":
        return css`
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow: 1;

          font-weight: 600;
          color: ${COLORS.text};
        `;
    }
  }}
`;

const GetButton = styled.div<{ $itemType?: CosmeticVariant }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  width: 100%;
  height: 4.3125rem;

  border: 1px solid rgba(0, 0, 0, 0.10);
  border-radius: 1rem;
  cursor: pointer;

  font-size: 1.5rem;
  font-weight: 600;

  ${CosmeticType}
`;

export {
  TitleSection,
  Tag,
  Title,
  InfoSection,
  InfoTop,
  CosmeticImage,
  InfoBottom,
  Wrap,
  Info,
  GetButton
}