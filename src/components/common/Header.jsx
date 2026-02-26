import styled from "@emotion/styled";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useThemeContext } from "../../context/theme/themeContext";
import useAuthStore from "../../store/useAuthStore";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const Logo = styled(Link)`
  font-size: 1.6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 10px;
  @media (max-width: 768px) {
    display: none;
  }

  a,
  button {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 36px;
  height: 36px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;
`;

const MoreButton = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: ${({ theme, isLoggedIn }) =>
    isLoggedIn
      ? theme.colors.primary
      : theme.colors.border}; /* ✅ 로그인 안되면 회색빛 */
  color: ${({ isLoggedIn }) =>
    isLoggedIn ? "#ffffff" : "#666"};
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: 180px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 8px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
`;

const MobileOnlyLinks = styled.div`
  display: none;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border};
  margin-bottom: 6px;
  padding-bottom: 6px;
  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export default function Header() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(e.target)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside,
      );
  }, []);

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  /* 💡 보충 설명: 로그인 여부에 따라 동작을 결정하는 함수 */
  const handleMoreClick = () => {
    if (isLoggedIn) {
      setIsOpen(!isOpen);
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo to="/">
          My<span>Blog</span>
        </Logo>
        <Right>
          <Nav>
            <NavLink to="/">홈</NavLink>
            <NavLink to="/write">글쓰기</NavLink>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  handleNav("/");
                }}
              >
                로그아웃
              </button>
            ) : (
              <NavLink to="/login">로그인</NavLink>
            )}
          </Nav>

          <ThemeToggle onClick={toggleTheme}>
            {isDarkMode ? "☀️" : "🌙"}
          </ThemeToggle>

          <div
            ref={moreRef}
            style={{ position: "relative" }}
          >
            {/* ✅ 버튼에 로그인 상태 전달 (스타일용) */}
            <MoreButton
              isLoggedIn={isLoggedIn}
              onClick={handleMoreClick}
            >
              더보기
            </MoreButton>

            {isOpen && isLoggedIn && (
              <Dropdown>
                <MobileOnlyLinks>
                  <DropdownItem
                    onClick={() => handleNav("/")}
                  >
                    홈
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleNav("/write")}
                  >
                    글쓰기
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      logout();
                      handleNav("/");
                    }}
                  >
                    로그아웃
                  </DropdownItem>
                </MobileOnlyLinks>
                <DropdownItem
                  onClick={() => console.log("소개")}
                >
                  소개
                </DropdownItem>
                <DropdownItem
                  onClick={() => console.log("설정")}
                >
                  설정
                </DropdownItem>
              </Dropdown>
            )}
          </div>
        </Right>
      </HeaderInner>
    </HeaderContainer>
  );
}
