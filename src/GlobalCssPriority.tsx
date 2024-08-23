import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const GlobalCssPriority: React.FC<Props> = ({ children }) => {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
};
