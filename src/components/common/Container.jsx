import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 14px;
  }

  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

export default Container;
