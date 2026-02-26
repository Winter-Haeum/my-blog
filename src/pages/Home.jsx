import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { LEARN_TOPICS } from "../data/learnTopics";
import { usePosts } from "../context/posts/posts.jsx";

const Page = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 28px 14px;
  }

  @media (max-width: 480px) {
    padding: 18px 12px;
  }
`;

const Card = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 800px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 36px;

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const BackLink = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 6px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 800;
  font-size: 13px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  padding: 0 40px 0 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url("data:image/svg+xml;utf8,<svg fill='%23666' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(138, 79, 255, 0.18);
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(138, 79, 255, 0.18);
  }
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 320px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  resize: vertical;
  line-height: 1.6;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(138, 79, 255, 0.18);
  }

  @media (max-width: 480px) {
    min-height: 220px;
    padding: 12px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;

  @media (max-width: 480px) {
    justify-content: stretch;
  }
`;

const SaveButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

function FormFields({
  modeKey,
  qTopic,
  editTarget,
  onSubmit,
  onBack,
}) {
  const [form, setForm] = useState(() => {
    if (editTarget) {
      return {
        topicId: editTarget.topicId || "",
        title: editTarget.title || "",
        content: editTarget.content || "",
      };
    }

    return {
      topicId: qTopic || "",
      title: "",
      content: "",
    };
  });

  return (
    <>
      <TopBar>
        <BackLink
          type="button"
          onClick={() => onBack(form.topicId)}
        >
          ← 목록으로
        </BackLink>
        <div />
      </TopBar>

      <Title>{editTarget ? "글 수정" : "새 글 작성"}</Title>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <Field>
          <Label htmlFor={`post-topic-${modeKey}`}>
            저장 위치
          </Label>
          <Select
            id={`post-topic-${modeKey}`}
            value={form.topicId}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                topicId: e.target.value,
              }))
            }
            disabled={!!editTarget}
          >
            <option value="" disabled>
              배운 내용을 선택하세요
            </option>
            {LEARN_TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor={`post-title-${modeKey}`}>
            제목
          </Label>
          <Input
            id={`post-title-${modeKey}`}
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="제목을 입력하세요"
          />
        </Field>

        <Field>
          <Label htmlFor={`post-content-${modeKey}`}>
            내용
          </Label>
          <Textarea
            id={`post-content-${modeKey}`}
            value={form.content}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            placeholder="내용을 자유롭게 작성해보세요..."
          />
        </Field>

        <Actions>
          <SaveButton type="submit">
            {editTarget ? "수정 저장" : "저장하기"}
          </SaveButton>
        </Actions>
      </Form>
    </>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { posts, addPost, updatePost } = usePosts();

  const qTopic = searchParams.get("topic") || "";
  const qEdit = searchParams.get("edit") || "";
  const modeKey = qEdit || "new";

  const editTarget = useMemo(() => {
    if (!qEdit) return null;
    return (
      posts.find((p) => String(p.id) === String(qEdit)) ||
      null
    );
  }, [qEdit, posts]);

  const handleBack = (currentTopicId) => {
    const backTopic =
      currentTopicId ||
      qTopic ||
      (editTarget ? editTarget.topicId : "");

    if (backTopic) navigate(`/learn/${backTopic}`);
    else navigate(-1);
  };

  const handleSubmit = (form) => {
    if (!form.topicId) {
      alert("저장 위치(배운 내용)를 선택해야 한다.");
      return;
    }

    if (!form.title.trim()) {
      alert("제목을 입력해야 한다.");
      return;
    }

    if (editTarget) {
      updatePost(editTarget.id, {
        topicId: form.topicId,
        title: form.title.trim(),
        content: form.content.trim(),
      });

      alert("수정 완료.");
      navigate(`/posts/${editTarget.id}`);
      return;
    }

    const newPost = {
      id: String(Date.now()),
      topicId: form.topicId,
      title: form.title.trim(),
      content: form.content.trim(),
      createdAt: Date.now(),
      views: 0,
      starred: false,
    };

    addPost(newPost);

    alert("저장 완료.");
    navigate(`/learn/${form.topicId}`);
  };

  return (
    <Page>
      <Card>
        <FormFields
          key={modeKey}
          modeKey={modeKey}
          qTopic={qTopic}
          editTarget={editTarget}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      </Card>
    </Page>
  );
}
