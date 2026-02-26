import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999; /* ✅ 루트보다 위 */
  backdrop-filter: blur(5px);

  animation: ${fadeIn} 0.3s ease;
`;

const AlertBox = styled.div`
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.text};

  padding: 24px;
  border-radius: 12px;

  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  min-width: 300px;
  max-width: 90%;

  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.border};

  animation: ${scaleIn} 0.3s
    cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @media (max-width: 480px) {
    min-width: 0;
    width: calc(100% - 24px);
    padding: 18px;
  }
`;

const Message = styled.p`
  margin-bottom: 24px;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.1rem;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 18px;
  }
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.theme.colors.primary};
  color: white;

  border: none;
  padding: 10px 24px;
  border-radius: 8px;

  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.secondary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export default function GlobalAlert({
  message,
  onClose,
  buttonText = "확인",
}) {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;
  if (!message) return null;

  return createPortal(
    <Overlay onClick={onClose}>
      <AlertBox onClick={(e) => e.stopPropagation()}>
        <Message>{message}</Message>
        <Button type="button" onClick={onClose}>
          {buttonText}
        </Button>
      </AlertBox>
    </Overlay>,
    modalRoot,
  );
}
