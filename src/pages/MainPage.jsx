import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import LearnCardGrid from "../components/learn/LearnCardGrid";
import { LEARN_TOPICS } from "../data/learnTopics";

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  background: ${({ theme }) =>
    theme.colors.background}; /* ✅ 배경색 연동 */
`;

const Hero = styled.section`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 60px;
  padding: 60px 20px;
  min-height: auto;
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 40px 16px;
    margin-bottom: 40px;
    border-radius: 20px;
  }
`;

const Title = styled.h2`
  margin: 0 0 16px;
  font-size: clamp(26px, 8vw, 56px);
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  word-break: keep-all;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Desc = styled.p`
  margin-bottom: 32px;
  max-width: 600px;
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  word-break: keep-all;
`;

const CTA = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 14px 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 200px;
    padding: 12px 20px;
  }
`;

const LearnSection = styled.section`
  width: 100%;
  max-width: 1000px;
`;

/* 💡 보충 설명: 컬러를 theme.colors.text로 설정하여 모드에 따라 색상이 변하게 함 */
const SectionTitle = styled.h3`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
  color: ${({ theme }) =>
    theme.colors.text}; /* ✅ 핵심 수정 포인트 */
`;

export default function MainPage() {
  return (
    <Wrapper>
      <Hero>
        <Title>겨울하음 리액트 공간</Title>
        <Desc>
          공부한 내용을 기록하고 일상을 공유하는 블로그다.
          리액트의 다양한 기능을 구현했다.
        </Desc>
        <CTA to="/write">글쓰기 시작</CTA>
      </Hero>

      <LearnSection>
        <SectionTitle>배운 내용</SectionTitle>
        <LearnCardGrid topics={LEARN_TOPICS} />
      </LearnSection>
    </Wrapper>
  );
}
