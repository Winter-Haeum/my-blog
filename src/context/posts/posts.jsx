import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/*
  1. Context 생성
*/
const PostsContext = createContext(null);

/*
  2. localStorage 안전 읽기
*/
function readPosts() {
  try {
    return JSON.parse(
      localStorage.getItem("posts") || "[]",
    );
  } catch {
    return [];
  }
}

/*
  3. Provider
*/
export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(() => readPosts());

  // posts 변경 시 localStorage 저장
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // 새 글 추가 (최신 위)
  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  // patch 방식 업데이트
  const updatePost = (id, patch) => {
    const pid = String(id);

    setPosts((prev) =>
      prev.map((p) =>
        String(p.id) === pid ? { ...p, ...patch } : p,
      ),
    );
  };

  // 여러 개 삭제
  const removePosts = (ids) => {
    const setIds = new Set(ids.map(String));

    setPosts((prev) =>
      prev.filter((p) => !setIds.has(String(p.id))),
    );
  };

  // 여러 개 이동
  const movePosts = (ids, nextTopicId) => {
    const setIds = new Set(ids.map(String));

    setPosts((prev) =>
      prev.map((p) =>
        setIds.has(String(p.id))
          ? { ...p, topicId: nextTopicId }
          : p,
      ),
    );
  };

  const value = useMemo(() => {
    return {
      posts,
      addPost,
      updatePost,
      removePosts,
      movePosts,
    };
  }, [posts]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

/*
  4. 커스텀 훅
*/
export function usePosts() {
  const ctx = useContext(PostsContext);

  if (!ctx) {
    throw new Error(
      "usePosts는 PostsProvider 안에서 사용해야 한다.",
    );
  }

  return ctx;
}
