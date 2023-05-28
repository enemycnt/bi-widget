import { PropsWithChildren } from "react";

import { Wrapper, Title } from "./styles";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <Title>Market</Title>
      {children}
    </Wrapper>
  );
};

export default Layout;
