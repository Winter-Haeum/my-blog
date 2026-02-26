import { useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
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

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Btn = styled.button`
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-weight: 900;
  font-size: 12px;
`;

const DangerBtn = styled(Btn)`
  color: #e53935;
`;

const StarButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  font-size: 18px;
  color: ${({ $active, theme }) =>
    $active ? "#F5C542" : theme.colors.textSecondary};
`;

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 800;
`;

const Meta = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 28px;
`;

const ContentBox = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: 24px;
  line-height: 1.8;
  white-space: pre-wrap;
`;

export default function PostDetail() {
  const { id } = useParams();
  const postId = String(id || "");
  const navigate = useNavigate();

  const { posts, updatePost, removePosts } = usePosts();

  const post = useMemo(() => {
    return (
      posts.find((p) => String(p.id) === postId) || null
    );
  }, [posts, postId]);

  // ✅ 조회수 중복 증가 방지 가드
  const viewedRef = useRef(new Set());

  useEffect(() => {
    if (!post) return;
    if (!postId) return;

    // 같은 글을 같은 세션에서 여러 번 렌더링해도 1번만 증가
    if (viewedRef.current.has(postId)) return;
    viewedRef.current.add(postId);

    updatePost(post.id, {
      views: (post.views || 0) + 1,
    });
  }, [postId, post, updatePost]);

  if (!post) {
    return (
      <Page>
        <Card>
          <Title>글을 찾을 수 없다.</Title>
          <Btn type="button" onClick={() => navigate(-1)}>
            뒤로가기
          </Btn>
        </Card>
      </Page>
    );
  }

  const toggleStar = () => {
    updatePost(post.id, {
      starred: !post.starred,
    });
  };

  const removePost = () => {
    const ok = confirm("이 글 삭제할까?");
    if (!ok) return;

    removePosts([post.id]);

    if (post.topicId) navigate(`/learn/${post.topicId}`);
    else navigate("/");
  };

  const goEdit = () => {
    navigate(`/write?edit=${post.id}`);
  };

  const goTopicList = () => {
    if (post.topicId) navigate(`/learn/${post.topicId}`);
    else navigate(-1);
  };

  const dateText = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("ko-KR")
    : "-";

  return (
    <Page>
      <Card>
        <TopRow>
          <div>
            <Btn type="button" onClick={goTopicList}>
              목록
            </Btn>
            <Btn type="button" onClick={goEdit}>
              수정
            </Btn>
            <DangerBtn type="button" onClick={removePost}>
              삭제
            </DangerBtn>
          </div>

          <StarButton
            type="button"
            $active={!!post.starred}
            aria-label="별표"
            onClick={toggleStar}
          >
            {post.starred ? "★" : "☆"}
          </StarButton>
        </TopRow>

        <Title>{post.title}</Title>

        <Meta>
          {dateText} · 조회수 {post.views || 0}
        </Meta>

        <ContentBox>{post.content}</ContentBox>
      </Card>
    </Page>
  );
}
