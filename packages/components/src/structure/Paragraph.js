import styled from 'styled-components';

import Element from './Element';

const Paragraph = styled(Element).attrs({ as: 'p' })`
  font-weight: 400;
  font-size: 17px;
  line-height: 28px;
`;

export default Paragraph;
