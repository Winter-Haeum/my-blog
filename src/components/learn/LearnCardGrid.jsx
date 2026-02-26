import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Grid = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;
  /* 핵심: 1000px 이하 2열, 600px 이하 1열로 자동 전환 */
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  text-decoration: none;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
`;

const CardTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const CardDesc = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

export default function LearnCardGrid({ topics }) {
  return (
    <Grid>
      {topics.map((topic) => (
        <CardLink key={topic.id} to={`/learn/${topic.id}`}>
          <CardTitle>{topic.title}</CardTitle>
          <CardDesc>{topic.description}</CardDesc>
        </CardLink>
      ))}
    </Grid>
  );
}
