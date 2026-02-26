import { useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import styled from "@emotion/styled";
import { LEARN_TOPICS } from "../data/learnTopics";
import { usePosts } from "../context/posts/posts";

const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
`;

const Card = styled.section`
  width: 100%;
  max-width: 820px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 36px;
`;

const Title = styled.h2`
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Sub = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Divider = styled.hr`
  margin: 32px;
  border: 0;
  border-top: 1px solid
    ${({ theme }) => theme.colors.border};
`;

const Section = styled.section`
  margin-top: 18px;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const AccentBar = styled.span`
  width: 4px;
  height: 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

const Paragraph = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const CodeBox = styled.pre`
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  overflow: auto;
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 13px;
`;

const TopActions = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DocLink = styled.a`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const GhostButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MyRow = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MyTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
`;

const WriteLink = styled(Link)`
  height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  border: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const Toolbar = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Count = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 800;
`;

const MiniBtn = styled.button`
  height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-weight: 900;
  font-size: 12px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const MoveSelect = styled.select`
  height: 34px;
  padding: 0 34px 0 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-weight: 900;
  font-size: 12px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url("data:image/svg+xml;utf8,<svg fill='%23666' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const List = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  padding: 14px;
  color: ${({ theme }) => theme.colors.text};
  transition:
    transform 120ms ease,
    border-color 120ms ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const Left = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 6px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};

  &:checked {
    outline: 2px solid
      ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const IndexBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ItemTitle = styled.div`
  font-weight: 900;
  margin-bottom: 6px;
  line-height: 1.3;
`;

const ItemMeta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StarButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, theme }) =>
    $active ? "#F5C542" : theme.colors.textSecondary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Empty = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function LearnDetail() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const { posts, updatePost, removePosts, movePosts } =
    usePosts();

  const matched = useMemo(() => {
    return LEARN_TOPICS.find((t) => t.id === topic);
  }, [topic]);

  const [selectedIds, setSelectedIds] = useState([]);

  const filtered = useMemo(() => {
    const onlyTopic = posts.filter(
      (p) => p.topicId === topic,
    );

    return onlyTopic.slice().sort((a, b) => {
      const bs = b.starred ? 1 : 0;
      const as = a.starred ? 1 : 0;
      if (bs !== as) return bs - as;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }, [posts, topic]);

  const filteredIds = useMemo(
    () => filtered.map((p) => p.id),
    [filtered],
  );

  const allSelected =
    filtered.length > 0 &&
    selectedIds.length === filtered.length;

  const toggleStar = (postId) => {
    const target = posts.find((p) => p.id === postId);
    if (!target) return;
    updatePost(postId, { starred: !target.starred });
  };

  const toggleSelect = (postId) => {
    setSelectedIds((prev) => {
      if (prev.includes(postId))
        return prev.filter((id) => id !== postId);
      return [...prev, postId];
    });
  };

  const clearSelection = () => setSelectedIds([]);

  const removeSelected = () => {
    if (selectedIds.length === 0) return;

    const ok = confirm(
      `선택한 글 ${selectedIds.length}개 삭제할까?`,
    );
    if (!ok) return;

    removePosts(selectedIds);
    clearSelection();
  };

  const editSelected = () => {
    if (selectedIds.length !== 1) return;
    navigate(`/write?edit=${selectedIds[0]}`);
  };

  const moveSelectedAction = (nextTopicId) => {
    if (!nextTopicId) return;
    if (selectedIds.length === 0) return;

    const ok = confirm(
      `선택한 글 ${selectedIds.length}개를 이동할까?`,
    );
    if (!ok) return;

    movePosts(selectedIds, nextTopicId);
    clearSelection();
  };

  if (!matched) {
    return (
      <Page>
        <Card>
          <Title>없는 페이지다.</Title>
          <TopActions>
            <GhostButton
              type="button"
              onClick={() => navigate(-1)}
            >
              목록으로 돌아가기
            </GhostButton>
          </TopActions>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <Title>{matched.title}</Title>
        <Sub>{matched.description}</Sub>

        <Divider />

        <Section>
          <SectionHead>
            <AccentBar />
            <SectionTitle>상세 설명</SectionTitle>
          </SectionHead>
          <Paragraph>{matched.details}</Paragraph>
        </Section>

        <Section>
          <SectionHead>
            <AccentBar />
            <SectionTitle>사용 예시</SectionTitle>
          </SectionHead>
          <CodeBox>{matched.syntax}</CodeBox>
        </Section>

        <TopActions>
          <DocLink
            href={matched.link}
            target="_blank"
            rel="noreferrer"
          >
            문서 보기 ↗
          </DocLink>

          <GhostButton
            type="button"
            onClick={() => navigate(-1)}
          >
            목록으로 돌아가기
          </GhostButton>
        </TopActions>

        <MyRow>
          <MyTitle>내가 정리한 글</MyTitle>
          <WriteLink to={`/write?topic=${topic}`}>
            글쓰기
          </WriteLink>
        </MyRow>

        {filtered.length === 0 ? (
          <Empty>아직 이 주제로 저장된 글이 없다.</Empty>
        ) : (
          <>
            <Toolbar>
              <ToolbarLeft>
                <MiniBtn
                  type="button"
                  onClick={() => {
                    if (allSelected) clearSelection();
                    else setSelectedIds(filteredIds);
                  }}
                >
                  {allSelected ? "전체 해제" : "전체 선택"}
                </MiniBtn>
                <Count>선택 {selectedIds.length}개</Count>
              </ToolbarLeft>

              <ToolbarRight>
                <MiniBtn
                  type="button"
                  disabled={selectedIds.length !== 1}
                  onClick={editSelected}
                >
                  수정
                </MiniBtn>

                <MiniBtn
                  type="button"
                  disabled={selectedIds.length === 0}
                  onClick={removeSelected}
                >
                  삭제
                </MiniBtn>

                <MoveSelect
                  disabled={selectedIds.length === 0}
                  defaultValue=""
                  onChange={(e) => {
                    moveSelectedAction(e.target.value);
                    e.target.value = "";
                  }}
                >
                  <option value="" disabled>
                    이동
                  </option>
                  {LEARN_TOPICS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </MoveSelect>
              </ToolbarRight>
            </Toolbar>

            <List>
              {filtered.map((p, idx) => (
                <Item
                  key={p.id}
                  onClick={() => {
                    navigate(`/posts/${p.id}`);
                  }}
                >
                  <ItemRow>
                    <Left>
                      <Checkbox
                        type="checkbox"
                        checked={selectedIds.includes(p.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelect(p.id);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        aria-label="글 선택"
                      />

                      <IndexBadge>{idx + 1}</IndexBadge>

                      <div>
                        <ItemTitle>{p.title}</ItemTitle>
                        <ItemMeta>
                          {p.createdAt
                            ? new Date(
                                p.createdAt,
                              ).toLocaleDateString("ko-KR")
                            : "-"}{" "}
                          · 조회수 {p.views || 0}
                        </ItemMeta>
                      </div>
                    </Left>

                    <Right>
                      <StarButton
                        type="button"
                        $active={!!p.starred}
                        aria-label="별표"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(p.id);
                        }}
                      >
                        {p.starred ? "★" : "☆"}
                      </StarButton>
                    </Right>
                  </ItemRow>
                </Item>
              ))}
            </List>
          </>
        )}
      </Card>
    </Page>
  );
}
