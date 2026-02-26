export const LEARN_TOPICS = [
  {
    id: "jsx",
    title: "JSX",
    description: "자바스크립트의 확장 문법",
    details:
      "JavaScript XML의 약자로, React에서 UI를 구성할 때 사용하는 문법입니다. 브라우저에서 실행되기 전에 Babel을 통해 일반 자바스크립트 코드로 변환됩니다.",
    syntax: "const element = <h1>Hello, world!</h1>;",
    link: "https://ko.legacy.reactjs.org/docs/introducing-jsx.html",
  },
  {
    id: "props",
    title: "Props",
    description: "컴포넌트에 전달되는 데이터",
    details:
      "부모 컴포넌트가 자식 컴포넌트에게 전달하는 읽기 전용 데이터입니다. 함수의 매개변수와 비슷하게 동작합니다.",
    syntax:
      "function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}",
    link: "https://ko.legacy.reactjs.org/docs/components-and-props.html",
  },
  {
    id: "usestate",
    title: "useState",
    description: "상태 관리를 위한 Hook",
    details:
      "함수형 컴포넌트에서 상태(State)를 관리할 수 있게 해주는 Hook입니다. 상태가 변경되면 컴포넌트가 다시 렌더링됩니다.",
    syntax: "const [count, setCount] = useState(0);",
    link: "https://ko.react.dev/reference/react/useState",
  },
  {
    id: "useeffect",
    title: "useEffect",
    description: "Side Effect를 처리하는 Hook",
    details:
      "컴포넌트가 렌더링될 때마다 특정 작업(데이터 가져오기, 구독 설정 등)을 수행할 수 있게 해줍니다. 의존성 배열을 통해 실행 시점을 제어할 수 있습니다.",
    syntax:
      "useEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);",
    link: "https://ko.react.dev/reference/react/useEffect",
  },
  {
    id: "useref",
    title: "useRef",
    description: "DOM 요소나 값을 참조하는 Hook",
    details:
      "렌더링에 영향을 주지 않는 값을 저장하거나, DOM 요소에 직접 접근해야 할 때 사용합니다. 값이 바뀌어도 리렌더링되지 않습니다.",
    syntax:
      "const inputRef = useRef(null);\n// <input ref={inputRef} />",
    link: "https://ko.react.dev/reference/react/useRef",
  },
  {
    id: "context",
    title: "Context API",
    description: "전역 상태 관리",
    details:
      "Props Drilling 없이 컴포넌트 트리 전체에 데이터를 제공할 수 있는 방법입니다. Theme나 User 정보 등 전역적인 데이터 공유에 유용합니다.",
    syntax:
      "const ThemeContext = createContext('light');\n// <ThemeContext.Provider value='dark'>...",
    link: "https://ko.legacy.reactjs.org/docs/context.html",
  },
  {
    id: "usememo",
    title: "useMemo",
    description: "연산 결과 캐싱 (메모이제이션)",
    details:
      "비용이 큰 연산 결과 값을 메모이제이션하여, 의존성 값이 바뀌지 않는 한 이전 값을 재사용함으로써 성능을 최적화합니다.",
    syntax:
      "const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);",
    link: "https://ko.react.dev/reference/react/useMemo",
  },
  {
    id: "usecallback",
    title: "useCallback",
    description: "함수 캐싱 (메모이제이션)",
    details:
      "함수 정의를 캐싱하여 자식 컴포넌트에 props로 전달할 때 불필요한 렌더링을 방지하는 데 사용됩니다.",
    syntax:
      "const memoizedCallback = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);",
    link: "https://ko.react.dev/reference/react/useCallback",
  },
  {
    id: "usereducer",
    title: "useReducer",
    description: "복잡한 상태 로직 관리",
    details:
      "useState의 대체 함수로, 다양한 액션에 따라 상태를 다른 방식으로 업데이트해야 할 때 유용합니다. Redux와 유사한 흐름을 가집니다.",
    syntax:
      "const [state, dispatch] = useReducer(reducer, initialState);",
    link: "https://ko.react.dev/reference/react/useReducer",
  },
  {
    id: "customhook",
    title: "Custom Hook",
    description: "나만의 Hook 만들기",
    details:
      "이름이 use로 시작하는 자바스크립트 함수입니다. 다른 Hook들을 호출하여 상태 관련 로직을 컴포넌트 간에 재사용할 수 있습니다.",
    syntax:
      "function useFriendStatus(friendID) {\n  const [isOnline, setIsOnline] = useState(null);\n  // ...\n  return isOnline;\n}",
    link: "https://ko.legacy.reactjs.org/docs/hooks-custom.html",
  },
  {
    id: "children",
    title: "children",
    description: "컴포넌트 태그 사이의 내용",
    details:
      "컴포넌트 태그 사이에 포함된 내용을 나타내는 특별한 prop입니다. 레이아웃 컴포넌트 등을 만들 때 유용하게 사용됩니다.",
    syntax:
      "function Box({ children }) {\n  return <div className='box'>{children}</div>;\n}",
    link: "https://ko.legacy.reactjs.org/docs/composition-vs-inheritance.html",
  },
  {
    id: "lifecycle",
    title: "Life Cycle",
    description: "컴포넌트의 생명주기",
    details:
      "컴포넌트가 생성(Mount), 업데이트(Update), 제거(Unmount)되는 과정을 말합니다. 함수형 컴포넌트에서는 useEffect로 이를 다룹니다.",
    syntax:
      "// Mount: useEffect(..., [])\n// Update: useEffect(..., [dep])\n// Unmount: useEffect(() => return cleanup, [])",
    link: "https://ko.legacy.reactjs.org/docs/react-component.html",
  },
];
