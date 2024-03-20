import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

type State = {
  siteInitialized: boolean;
  projectIndex: number;
  previousRoute: string | null;
  backgroundColor: string;
  introComplete: boolean;
  protectedPage: boolean;
  previousFooterTop: number;
  pageTransition: "idle" | "transitioning" | "done";
};

type Action =
  | { type: "siteInitialized" }
  | { type: "introComplete" }
  | { type: "protectedPage"; value: boolean }
  | { type: "previousRoute"; value: string | null }
  | { type: "backgroundColor"; value: string }
  | { type: "projectIndex"; value: number }
  | { type: "previousFooterTop"; value: number }
  | { type: "pageTransition"; value: "idle" | "transitioning" | "done" };

const initialState: State = {
  siteInitialized: false,
  projectIndex: 0,
  previousRoute: null,
  backgroundColor: "var(--white)",
  introComplete: false,
  protectedPage: false,
  previousFooterTop: 0,
  pageTransition: "idle",
};

const store = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {}, // Provide a default value or specify the actual dispatch function
});
const { Provider } = store;

type StateProviderProps = {
  children: ReactNode;
};

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer((prevState: State, action: Action) => {
    switch (action.type) {
      case "siteInitialized":
        return { ...prevState, siteInitialized: true };
      case "introComplete":
        return { ...prevState, introComplete: true };
      case "previousRoute":
        return { ...prevState, previousRoute: action.value };
      case "protectedPage":
        return { ...prevState, protectedPage: action.value };
      case "backgroundColor":
        return { ...prevState, backgroundColor: action.value };
      case "projectIndex":
        return { ...prevState, projectIndex: action.value };
      case "previousFooterTop":
        return { ...prevState, previousFooterTop: action.value };
      case "pageTransition":
        return { ...prevState, pageTransition: action.value };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
