import { useEffect, useState } from "react";
import { breakpoints } from "../styles/theme";

/*
  화면 크기 상태 계산
  - mobile: < 768
  - tablet: 768 ~ 991
  - desktop: >= 992
*/
const getScreenState = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }

  const mobileMax = breakpoints.mobile - 1; // 767
  const tabletMin = breakpoints.mobile; // 768
  const tabletMax = breakpoints.desktop - 1; // 991
  const desktopMin = breakpoints.desktop; // 992

  return {
    isMobile: window.matchMedia(
      `(max-width: ${mobileMax}px)`,
    ).matches,
    isTablet: window.matchMedia(
      `(min-width: ${tabletMin}px) and (max-width: ${tabletMax}px)`,
    ).matches,
    isDesktop: window.matchMedia(
      `(min-width: ${desktopMin}px)`,
    ).matches,
  };
};

export const useResponsive = () => {
  const [screenSize, setScreenSize] =
    useState(getScreenState);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia)
      return;

    const handleChange = () => {
      setScreenSize(getScreenState());
    };

    // resize 이벤트 한 번으로 충분 (matchMedia 3개 리스너보다 단순)
    window.addEventListener("resize", handleChange);

    // 최초 1회 동기화(주소창/스크롤바 등으로 값이 바뀌는 경우 대비)
    handleChange();

    return () => {
      window.removeEventListener("resize", handleChange);
    };
  }, []);

  return screenSize;
};
