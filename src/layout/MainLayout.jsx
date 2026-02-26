import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { breakpoints } from "../styles/theme";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.colors.background};
  transition: background-color 0.3s;
`;

const MainContainer = styled.main`
  margin: 0 auto;
  flex: 1;
  width: 100%;
  max-width: 1200px;

  /* ✅ 테마 spacing 사용 */
  padding: ${({ theme }) =>
    theme.spacing.pagePaddingDesktop};

  /* ✅ theme.js의 breakpoints 기준으로 반응형 */
  @media (max-width: ${breakpoints.mobile - 1}px) {
    padding: ${({ theme }) =>
      theme.spacing.pagePaddingMobile};
  }
`;

export default function MainLayout() {
  return (
    <LayoutContainer>
      <Header />

      <MainContainer id="main">
        <Outlet />
      </MainContainer>

      <Footer />
    </LayoutContainer>
  );
}
