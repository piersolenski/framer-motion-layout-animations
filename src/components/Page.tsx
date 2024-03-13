import { AnimatePresence } from "framer-motion";
import { useGlobalState } from "@/hooks/useGlobalState";

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props) {
  const { dispatch } = useGlobalState();
  const onTransComplete = () => {
    dispatch({ type: "pageTransition", value: "done" });
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={onTransComplete}>
      {children}
    </AnimatePresence>
  );
}
