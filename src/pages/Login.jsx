import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useInput from "../hooks/useInput";
import useAlertStore from "../store/useAlertStore";

const Page = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const Card = styled.section`
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 40px;
`;

const Title = styled.h2`
  margin: 0 0 28px;
  text-align: center;
  font-size: 32px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
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
`;

const Button = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 800;
  cursor: pointer;
`;

const HelperRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HelperLink = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);

  const openAlert = useAlertStore(
    (state) => state.openAlert,
  ); // ✅ 추가

  const from = location.state?.from?.pathname || "/";

  const email = useInput("");
  const password = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.value.trim()) {
      openAlert("이메일을 입력해야 한다."); // ✅ alert -> openAlert
      return;
    }

    if (!password.value.trim()) {
      openAlert("비밀번호를 입력해야 한다."); // ✅ alert -> openAlert
      return;
    }

    const ok = login(email.value, password.value);

    if (ok) {
      openAlert(`환영합니다. ${email.value}님`); // ✅ alert -> openAlert
      navigate(from, { replace: true });
      return;
    }

    openAlert("이메일 또는 비밀번호가 일치하지 않습니다."); // ✅ alert -> openAlert
    password.reset();
  };

  return (
    <Page>
      <Card>
        <Title>로그인</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            aria-label="이메일"
            {...email}
          />

          <Input
            type="password"
            placeholder="********"
            autoComplete="current-password"
            aria-label="비밀번호"
            {...password}
          />

          <Button type="submit">로그인</Button>
        </Form>

        <HelperRow>
          <HelperLink
            type="button"
            onClick={() => console.log("회원가입")}
          >
            회원가입
          </HelperLink>

          <HelperLink
            type="button"
            onClick={() => console.log("비밀번호 찾기")}
          >
            비밀번호 찾기
          </HelperLink>
        </HelperRow>
      </Card>
    </Page>
  );
}
