import styled from "@emotion/styled";

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 24px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-top: 1px solid
    ${({ theme }) => theme.colors.border};
`;
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <p>© {currentYear} MyBlog. All rights reserved.</p>
    </FooterWrapper>
  );
}
