import styled from "styled-components";
import { motion } from "framer-motion";

export const Centered = styled(motion.div)({
  gridColumn: "3 / 11",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
