import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Grid = styled.div`
  width: 100%;
  display: grid;
  gap: 20px;

  /* ✅ 4열 / 2열 / 1열 */
  grid-template-columns: repeat(4, minmax(0, 1fr));

  /* ✅ 그리드 아이템이 길어도 밖으로 안 튀게 */
  min-width: 0;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  box-sizing: border-box; /* ✅ padding 포함해서 폭 계산 */
  min-width: 0; /* ✅ 그리드 셀 밖으로 밀려나지 않게 */

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  min-height: 100px;

  /* ✅ 카드 안 텍스트가 길 때도 넘침 방지 */
  overflow: hidden;

  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CardTitle = styled.h4`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  /* ✅ 긴 제목 줄바꿈/넘침 방지 */
  word-break: break-word;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;

  /* ✅ 긴 설명 줄바꿈/넘침 방지 */
  word-break: break-word;
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
