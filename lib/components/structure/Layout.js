import styled from 'styled-components';

import Element from '../structure/Element';

const Layout = styled(Element)`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Element).attrs({ as: 'ul' })`
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: ${({ align = 'flex-start' }) => align};
`;

const HeaderItem = styled(Element).attrs({ as: 'li' })`
  &:not(:last-child) {
    margin-right: ${({ spacing = 24 }) => spacing}px;
  }
`;

const Body = styled(Element)`
  overflow: auto;
`;

Layout.Header = Header;
Layout.Header.Item = HeaderItem;
Layout.Body = Body;

export default Layout;
