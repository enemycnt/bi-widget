import React from 'react';

import { Wrapper, Title} from './styles'

const Layout = ({children}) => {
  return (
    <Wrapper>
      <Title>Market</Title>
      {children}
    </Wrapper>
  );
};

export default Layout;